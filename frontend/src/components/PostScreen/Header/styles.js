import { StyleSheet } from "react-native";


export default StyleSheet.create({
    header:{
        height: "15%",
        marginBottom: 10,
    },

    titleContainer: {
        // alignItems: "center",
        flexDirection: 'row'
    },

    backArrow: {
        // marginRight: "auto"
    },

    title:{
       // marginRight: "auto",
        color: 'white',
        fontSize: 35,
        shadowColor: "black",
        shadowOffset: {width: 5, height: 5}, //gives shadow offset
        shadowOpacity: .6,
    },
    postTitle:{
        color: 'white',
        fontSize: 35,
        shadowColor: "black",
        shadowOffset: {width: 5, height: 5}, //gives shadow offset
        shadowOpacity: .6,
    },
    newPost:{
        alignItems: "center", 
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        padding: 5
    }
})