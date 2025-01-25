import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  div: {
    width: '100%',
    height: 50,
    position: 'absolute',
    flexDirection: 'row',

    marginTop: 430,

    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 10,
  },
  inputBase: {
    width: 350,
    height: 50,

    backgroundColor: 'rgba(238, 238, 238, 1)',
    position: 'relative',
    borderRadius: 16,
    padding: 14,
    fontWeight: 'bold',
  },

  inputIcon: {
    height: 30,
    width: 30,
    color: 'rgba(142, 142, 142, 1)',
    position: 'absolute',
    right: 50,
  },
});
