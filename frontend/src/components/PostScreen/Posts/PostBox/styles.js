import { StyleSheet } from 'react-native';
import { elevation } from "../../../../common/styles";

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
    voteContainer: {
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
    },

    voteCount: {
        marginTop: 2,
    },

    postText: {
        paddingBottom: 10, 
        fontSize: 20
    },

    bottomTextInfo:{
        flexDirection: 'row', 
        marginTop: 'auto'
    },
    
    barName: {
        fontWeight: 'bold', 
        maxWidth: '60%'},

    date: {
        fontWeight: '200',
        marginLeft: 'auto',
        marginTop: 'auto'
    },

    elevation
})