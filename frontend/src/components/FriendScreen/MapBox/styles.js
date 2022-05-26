import { StyleSheet } from "react-native";


export default StyleSheet.create({
  container: {
      flex: 1,
      //backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      //marginBottom: 30,
      marginVertical: 20
      
    },
    map: {
      //marginTop: 30,
      width: '100%',
      height: '100%',
      borderRadius: 20
    },

    title:{
      color: 'white',
      fontSize: 35,
  },

    box:{

        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 30,
        marginBottom: 10,
        backgroundColor: '#f2f1f1',
        borderWidth: 1,
        borderRadius: 10
    },

    image: {
      width: 25, 
      height: 25, 
      borderWidth: 1, 
      borderRadius: 50,
      backgroundColor: 'blue',
  },

  Button:{
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 10,
  },
})