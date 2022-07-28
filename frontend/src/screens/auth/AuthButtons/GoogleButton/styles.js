import { StyleSheet } from "react-native";

export default StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        width: '80%',
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
    },

    icon: {
        fontSize: 16, 
        padding: 5, 
        marginRight: 5
    },

    text: {
        fontSize: 18
    }
    
})