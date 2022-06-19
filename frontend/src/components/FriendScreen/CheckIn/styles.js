import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   
    container: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        height: '100%',
        backgroundColor: 'white',
        //justifyContent: 'space-between'
    },
    userBox: {
        flexDirection: 'row',        
    },
    nameBox: {
        padding: 10, 
        margin: 5,
        borderWidth: 1,
        borderRadius: 15
    },
    image: {
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 50,
        marginRight: 10,
    },
    name: {
        fontSize: 25, 
        fontWeight: "bold"
    },
    username: {
        fontSize: 18,
        fontWeight: '200',
    },
    input: {
        padding: 5,
        backgroundColor: '#f2f1f1',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 15,
    },
    barName: {
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom: 5
    },
    cityName: {
        fontSize: 18,
        marginTop: 3,
        marginHorizontal: 5
    },
    barnameBox:{
        flexDirection: 'row',
    },

    nearby: {
        color: 'red'
    }
});