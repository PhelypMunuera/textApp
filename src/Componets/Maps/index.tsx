import { Search } from "../Search";
import { ButtonBig } from "../../Componets/ButtonBig";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker, Polyline } from "react-native-maps";
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

type Props = {
  value: string;
  onPress?: () => void;
  disabled?: boolean;
};

type BusStop = { name: string; lat: number; lng: number };

type TransitOption = {
  id: string;
  summary: string;
  lineName: string;         // nome/short_name da linha
  headsign?: string;        // sentido
  agencyName?: string;
  departureTime?: string;
  arrivalTime?: string;
  arrivalStopNearDest: BusStop;  // ponto mais próximo do destino para essa linha
};

export function Maps() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showRoute, setShowRoute] = useState(false);
  const [nearestBusStop, setNearestBusStop] = useState<BusStop | null>(null);

  // modal de seleção de linha
  const [modalVisible, setModalVisible] = useState(false);
  const [transitOptions, setTransitOptions] = useState<TransitOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);

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
    // sempre que trocar destino, limpa escolhas anteriores
    setNearestBusStop(null);
    setShowRoute(false);
  }

  // -------- Directions (REST) helpers --------
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
      `&mode=transit` +
      `&alternatives=true` +
      `&key=${'AIzaSyB8dZANe2f_Tu37jvyitU6DgI0FdiZPMEQ'}`;

    const res = await fetch(url);
    const json = await res.json();

    const routes: any[] = json?.routes ?? [];
    const options: TransitOption[] = [];

    for (let i = 0; i < routes.length; i++) {
      const r = routes[i];
      const leg = r?.legs?.[0];
      if (!leg) continue;

      // pega steps de TRANSIT
      const transitSteps = (leg.steps || []).filter((s: any) => s.travel_mode === "TRANSIT");
      if (!transitSteps.length) continue;

      // usamos o ÚLTIMO step de TRANSIT para pegar o ponto próximo do destino
      const lastTransit = transitSteps[transitSteps.length - 1];
      const td = lastTransit?.transit_details;

      const lineName =
        td?.line?.short_name ||
        td?.line?.name ||
        (td?.line?.agencies?.[0]?.name ? `${td.line.agencies[0].name} (sem número)` : "Linha");

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

    // remove duplicados por (lineName + headsign + arrivalStop)
    const uniq = new Map<string, TransitOption>();
    options.forEach((opt) => {
      const key = `${opt.lineName}|${opt.headsign}|${opt.arrivalStopNearDest.lat.toFixed(6)},${opt.arrivalStopNearDest.lng.toFixed(6)}`;
      if (!uniq.has(key)) uniq.set(key, opt);
    });

    return Array.from(uniq.values());
  }

  // -------- ação do botão --------
  const creatDirections = useCallback(async () => {
    if (!location || !selectedLocation) return;

    // 1) Busca alternativas de linhas de ônibus
    setLoadingOptions(true);
    try {
      const opts = await fetchTransitAlternatives(
        location.coords.latitude,
        location.coords.longitude,
        selectedLocation.lat,
        selectedLocation.lng
      );
      setTransitOptions(opts);
      setModalVisible(true); // 2) Abre modal para o usuário escolher a linha
    } catch (e) {
      console.warn("Erro ao buscar alternativas de transit:", e);
      setTransitOptions([]);
      setModalVisible(false);
    } finally {
      setLoadingOptions(false);
    }
  }, [location, selectedLocation]);

  // usuário escolheu uma linha → seleciona o ponto de chegada daquela linha e desenha rota
  function handleSelectTransit(opt: TransitOption) {
    setNearestBusStop(opt.arrivalStopNearDest); // ponto mais próximo do destino dessa linha
    setModalVisible(false);
    setShowRoute(true);
  }

  // -------- permissões/localização --------
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
          // provider={Platform.OS === "android" ? "google" : undefined}
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
              title={nearestBusStop.name || "Ponto de ônibus (linha escolhida)"}
              description="Ponto mais próximo do destino para a linha selecionada"
            />
          )}

          {/* Desenha a rota geral de transporte público (Google decide o percurso) */}
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
    mode="WALKING" // trecho até o ponto: azul sólido
    onReady={(res) => {
      mapRef.current?.fitToCoordinates(res.coordinates, {
        edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
        animated: true,
      });
    }}
    onError={(e) => console.warn("Walking Directions error:", e)}
  />
)}
{showRoute && nearestBusStop && selectedLocation && (
  <Polyline
    coordinates={[
      { latitude: nearestBusStop.lat, longitude: nearestBusStop.lng },
      { latitude: selectedLocation.lat, longitude: selectedLocation.lng },
    ]}
    strokeColor="green"           // cor diferente
    strokeWidth={4}
    lineDashPattern={[10, 10]}    // padrão pontilhado (10px linha, 10px espaço)
  />
)}
        </MapView>
      )}

      {/* -------- Modal de seleção de linha -------- */}
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
