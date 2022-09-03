import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5

    }, 
    image:{
        height: 50,
        width: 50,
        borderRadius: 50/2,
        marginLeft: 10,
        marginVertical: 5,
        
    },
    textContainer: {
        flex:1,
        paddingVertical: 12,
        marginHorizontal: 10,
        justifyContent: 'space-between'
    },
    rightContainer: {
        alignItems: "flex-end",
        marginTop: 'auto',
        paddingVertical: 5,
        paddingRight: 5
    },
    location: {
        fontWeight: "bold"
    },

    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
});