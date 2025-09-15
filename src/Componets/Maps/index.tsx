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

type Props = {
  value: string;
  onPress?: () => void; 
  disabled?: boolean;
};

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


function creatDirections() {
if (location && selectedLocation) {
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
