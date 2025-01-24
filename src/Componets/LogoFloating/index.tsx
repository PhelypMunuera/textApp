import { View, Image } from 'react-native';
import { styles } from './styles';

export function LogoFloating() {
  return (
    <Image
      source={require('../../Assets/LogoWhite.png')}
      resizeMode="cover"
      style={styles.bgImg}
    />
  );
}

// source={require('../../Assets/backgroundImg.png')}
//           resizeMode="cover"
//           style={styles.bgImg}
