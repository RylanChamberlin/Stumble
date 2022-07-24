import { StyleSheet } from "react-native";


export default StyleSheet.create({

    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '80%', 
        marginTop: 20, 
        marginBottom: 20
    },

    line: {
        flex: 1, 
        height: 1, 
        backgroundColor: 'black'
    },

    title: {
        width: 50, 
        textAlign: 'center'
    }
})