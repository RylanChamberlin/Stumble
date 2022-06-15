import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    

    barInput: {
       
        padding: 10,
        fontSize: 20,
        //borderRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        textAlignVertical: "top",
        backgroundColor: 'white',
        borderWidth: 1,
        fontWeight: 'bold',
    },


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


    list: {
        marginTop: 61,
        marginLeft: 15,
        width: '100%',
        height: '90%',
        position: "absolute",
    },

    listItem: {
        backgroundColor: 'white', borderWidth: 1, padding: 15,
    },

    listName : {
        fontSize: 16, color: 'black', fontWeight: '400'
    },

    listAddress: {
        fontSize: 10, color: 'grey', fontWeight: '300'
    },
});