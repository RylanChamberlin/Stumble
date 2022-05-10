import { StyleSheet } from "react-native";


export default StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      marginBottom: 10
      
    },
    map: {
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
        // justifyContent: 'space-between', 
        marginHorizontal: 30,
        marginBottom: 10,
        //padding: 15,
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
})