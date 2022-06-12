import { StyleSheet } from "react-native";


export default StyleSheet.create({

    container:{
        marginTop: 15,
        alignItems: 'center',
    },
    title:{
        fontSize: 35,
        color: 'white',
        shadowColor: "black",
        shadowOffset: {width: 5, height: 5}, //gives shadow offset
        shadowOpacity: .6,
    },
    locationBox:{
        flexDirection: 'row',
        shadowColor: "black",
        shadowOffset: {width: 5, height: 5}, //gives shadow offset
        shadowOpacity: .5,
    },
    buttonText: {
        color: '#f2f1f1', 
        marginTop: 5, 
        textDecorationLine: 'underline', 
        fontSize: 15
    }
    

})