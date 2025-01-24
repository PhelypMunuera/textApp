import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';

export function ProptAlert() {
  return (
    <View style={styles.bgAlert}>
      <View style={styles.alert}>
        <Text style={styles.textAlert}>
          Permitir que a ACORD acesse sua localização para ativar alertas
          baseados em GPS
        </Text>

        <View style={styles.divButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log('Sim');
            }}
          >
            <Text style={styles.buttonText}> sim </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={Bad}>
            <Text style={styles.buttonText}> não </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function Prompt() {
  console.log('aeeee');
}
function Bad() {
  Alert.alert('hhhh');
}
