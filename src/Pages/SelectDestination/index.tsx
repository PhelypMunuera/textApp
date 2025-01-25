import { styles } from './styles';
import { View, Text } from 'react-native';

import { BackGround } from '../../Componets/BackGround';
import { LogoFloating } from '../../Componets/LogoFloating';
import { MasckBacground } from '../../Componets/MasckBacground';
import { ButtonBig } from '../../Componets/ButtonBig';
import { Input } from '../../Componets/Input';

export function SelectDestination() {
  return (
    <View style={styles.background}>
      <LogoFloating />

      <Text style={styles.text}>
        Só uma perguntinha rápida antes de liberar seu sono!
      </Text>
      <Input />
      <ButtonBig value={'continuar'} />
      <MasckBacground />
      <BackGround />
    </View>
  );
}

//
//
// import { TextMessage } from '../../Componets/TextMessage';
// import { MasckBacground } from '../../Componets/MasckBacground';
