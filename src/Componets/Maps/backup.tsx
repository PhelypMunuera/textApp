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

// BUSCUO 3.0

import {Search} from "../Search"
import { ButtonBig } from '../../Componets/ButtonBig';
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

export function Maps() {
  const [location, setLocation,] = useState<LocationObject | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

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
     <ButtonBig value={'continuar'} 
     />
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
      coordinate={{
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
      }}
      title="Destino"
    />
  )}
       </MapView>
     }


    </View>
  );
}




// cod para atualizar meu local a buscar com o ponto de onibus 

assim esta meu codigo tudo funcionando certinho, preciso de um ultimo detalhe que PRECIOS PEGAR O PONTO DE ONIBUS MAIS PROXIMO DO DESTINO INFORMADO 

COMOQUANDO ESCOLHEMOS NO GOOGLE E SELECIONAMOS A OPÇÃO DE IR DE ONIBUS 
React-Native + Expo Assistant disse:
Pensou por 52s

perfeito! pra pegar o ponto de ônibus mais próximo do destino você pode usar o Google Places Nearby Search com type=transit_station (ou bus_station). Abaixo estão só os trechos que você precisa adicionar/alterar no seu arquivo atual.

1) state extra + sua API key (precisa habilitar Places API)
// coloque perto dos outros useState
const [nearestBusStop, setNearestBusStop] = useState<{ name: string; lat: number; lng: number } | null>(null);

// ideal: use env/Secrets, aqui só pra exemplo:
const GOOGLE_MAPS_APIKEY = "SUA_CHAVE_AQUI";

2) função para buscar o ponto de ônibus mais próximo do destino
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

3) ajustar seu creatDirections para buscar o ponto e então mostrar a rota
async function creatDirections() {
  if (location && selectedLocation) {
    // busca o ponto de ônibus mais próximo do DESTINO escolhido
    await findNearestBusStop(selectedLocation.lat, selectedLocation.lng);
    setShowRoute(true);
  }
}

4) no <MapView>: usar o ponto de ônibus como destino da rota (se existir) e marcar no mapa
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

{showRoute && location && (nearestBusStop || selectedLocation) && (
  <MapViewDirections
    origin={{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }}
    destination={{
      latitude: (nearestBusStop?.lat ?? selectedLocation!.lat),
      longitude: (nearestBusStop?.lng ?? selectedLocation!.lng),
    }}
    mode="TRANSIT"                 // usa rotas de transporte público
    apikey={GOOGLE_MAPS_APIKEY}    // mesma key (Places + Directions habilitadas)
    strokeWidth={6}
    strokeColor="#1e5164ff"
    onReady={(res) => {
      mapRef.current?.fitToCoordinates(res.coordinates, {
        edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
        animated: true,
      });
    }}
    onError={(e) => console.warn("Directions error:", e)}
  />
)}