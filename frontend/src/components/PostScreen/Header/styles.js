import { StyleSheet } from "react-native";


export default StyleSheet.create({
    header:{
        marginBottom: 5,
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: "center"
    },

    backArrow: {
        //marginRight: 5
       // paddingRight: 20
    },

    title:{
        color: 'white',
        fontSize: 35,
        shadowColor: "black",
        shadowOffset: {width: 5, height: 5}, //gives shadow offset
        shadowOpacity: .6,
        marginLeft: 'auto', 
        marginRight: 'auto'
    },

    newPostButton:{
        marginTop: 3,
        alignItems: "center", 
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        padding: 5
    },

    newPostText: {
        fontSize:20, 
        fontWeight: "bold"
    }
})