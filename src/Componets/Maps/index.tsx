import {Search} from "../Search"

import MapView from 'react-native-maps';
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

export function Maps() {
  const [location, setLocation] = useState<LocationObject | null>(null);

  const mapRef = useRef<MapView>(null);

  // Recebe lat/lng do onPress do GooglePlacesAutocomplete e move a câmera
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


   console.log("[Maps] (onLayout) Aplicando animação pendente para:", { lat, lng });
           

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
       />
     }


    </View>
  );
}
