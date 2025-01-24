import { ReactNode } from 'react';
import { ImageBackground } from 'react-native';

import { Container } from './styles';

interface ImgBgProps {
  children: ReactNode;
}

export function ImgBg() {
  return (
    <ImageBackground
      source={require('../../Assets/LogoWhite.png')}
      resizeMode="cover"
      style={styles.whiteLogo}
    ></ImageBackground>
  );
}
