import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapDebug() {
  return (
    <View style={s.container}>
      <MapView
        style={s.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={false}
        loadingEnabled
        onMapReady={() => console.log('MapReady ✅')}
      />
    </View>
  );
}
const s = StyleSheet.create({
  container: {   width: '100%',
    height: '100%', backgroundColor: '#128A98' },
  map: { ...StyleSheet.absoluteFillObject },
});
