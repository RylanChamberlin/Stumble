import { StyleSheet } from 'react-native';
import { elevation } from "../../../common/styles";

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 15,
        marginVertical: 5,
        borderWidth: 1,
    },
    textContainer: {
        flexDirection: 'column',
        width: "90%"
    },
    likeContainer: {
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
    },
    elevation
})