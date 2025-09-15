import {Search} from "../Search"
import { ButtonBig } from '../../Componets/ButtonBig';
import MapViewDirections from "react-native-maps-directions";
import MapView, {Marker}  from 'react-native-maps';
import { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
} from "expo-location";

type Props = {
  value: string;
  onPress?: () => void; 
  disabled?: boolean;
};

export function Maps() {
  const [location, setLocation,] = useState<LocationObject | null>(null);
  // const [destination] = useDirection<number>(null)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showRoute, setShowRoute] = useState(false);
  const [nearestBusStop, setNearestBusStop] = useState<{ name: string; lat: number; lng: number } | null>(null);


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
      
      1000,
     
    );
    setSelectedLocation({ lat, lng });
  }

async function findNearestBusStop(lat: number, lng: number) {
  try {
    // rankby=distance retorna o mais próximo (não use radius junto)
    const url =
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json` +
      `?location=${lat},${lng}` +
      `&rankby=distance` +
      `&type=transit_station` + // ou "bus_station"
      `&key=${GOOGLE_MAPS_APIKEY}`;

    const res = await fetch(url);
    const json = await res.json();

    const place = json?.results?.[0];
    if (place) {
      setNearestBusStop({
        name: place.name,
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      });
    } else {
      setNearestBusStop(null);
    }
  } catch (e) {
    console.warn("Erro Places Nearby:", e);
    setNearestBusStop(null);
  }
}

async function creatDirections() {
  if (location && selectedLocation) {
    await findNearestBusStop(selectedLocation.lat, selectedLocation.lng);
    setShowRoute(true);

    console.log("posição atual:", location.coords.latitude, location.coords.longitude);
    console.log("seu destino:", selectedLocation.lat, selectedLocation.lng);
  } 
}


  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions()
  },[])

  useEffect(()=>{
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    },(response) => {
        setLocation(response);
        mapRef.current?.animateCamera({
          center: response.coords
        })
    });

    
    
  },[])

  return(
    <View style={styles.background}>
    <Search style={styles.mapsearch}
     onLocationSelected={handleLocationSelected} />
    <ButtonBig value="continuar" onPress={creatDirections} />

     {
      location && 
       <MapView
         ref={mapRef}
         style={styles.map}
         initialRegion={
           {
             latitude: location.coords.latitude,
             longitude: location.coords.longitude,
             latitudeDelta: 0.005,
             longitudeDelta: 0.005,
           }
         }
         showsUserLocation={true}
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
    title={nearestBusStop.name || "Ponto de ônibus"}
    description="Ponto mais próximo do destino"
  />
)}

{showRoute && location && selectedLocation && (
  <MapViewDirections
    origin={{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }}
    destination={{
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    }}
    apikey={'AIzaSyB8dZANe2f_Tu37jvyitU6DgI0FdiZPMEQ'}
    strokeWidth={6}
    strokeColor="#1e5164ff"
    mode="TRANSIT" // 🚍 aqui está a chave
    onReady={(res) => {
      mapRef.current?.fitToCoordinates(res.coordinates, {
        edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
        animated: true,
      });
    }}
    onError={(e) => console.warn("Transit Directions error:", e)}
  />
)}

       </MapView>
     }


    </View>
  );
}
