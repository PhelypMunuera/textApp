import { styles } from './styles';
import { View } from 'react-native';

import { BackGround } from '../../Componets/BackGround';
import { LogoFloating } from '../../Componets/LogoFloating';

export function SelectDestination() {
  return (
    <View style={styles.background}>
      <LogoFloating />
      <BackGround />
    </View>
  );
}

// import { ButtonsBig } from '../../Componets/ButtonsBig';
// import { InputBase } from '../../Componets/InputBase';
// import { TextMessage } from '../../Componets/TextMessage';
// import { MasckBacground } from '../../Componets/MasckBacground';
