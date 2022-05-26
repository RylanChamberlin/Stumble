import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    recentButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        width: '48%',
        alignItems: "center",
        //paddingHorizontal: 50,
    },
    buttonText:{
        fontSize:20, fontWeight: "bold",
    },
});