import React, { useRef, useState } from "react";
import { View, Keyboard, StyleProp, ViewStyle  } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
  GooglePlaceDetail, 
} from "react-native-google-places-autocomplete";
import { styles, placesStyles } from "./styles";

type Coordinates = { lat: number; lng: number };

type Props = { 
  onLocationSelected: (coords: Coordinates) => void;
   style?: StyleProp<ViewStyle>; 
};

export function Search({ onLocationSelected }: Props) {

  const placesRef = useRef<GooglePlacesAutocompleteRef>(null);


  const [query, setQuery] = useState("");

  return (
    <View style={styles.masck}>
      <GooglePlacesAutocomplete
        ref={placesRef}
        styles={placesStyles}
        placeholder="Qual é seu destino..."
        fetchDetails
        minLength={2}
        debounce={200}
        query={{
          key: "AIzaSyB8dZANe2f_Tu37jvyitU6DgI0FdiZPMEQ",
          language: "pt-BR",
        }}




        onPress={(data, details: GooglePlaceDetail | null) => {
          // Tenta pegar as coordenadas do lugar selecionado
          const coords = details?.geometry?.location;
    

if (!coords) return; 

          onLocationSelected?.({lat: coords.lat, lng: coords.lng}          
      );
          
           console.log("onLocationSelected é:", coords);
         

          setQuery(data.description);
          placesRef.current?.setAddressText(data.description);
          Keyboard.dismiss();      
        }}


        textInputProps={{
          value: query,
          onChangeText: (text) => {
            setQuery(text);
            placesRef.current?.setAddressText(text);
          },
          onFocus: () => {
            if (query && query.length >= 2) {
              placesRef.current?.setAddressText(query);
            }
          },
          returnKeyType: "search",
          autoCorrect: false,
        }}
        enablePoweredByContainer={false}      
        keyboardShouldPersistTaps="handled"   
        keepResultsAfterBlur={false}      
      />
    </View>
  );
}
