import { styles } from './styles';
import React from 'react';
import  MapView  from 'react-native-maps'
import { View, Text } from 'react-native';


export function Maps() {
  
  return (
    <View style={styles.background}>
<MapView
  style={styles.map}

  initialRegion={{
    latitude: -27.210753,
    longitude: -49.644183,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
  }}

  showsUserLocation
  loadingEnabled
/>

        <Text style={styles.text}>
            Em 3,2 km nós o acordaremos. Pode ficar tranquilo!
        </Text>
    </View>
  );
}