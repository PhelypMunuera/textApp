import { Search } from "../Search";
import { ButtonBig } from "../../Componets/ButtonBig";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker, Polyline, LatLng } from "react-native-maps";
import { useEffect, useState, useRef, useCallback } from "react";
import { View, Modal, Text, TouchableOpacity, FlatList, StyleSheet, Platform } from "react-native";
import { styles } from "./styles";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";

type BusStop = { name: string; lat: number; lng: number };

type TransitOption = {
  id: string;
  summary: string;
  lineName: string;
  headsign?: string;
  agencyName?: string;
  departureTime?: string;
  arrivalTime?: string;
  arrivalStopNearDest: BusStop;
};

export function Maps() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const [showRoute, setShowRoute] = useState(false);
  const [nearestBusStop, setNearestBusStop] = useState<BusStop | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [transitOptions, setTransitOptions] = useState<TransitOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);

  const [walkingToDestCoords, setWalkingToDestCoords] = useState<LatLng[] | null>(null);

  const GOOGLE_MAPS_APIKEY = "AIzaSyB8dZANe2f_Tu37jvyitU6DgI0FdiZPMEQ";
  const mapRef = useRef<MapView>(null);

  function handleLocationSelected({ lat, lng }: { lat: number; lng: number }) {
    mapRef.current?.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    );
    setSelectedLocation({ lat, lng });
    setNearestBusStop(null);
    setWalkingToDestCoords(null);
    setShowRoute(false);
  }

  async function fetchTransitAlternatives(
    oLat: number,
    oLng: number,
    dLat: number,
    dLng: number
  ): Promise<TransitOption[]> {
    const url =
      `https://maps.googleapis.com/maps/api/directions/json` +
      `?origin=${oLat},${oLng}` +
      `&destination=${dLat},${dLng}` +
      `&mode=transit&alternatives=true` +
      `&key=${'AIzaSyB8dZANe2f_Tu37jvyitU6DgI0FdiZPMEQ'}`;

    const res = await fetch(url);
    const json = await res.json();

    const routes: any[] = json?.routes ?? [];
    const options: TransitOption[] = [];

    for (let i = 0; i < routes.length; i++) {
      const r = routes[i];
      const leg = r?.legs?.[0];
      if (!leg) continue;

      const transitSteps = (leg.steps || []).filter((s: any) => s.travel_mode === "TRANSIT");
      if (!transitSteps.length) continue;

      const lastTransit = transitSteps[transitSteps.length - 1];
      const td = lastTransit?.transit_details;

      const lineName =
        td?.line?.short_name ||
        td?.line?.name ||
        (td?.line?.agencies?.[0]?.name ? `${td.line.agencies[0].name}` : "Linha");

      const arrivalStop = td?.arrival_stop;
      const arrivalTime = td?.arrival_time?.text;
      const departureTime = td?.departure_time?.text;
      const headsign = td?.headsign;
      const agencyName = td?.line?.agencies?.[0]?.name;

      if (arrivalStop?.location?.lat && arrivalStop?.location?.lng) {
        options.push({
          id: r.overview_polyline?.points || `${i}`,
          summary: r.summary || lineName,
          lineName,
          headsign,
          agencyName,
          departureTime,
          arrivalTime,
          arrivalStopNearDest: {
            name: arrivalStop.name || "Ponto de chegada",
            lat: arrivalStop.location.lat,
            lng: arrivalStop.location.lng,
          },
        });
      }
    }

    const uniq = new Map<string, TransitOption>();
    options.forEach((opt) => {
      const key = `${opt.lineName}|${opt.headsign}|${opt.arrivalStopNearDest.lat.toFixed(
        6
      )},${opt.arrivalStopNearDest.lng.toFixed(6)}`;
      if (!uniq.has(key)) uniq.set(key, opt);
    });

    return Array.from(uniq.values());
  }

  function decodePolyline(encoded: string): LatLng[] {
    let index = 0, lat = 0, lng = 0;
    const coordinates: LatLng[] = [];
    while (index < encoded.length) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;
      coordinates.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return coordinates;
  }

  async function buildWalkingSegmentFromStopToDest(stop: BusStop, dest: { lat: number; lng: number }) {
    try {
      const url =
        `https://maps.googleapis.com/maps/api/directions/json` +
        `?origin=${stop.lat},${stop.lng}` +
        `&destination=${dest.lat},${dest.lng}` +
        `&mode=walking` +
        `&key=${'AIzaSyB8dZANe2f_Tu37jvyitU6DgI0FdiZPMEQ'}`;

      const res = await fetch(url);
      const json = await res.json();
      const poly = json?.routes?.[0]?.overview_polyline?.points;
      if (poly) {
        setWalkingToDestCoords(decodePolyline(poly));
      } else {
        setWalkingToDestCoords(null);
      }
    } catch (e) {
      console.warn("Erro walking stop->dest:", e);
      setWalkingToDestCoords(null);
    }
  }

  const creatDirections = useCallback(async () => {
    if (!location || !selectedLocation) return;
    setLoadingOptions(true);
    try {
      const opts = await fetchTransitAlternatives(
        location.coords.latitude,
        location.coords.longitude,
        selectedLocation.lat,
        selectedLocation.lng
      );
      setTransitOptions(opts);
      setModalVisible(true);
    } catch (e) {
      console.warn("Erro transit:", e);
      setTransitOptions([]);
      setModalVisible(false);
    } finally {
      setLoadingOptions(false);
    }
  }, [location, selectedLocation]);

  const handleSelectTransit = useCallback(
    async (opt: TransitOption) => {
      setNearestBusStop(opt.arrivalStopNearDest);
      if (selectedLocation) {
        await buildWalkingSegmentFromStopToDest(opt.arrivalStopNearDest, selectedLocation);
      }
      setModalVisible(false);
      setShowRoute(true);
    },
    [selectedLocation]
  );

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync({ accuracy: LocationAccuracy.High });
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    let sub: { remove: () => void } | undefined;
    (async () => {
      const { granted } = await requestForegroundPermissionsAsync();
      if (!granted) return;
      sub = await watchPositionAsync(
        { accuracy: LocationAccuracy.Highest, timeInterval: 1000, distanceInterval: 1 },
        (response) => {
          setLocation(response);
          mapRef.current?.animateCamera({ center: response.coords });
        }
      );
    })();
    return () => sub?.remove?.();
  }, []);

  return (
    <View style={styles.background}>
      <Search style={styles.mapsearch} onLocationSelected={handleLocationSelected} />
      <ButtonBig value="continuar" onPress={creatDirections} />

      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation
        >
          {selectedLocation && (
            <Marker
              coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
              title="Destino"
            />
          )}

          {nearestBusStop && (
            <Marker
              coordinate={{ latitude: nearestBusStop.lat, longitude: nearestBusStop.lng }}
              title={nearestBusStop.name || "Ponto da linha escolhida"}
              description="Ponto próximo do destino (chegada da linha selecionada)"
            />
          )}

          {/* TRANSIT: origem -> ponto de chegada */}
          {showRoute && location && nearestBusStop && (
            <MapViewDirections
              origin={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              destination={{
                latitude: nearestBusStop.lat,
                longitude: nearestBusStop.lng,
              }}
              apikey={'AIzaSyB8dZANe2f_Tu37jvyitU6DgI0FdiZPMEQ'}
              strokeWidth={6}
              strokeColor="#1e5164ff"
              mode="TRANSIT"
              onReady={(res) => {
                mapRef.current?.fitToCoordinates(res.coordinates, {
                  edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
                  animated: true,
                });
              }}
              onError={(e) => console.warn("Transit Directions error:", e)}
            />
          )}

          {/* WALKING: ponto -> destino (pontilhado) */}
          {showRoute && walkingToDestCoords && walkingToDestCoords.length > 1 && (
            <Polyline
              coordinates={walkingToDestCoords}
              strokeColor="#34A853"
              strokeWidth={5}
              lineDashPattern={[8, 8]}
              lineCap="round"
              lineJoin="round"
              geodesic={false}
              zIndex={10}
            />
          )}
        </MapView>
      )}

      {/* Modal de seleção de linha */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.backdrop}>
          <View style={modalStyles.sheet}>
            <Text style={modalStyles.title}>
              {loadingOptions ? "Buscando linhas..." : "Selecione a linha de ônibus"}
            </Text>
            {!loadingOptions && transitOptions.length === 0 && (
              <Text style={modalStyles.empty}>Nenhuma linha encontrada para esse trajeto.</Text>
            )}
            <FlatList
              data={transitOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={modalStyles.option}
                  onPress={() => handleSelectTransit(item)}
                >
                  <Text style={modalStyles.optionTitle}>
                    {item.lineName}
                    {item.headsign ? ` • Sentido ${item.headsign}` : ""}
                  </Text>
                  <Text style={modalStyles.optionSub}>
                    {item.agencyName ? `${item.agencyName} • ` : ""}
                    {item.departureTime ? `Saída ${item.departureTime}` : ""}
                    {item.arrivalTime ? ` • Chegada ${item.arrivalTime}` : ""}
                  </Text>
                  <Text style={modalStyles.optionStop}>
                    Chegada perto do destino: {item.arrivalStopNearDest.name}
                  </Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={modalStyles.sep} />}
              contentContainerStyle={{ paddingBottom: 12 }}
            />
            <TouchableOpacity style={modalStyles.cancel} onPress={() => setModalVisible(false)}>
              <Text style={modalStyles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 28 : 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "70%",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  empty: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
  },
  option: {
    paddingVertical: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  optionSub: {
    fontSize: 13,
    opacity: 0.8,
    marginTop: 2,
  },
  optionStop: {
    fontSize: 13,
    marginTop: 4,
  },
  sep: {
    height: 1,
    backgroundColor: "#eee",
  },
  cancel: {
    marginTop: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
});
