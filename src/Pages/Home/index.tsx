import { styles } from './styles';
import { View } from 'react-native';

import { BackGround } from '../../Componets/BackGround';
import { ProptAlert } from '../../Componets/AlertGPS';

export function Home() {
  return (
    <View style={styles.background}>
      <ProptAlert />
      <BackGround />
    </View>
  );
}
