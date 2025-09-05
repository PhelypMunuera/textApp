import { styles } from './styles';
import { View, Text } from 'react-native';
import { Input } from '../../Componets/Input';
import { Adds } from '../../Componets/Adds';
import { ButtonBig } from '../../Componets/ButtonBig';
import { BackGround } from '../../Componets/BackGround';
import { LogoFloating } from '../../Componets/LogoFloating';
import { Maps } from '../../Componets/Maps';
import { MasckBacground } from '../../Componets/MasckBacground';

export function MapsView() {
  return (
    <View style={styles.background}>
      <LogoFloating />
      <Maps/>
       <MasckBacground />
      <BackGround />
    </View>
  );
}


//*<ButtonBig value={'continuar'} />* -- lemnbrar de fazer variavel do percurso/}
//* <Adds /> adicionar o estilo dos add */}