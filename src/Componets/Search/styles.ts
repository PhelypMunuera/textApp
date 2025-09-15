import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

export const placesStyles = {



   container: { 
    position:"absolut",
    top: Platform.select({ios:60, android:50}),
    width: "100%" 
   },

  textInputContainer: { 
    flexDirection: "row", 
    justifyContent: "center" 
  },

  textInput: {
    flex: 0,    
    height: 44,  
    width: "95%",
    alignSelf: "center",
    
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",

      // iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,

    // Android
    elevation: 6,
  },

 
  listView: {
    flex: 0, 
    width: "95%",
    alignSelf: "center", 
    position: "absolute",
    top: 25,
    zIndex: 1000,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    
      // iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,

    // Android
    elevation: 6,
  },
};



export const styles = StyleSheet.create({
masck: {
  flex: 0
},



});

// flex: 1,
//   width: '100%',
//   height: 50,
//   position: 'absolute',
//   flexDirection: 'row',
//   marginTop: 0,
//   justifyContent: 'center',
//   alignItems: 'center',
//   zIndex: 10,
//    // iOS
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.15,
//     shadowRadius: 12,

//     // Android
//     elevation: 6,


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

 