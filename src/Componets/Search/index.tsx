import React, { useRef, useState } from "react";
import { View, Keyboard } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { styles, placesStyles } from "./styles";

type SelectedPlace = {
  description: string;
  place_id: string;
  lat?: number;
  lng?: number;
};

type Props = {
  onLocationSelected?: (place: SelectedPlace) => void;
};

export function Search({ onLocationSelected }: Props) {
  const placesRef = useRef<GooglePlacesAutocompleteRef>(null);
  const [query, setQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(null);

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
        onPress={(data, details) => {
          const coords = details?.geometry?.location;
          const place: SelectedPlace = {
            description: data.description,
            place_id: data.place_id!,
            lat: coords?.lat,
            lng: coords?.lng,
          };

          setSelectedPlace(place);
          onLocationSelected?.(place); //essa função quem chamara as propriedades para o desttio, apos o usuario selecionar o 

          setQuery(data.description);
          placesRef.current?.setAddressText(data.description);
          Keyboard.dismiss();

         console.log(data, details)
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
