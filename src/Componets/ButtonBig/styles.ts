import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonBig: {
    width: 350,
    height: 50,
    display: 'flex',
    backgroundColor: 'rgba(209, 213, 214, 1)',
    position: 'absolute',
    zIndex: 11,
    alignSelf: 'center',
    marginTop: 730,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',

     // iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,

    // Android
    elevation: 6,
  },

  textButton: {
    color: 'rgba(19, 38, 47, 1)',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
