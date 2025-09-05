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
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }}
  showsUserLocation={false}
  loadingEnabled
/>

        <Text style={styles.text}>
            Em 3,2 km nós o acordaremos. Pode ficar tranquilo!
        </Text>
    </View>
  );
}