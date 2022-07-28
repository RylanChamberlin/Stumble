import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
    //   display: 'flex',
    //   margin: 20,
        width: '80%'
    },

    title: {
        fontWeight: 'bold', 
        fontSize: 30, 
        padding: 5, 
        textAlign: 'center'
    },

    textContainer: {
        flexDirection: 'row', 
        padding: 5, 
        justifyContent: "center"
    },

    textSize: {
        fontSize: 15 
    },

    boldText: {
        fontWeight: 'bold', 
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
  })