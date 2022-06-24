import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor: '#f2f2f1',
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        marginBottom: 10,
       
    },

    textContainer:{
        flexDirection: 'column',
        
    },

    imageContainer:{
        width: 75,
        height: 75,
        borderRadius: 50,
        backgroundColor: "#E1E2E6",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },

    image:{
        position: "absolute",
        width: 75,
        height: 75,
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 50,      
    },

    name: {
        fontSize: 25,
        fontWeight: "bold",
    },

    sectionContainer:{
        flexDirection: 'row'
    },

    text: {
        flexDirection: 'column'
    },

    friendButton: {
        
        marginLeft: 'auto',
        marginBottom: 'auto',
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'white',
        borderWidth: 1,
    },

    checkinSpot: {
        fontSize: 20, fontWeight: 'bold'
    },

    postButton: {
        backgroundColor: 'black', borderRadius: 20, alignItems: 'center'
    },

    postText: {
        fontWeight: 'bold', fontSize: 30, color: 'white', justifyContent: 'center'
    }
})