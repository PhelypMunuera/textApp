import { styles } from './styles';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export function Input() {
  return (
    <View style={styles.div}>
      <TextInput
        style={styles.inputBase}
        placeholder="Informe o seu destino..."
        placeholderTextColor="rgba(142, 142, 142, 1)"
      />
      <Icon style={styles.inputIcon} name="map-pin" size={30} />
    </View>
  );
}
