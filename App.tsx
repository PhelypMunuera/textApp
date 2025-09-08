import { StatusBar } from 'react-native';
import 'react-native-get-random-values';

import { View } from 'react-native';
import { Home } from './src/Pages/Home';
import { SelectDestination } from './src/Pages/SelectDestination';

export default function App() {
  return (
    <View>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'light-content'}
        translucent={true}
      />

      <SelectDestination />
    </View>
  );
}

// <StatusBar
//   barStyle={'light-content'}
//   backgroundColor="transparent"
//   translucent
// />;
