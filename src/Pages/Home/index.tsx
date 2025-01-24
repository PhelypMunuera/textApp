import { styles } from './styles';
import { Text, View, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { BackGround } from '../../Componets/BackGround';

export function Home() {
  return (
    <View style={styles.background}>
      <BackGround />
    </View>
  );
}
