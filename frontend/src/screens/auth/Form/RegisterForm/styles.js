import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
    //   display: 'flex',
    //   margin: 20,
        width: '80%',
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
       
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },

      loading: {
        
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: ''
      }
  })