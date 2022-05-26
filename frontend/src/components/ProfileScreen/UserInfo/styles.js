import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor: '#f2f2f1',
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        marginBottom: 10
    },

    textContainer:{
        flexDirection: 'column'
    },

    statContainer:{
        flexDirection: 'row'
    },

    image:{
        width: 75,
        height: 75,
        borderRadius: 50,
        backgroundColor: "blue",
        marginRight: 10
    },

    name: {
        fontSize: 25,
        fontWeight: "bold",
    },

    username: {

    },

    statCircle:{
        alignItems: 'center',
        margin: 5,
        padding: 10,
        borderRadius: 15,
        backgroundColor: 'white'
    },
})