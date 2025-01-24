import { styles } from './styles';
import { useState } from 'react';
import { ProptAlert } from '../AlertGPS';
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
            O aplicativo não podera funcionar sem essa permissão. Deseja
            retornar ao ACORD?
          </Text>

          <View style={styles.divButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                ProptAlert();
              }} //como chamar a função para voltar
            >
              <Text style={styles.buttonText}> voltar </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text style={styles.buttonText}> fechar </Text>
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
