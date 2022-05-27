import { StyleSheet } from "react-native";



export default StyleSheet.create({
  
    titleContainer: {
        alignItems: "center",
        flexDirection: 'row'
    },

    backArrow: {
        marginRight: "auto"
    },

    title:{
        marginRight: "auto",
        color: 'white',
        fontSize: 25,
        shadowColor: "black",
        shadowOffset: {width: 5, height: 5}, //gives shadow offset
        shadowOpacity: .6,
    },

    search: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 20,
        margin: 10
    },


    friendOutsideContainer:{
        padding: 10,
        backgroundColor: "lightgrey",
        borderRadius: 15,
        borderWidth: 1,

    },

    friendContainer:{
        padding: 10,
        backgroundColor: "white",
        borderRadius: 15,
        
    },

    friendTitle:{
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 10,
    },
   
})