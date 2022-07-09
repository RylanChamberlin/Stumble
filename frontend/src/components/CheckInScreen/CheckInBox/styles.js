import { StyleSheet } from "react-native";
import {elevation} from "../../../common/styles"



export default StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        height: '100%',
        backgroundColor: 'white',
        //justifyContent: 'space-between'
    },
    userBox: {
        flexDirection: 'row',        
    },
    
    name: {
        fontSize: 25, 
        fontWeight: "bold"
    },
    username: {
        fontSize: 18,
        fontWeight: '200',
    },
  
    nearby: {
        color: 'black'
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
    
})