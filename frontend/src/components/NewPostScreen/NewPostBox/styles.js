import { StyleSheet } from "react-native";
import {elevation} from "../../../common/styles"



export default StyleSheet.create({
    
    // barButton: {
    //     borderRadius: 10,
    //     backgroundColor: 'black',
    //     padding: 1,
    // },

    box:{
        height: "50%",
        padding: 15,
        backgroundColor: '#f2f1f1',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 15,
    },
   
    button:{
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 230,
        marginTop: 5,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        
    },
    buttonText:{
        fontSize: 20,
        fontWeight: "bold"
    },
    elevation,

    textInput: {
        height: '80%',
        marginTop: 15,
        padding: 10,
        fontSize: 20,
        borderRadius: 10,
        textAlignVertical: "top",
        backgroundColor: 'white',
        borderWidth: 1,
    },


    

})