import { styles } from './styles';
import { View, ImageBackground } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

export function BackGround() {
  return (
    <View style={styles.background}>
      <LinearGradient
        colors={['rgba(19, 38, 47, 1)', 'rgba(18, 138, 152, 1)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }} // Ponto inicial (canto superior esquerdo)
        end={{ x: 1, y: 1 }}
      >
        <ImageBackground //imagem do fundo
          source={require('../../Assets/backgroundImg.png')}
          resizeMode="cover"
          style={styles.bgImg}
        ></ImageBackground>

        <LinearGradient
          colors={[
            'rgba(19, 38, 47, 1)',
            'rgba(18, 138, 152, .8)',
            'rgba(18, 138, 152, 0.43)',
          ]}
          locations={[0, 0.5, 1]} // Define os stops (0%, 50%, 100%)
          style={styles.gradient}
          start={{ x: 0, y: 0 }} // Ponto inicial (canto superior esquerdo)
          end={{ x: 1, y: 1 }}
        ></LinearGradient>
      </LinearGradient>
    </View>
  );
}
