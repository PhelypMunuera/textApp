import { styles } from './styles';
import { View } from 'react-native';

import { BackGround } from '../../Componets/BackGround';
import { LogoFloating } from '../../Componets/LogoFloating';
import { MasckBacground } from '../../Componets/MasckBacground';

export function SelectDestination() {
  return (
    <View style={styles.background}>
      <LogoFloating />
      <MasckBacground />
      <BackGround />
    </View>
  );
}

// import { ButtonsBig } from '../../Componets/ButtonsBig';
// import { InputBase } from '../../Componets/InputBase';
// import { TextMessage } from '../../Componets/TextMessage';
// import { MasckBacground } from '../../Componets/MasckBacground';
