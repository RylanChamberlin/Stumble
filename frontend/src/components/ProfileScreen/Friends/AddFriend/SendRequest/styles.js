import { StyleSheet } from "react-native";

export default StyleSheet.create({

    title:{
        color: 'white',
        fontSize: 35,
    },

    box:{
        padding: 15,
        backgroundColor: '#f2f1f1',
        borderWidth: 1,
        borderRadius: 10
    },
   
    exit: {
        alignSelf: 'flex-end',
        position: 'absolute',
        padding: 15
    },

    search: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 20,
        margin: 10
    },

    innerBox:{
        padding: 10,
        backgroundColor: "white",
        borderRadius: 15,
        marginBottom: 10
    },

    acceptButton:{
        padding: 5,
        borderRadius: 10,
        backgroundColor: "lightgrey",
        marginLeft: 'auto',
    }
})