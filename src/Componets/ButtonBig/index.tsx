import { styles } from './styles';
import { TouchableOpacity, Text } from 'react-native';

export function ButtonBig({ value }: { value: string } ) {
  return (
    <TouchableOpacity style={styles.buttonBig}>
      <Text style={styles.textButton}>{value}</Text>
    </TouchableOpacity>
  );
}
