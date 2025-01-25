import { styles } from './styles';
import { View, Text } from 'react-native';
import { Input } from '../../Componets/Input';
import { Adds } from '../../Componets/Adds';
import { ButtonBig } from '../../Componets/ButtonBig';
import { BackGround } from '../../Componets/BackGround';
import { LogoFloating } from '../../Componets/LogoFloating';
import { MasckBacground } from '../../Componets/MasckBacground';

export function SelectDestination() {
  return (
    <View style={styles.background}>
      <LogoFloating />

      <Text style={styles.text}>
        Só uma perguntinha rápida antes de liberar seu sono!
      </Text>
      <Input />
      <ButtonBig value={'continuar'} />
      {/* <Adds /> adicionar o estilo dos add */}
      <MasckBacground />
      <BackGround />
    </View>
  );
}
