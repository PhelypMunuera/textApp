import { styles } from './styles';
import { TouchableOpacity, Text } from 'react-native';

export function ButtonBig({ value }) {
  return (
    <TouchableOpacity style={styles.buttonBig}>
      <Text style={styles.textButton}>{value}</Text>
    </TouchableOpacity>
  );
}
