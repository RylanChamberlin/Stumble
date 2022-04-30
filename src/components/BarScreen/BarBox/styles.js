import { Dimensions, StyleSheet } from 'react-native';
import {elevation, bold} from "../../../common/styles";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const infoBoxWidth = windowWidth-30;


export default StyleSheet.create({
    outsideContainer:{
        padding: 3,
        shadowColor: "black",
        shadowOffset: {width: 10, height: 30}, //gives shadow offset
        shadowOpacity: .3,
    },

    container: {
        borderRadius: 8,
        backgroundColor: "#f2f1f1",
        marginTop: 5,
        width: infoBoxWidth,
        borderWidth: 1,
        
    },
   
    infoBox: {

        padding: 10,
        margin: 10,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "space-between",
        

        },
    infoBoxRight: {
      
     
    },
    infoBoxLeft: {
        width: infoBoxWidth/3,
        justifyContent: "space-between",
       
    },
    title: {
        fontSize: 20,
    },
    
    image: {

        resizeMode : 'stretch',
        width: infoBoxWidth/2.3, 
        height: infoBoxWidth/3,
        borderRadius: 10
    },
    bold,
});