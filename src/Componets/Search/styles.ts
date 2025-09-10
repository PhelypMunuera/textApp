import { StyleSheet } from 'react-native';

export const placesStyles = {



   container: { flex: 0 }, // não ocupa a tela toda

  textInputContainer: { flexDirection: "row", justifyContent: "center" },

  textInput: {
    flex: 0,              // <- mata o flex:1 padrão do lib
    width: "95%",
    alignSelf: "center",
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },

 
  listView: {
    flex: 0, 
    width: "95%",
    alignSelf: "center", 
    position: "absolute",
    top: 50,
    zIndex: 1000,
    elevation: 1000,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
};



export const styles = StyleSheet.create({
masck: {
  flex: 1,
  width: '100%',
  height: 50,
  position: 'absolute',
  flexDirection: 'row',
  marginTop: 50,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
  //colocar sombra
},



});




//  div: {
 
//   },
//   inputBase: {
//     width: 350,
//     height: 50,

//     backgroundColor: 'rgba(238, 238, 238, 1)',
//     position: 'relative',
//     borderRadius: 16,
//     padding: 14,
//     fontWeight: 'bold',

//     color: 'rgba(142, 142, 142, 1)',
//   },

//   txt :{
//     width: 325,
//     fontSize: 22,
//     color: 'rgba(142, 142, 142, 1)',
//     marginTop: 350,
//     alignSelf: 'center',
//     position: 'absolute',
//     zIndex: 3,
//     fontWeight: '300',

//   },
// testegoogle:{
          
//             height: 50,
//             borderWidth: 1,
//             borderColor: "#ccc",
//             borderRadius: 5,
//             paddingHorizontal: 10,
//             marginTop: 16,
          
//         },
//   inputIcon: {
//     height: 30,
//     width: 30,
//     color: 'rgba(190, 190, 190, 1)',
//     position: 'absolute',
//     right: 50,
//   },

 