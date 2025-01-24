import { styles } from './styles';
import { View } from 'react-native';

import { BackGround } from '../../Componets/BackGround';
import { ProptAlert } from '../../Componets/AlertGPS';
import { ConfirmationGPS } from '../../Componets/ConfirmationGPS';

export function Home() {
  return (
    <View style={styles.background}>
      <ConfirmationGPS />
      <BackGround />
    </View>
  );
}
