import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bgAlert: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: ' rgba(19, 38, 47, .8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    width: 380,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ' rgba(209, 213, 214, 1)',
    //colocar sobra
    borderRadius: 30,
    padding: 20,
  },
  textAlert: {
    fontSize: 25,
    textAlign: 'center',
    color: 'rgba(19, 38, 47, 1)',
  },

  divButton: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 30,
  },

  button: {
    width: 145,
    height: 40,
    backgroundColor: 'rgba(19, 38, 47, 1)',
    borderRadius: 50,
    marginBottom: 50, //deletar essta parte #red
    //colocar sombra
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgba(17, 201, 192, 1)',
    textAlign: 'center',
  },
});
