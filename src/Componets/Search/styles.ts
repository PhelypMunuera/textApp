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

    color: 'rgba(142, 142, 142, 1)',
  },

  txt :{
    width: 325,
    fontSize: 22,
    color: 'rgba(142, 142, 142, 1)',
    marginTop: 350,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 3,
    fontWeight: '300',

  },
testegoogle:{
          
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            paddingHorizontal: 10,
            marginTop: 16,
          
        },
  inputIcon: {
    height: 30,
    width: 30,
    color: 'rgba(190, 190, 190, 1)',
    position: 'absolute',
    right: 50,
  },

 
});
