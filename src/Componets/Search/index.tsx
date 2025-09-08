import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export function Search() {
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <GooglePlacesAutocomplete
        placeholder="Qual é seu destino..."
        minLength={2}
        debounce={300}
        fetchDetails
        query={{
          key: "AIzaSyB8dZANe2f_Tu37jvyitU6DgI0FdiZPMEQ",
          language: "pt-BR",
        }}

        // ✅ evita o crash no RN 0.79 (timeout precisa ser número)
        timeout={15000}

        onPress={(data, details) => {
          console.log("DATA:", data);
          console.log("DETAILS:", details);
        }}
        onFail={(err) => {
          console.log("onFail (Places):", err);
        }}
        onNotFound={() => console.log("Nenhuma sugestão encontrada.")}

        enablePoweredByContainer={false}
       
      
        textInputProps={{
          onFocus: () => {},
          onBlur: () => {},
          autoCorrect: false,
          autoCapitalize: "none",
        }}
        styles={{
          container: { flex: 0, zIndex: 1002 },
          textInputContainer: { zIndex: 1001 },
          listView: {
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            zIndex: 1000,
            elevation: 1000,
          },
        }}
      />
    </View>
  );
}