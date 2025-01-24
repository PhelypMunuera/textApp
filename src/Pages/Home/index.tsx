import { styles } from './styles';
import { View, Alert, TouchableOpacity } from 'react-native';

import { BackGround } from '../../Componets/BackGround';
import { ProptAlert } from '../../Componets/Alert';

export function Home() {
  return (
    <View style={styles.background}>
      {/* <ProptAlert /> */}
      <BackGround />
    </View>
  );
}
