import { styles } from './styles';
import { View, Text } from 'react-native';

import { BackGround } from '../../Componets/BackGround';
import { LogoFloating } from '../../Componets/LogoFloating';
import { MasckBacground } from '../../Componets/MasckBacground';
import { Input } from '../../Componets/Input';

export function SelectDestination() {
  return (
    <View style={styles.background}>
      <LogoFloating />

      <Text style={styles.text}>
        Só uma perguntinha rápida antes de liberar seu sono!
      </Text>

      <Input />
      <MasckBacground />
      <BackGround />
    </View>
  );
}

// import { ButtonsBig } from '../../Componets/ButtonsBig';
//
// import { TextMessage } from '../../Componets/TextMessage';
// import { MasckBacground } from '../../Componets/MasckBacground';
