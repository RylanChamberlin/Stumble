import { StyleSheet } from "react-native";


export default StyleSheet.create({
  
    box:{

        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#f2f1f1',
        borderWidth: 1,
        borderRadius: 10
    },

    image: {
        width: 50, 
        height: 50, 
        borderWidth: 1, 
        borderRadius: 50,
        backgroundColor: 'blue',
    },
    
    name: {
        fontSize: 30, 
        flex:1, 
        marginLeft: 10, 
        padding: 5
    },
})