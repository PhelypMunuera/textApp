import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
background: {
  position: 'absolute',
  flex: 1,
  width: '100%',
  height: '100%',
  }, 
    
map: {
 height: "90%",
 zIndex: 2
},

text: {
  fontSize: 22,
  color: 'rgba(255, 255, 255, 1)', 
  width: '100%',
  paddingHorizontal: 30
  },

mapsearch: {
    position: "absolute",
    top: 40,
    left: 16,
    right: 16,
    zIndex: 3,     
    elevation: 1,
}
});