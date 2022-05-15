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
        //flex: 1,
        height: 50,
        width: 50,
        backgroundColor: 'blue',
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
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingRight: 5
    }
});