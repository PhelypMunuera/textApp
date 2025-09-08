import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export function Search() {
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <GooglePlacesAutocomplete
        placeholder="Buscar"
        fetchDetails
        query={{
          key: "AIzaSyA56WZ8G_wleCQxyR5_rXIvTEaA_Drc7qE", 
          language: "pt-BR",
        }}
        onPress={(data, details) => {
          console.log("DATA:", data);
          console.log("DETAILS:", details);
        }}
        onFail={(error) => {
          console.log("onFail (Places):", error);
        }}
        enablePoweredByContainer={false}
        predefinedPlaces={[]}       // evita .filter em undefined
        listEmptyComponent={null}   // evita erro quando não há resultados
        textInputProps={{           // garante que nunca seja undefined
          onFocus: () => {},
          onBlur: () => {},
        }}
        styles={{
          listView: { zIndex: 1000 },
          textInputContainer: { zIndex: 1001 },
        }}
      />
    </View>
  );
}
