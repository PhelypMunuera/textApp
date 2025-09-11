import { View } from "react-native"; 
import { styles, placesStyles } from './styles'; 
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"; 
export function Search() { 
  return ( 
  <View style={styles.masck}>   
  <GooglePlacesAutocomplete 
  styles={placesStyles} placeholder="Qual é seu destino..." 
  query={{ key: "AIzaSyB8dZANe2f_Tu37jvyitU6DgI0FdiZPMEQ", language: "pt-BR", }} 
  onPress={(data, details) => { 
    console.log(data, details);
  }} 
  minLength={2} fetchDetails
  /> 
  </View>)
}