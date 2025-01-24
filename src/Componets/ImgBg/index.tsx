import { styles } from './styles';
import { ImageBackground } from 'react-native';

export function ImBg() {
  return (
    <ImageBackground
      source={require('../../Assets/LogoWhite.png')}
      resizeMode="cover"
      style={styles.whiteLogo}
    ></ImageBackground>
  );
}
