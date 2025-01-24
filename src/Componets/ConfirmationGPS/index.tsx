import { styles } from './styles';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  StatusBar,
} from 'react-native';

export function ConfirmationGPS() {
  const [visible, setVisible] = useState(true);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
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
                setVisible(false);
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
  Alert.alert('Você não pode continuar sem essa permissão');
}

{
  /* <StatusBar
backgroundColor="transparent"
barStyle={'light-content'}
translucent={true}
/> */
}

// checar o status do GPS -> se não tiver on entra nesse modal -> perde pra ligar  -> se aceitar liga // se nao aceitar chama o outro modal
