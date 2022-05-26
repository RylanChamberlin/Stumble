import { StyleSheet } from 'react-native';
import {elevation} from "../../../common/styles"

export default StyleSheet.create({
    title:{
        color: 'white',
        fontSize: 35,
    },

    box:{
        height: "50%",
        padding: 15,
        backgroundColor: '#f2f1f1',
        borderWidth: 1,
        borderRadius: 10
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

    exit: {
        alignSelf: 'flex-end',
        position: 'absolute',
        padding: 15
    }
});