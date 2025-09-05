import { StatusBar } from 'react-native';

import { View } from 'react-native';
import { Home } from './src/Pages/Home';
import { MapsView } from './src/Pages/MapsView';

export default function App() {
  return (
    <View>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'light-content'}
        translucent={true}
      />

      <MapsView />
    </View>
  );
}

// <StatusBar
//   barStyle={'light-content'}
//   backgroundColor="transparent"
//   translucent
// />;
