import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location"; // expo-location é o recomendado
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
      <Text style={styles.text}>
        Em 3,2 km nós o acordaremos. Pode ficar tranquilo!
      </Text>
    </View>
  );
}