import { styles } from './styles';
import { TouchableOpacity, Text } from 'react-native';
import {Search} from '../Search'

type Props = {
  value: string;
  onPress?: () => void;
  disabled?: boolean;
};

export function ButtonBig({ value, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      style={styles.buttonBig}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.textButton}>{value}</Text>
    </TouchableOpacity>
  );
}



