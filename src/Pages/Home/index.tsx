import { styles } from './styles';
import { Text, View, ImageBackground } from 'react-native';

export function Home() {
  return (
    <View style={styles.background}>
      <ImageBackground
        source={require('../../Assets/backgroundImg.png')}
        resizeMode="cover"
        style={styles.bgImg}
      ></ImageBackground>
      <Text>treinar bora!</Text>
    </View>
  );
}
