import { StyleSheet } from "react-native";


export default StyleSheet.create({

    header:{
        height: "15%",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title:{
        color: 'white',
        fontSize: 35,
        shadowColor: "black",
        shadowOffset: {width: 5, height: 5}, //gives shadow offset
        shadowOpacity: .6,
    },

    titleContainer: {
        alignItems: "center"
    },
    newPost:{
        alignItems: "center", 
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        padding: 5
    },

    buttonText: {
        fontSize:20, 
        fontWeight: "bold"
    }
    

})