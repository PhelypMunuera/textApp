import { styles } from './styles';
import { View, Text } from 'react-native';
import { Search } from '../../Componets/Search';
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
      <Search />
      <ButtonBig value={'continuar'} />
      {/* <Adds /> adicionar o estilo dos add */}
      <MasckBacground />
      <BackGround />
    </View>
  );
}
