import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  StatusBar,
} from 'react-native';
import { styles } from './styles';

export function ProptAlert() {
  return (
    <Modal transparent={true} animationType="fade">
      <StatusBar
        backgroundColor="transparent"
        barStyle={'light-content'}
        translucent={true}
      />

      <View style={styles.bgAlert}>
        <View style={styles.alert}>
          <Text style={styles.textAlert}>
            Permitir que a ACORD acesse sua localização para ativar os alertas
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
    </Modal>
  );
}

function Prompt() {
  console.log('aeeee');
}
function Bad() {
  Alert.alert('hhhh');
}
