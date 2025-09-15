import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location"; 
import { styles } from "./styles";

export function Maps() {
  const [region, setRegion] = useState<Region>({
    latitude: -27.210753,
    longitude: -49.644183,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
  });

  useEffect(() => {
    (async () => {
      // pedir permissão de localização
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão de localização negada ❌");
        return;
      }

      // obter a posição atual
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});

      // atualizar estado (region)
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      });
    })();
  }, []);

  return (
    <View style={styles.background}>
      <MapView
        style={styles.map}
        region={region} // usa o estado, não mais inicial fixo
        showsUserLocation={true} // o "ponto azul" aparece se a permissão foi concedida
        loadingEnabled
        onRegionChangeComplete={(r) => setRegion(r)} // atualiza estado ao mover o mapa
      />
    </View>
  );
}


//backup 2.0

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