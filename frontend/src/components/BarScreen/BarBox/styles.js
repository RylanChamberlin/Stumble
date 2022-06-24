import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const infoBoxWidth = windowWidth-30;

export default StyleSheet.create({
    outsideContainer:{
        shadowColor: "black",
        shadowOffset: {width: 10, height: 10}, //gives shadow offset
        shadowOpacity: .3,
    },

    container: {
        borderRadius: 8,
        backgroundColor: "#f2f1f1",
        marginTop: 5,
        width: infoBoxWidth,
        borderWidth: 1,
        
    },
   
    infoBox: {

        flex: 1,
        padding: 10,
        margin: 10,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: "#ffffff",
        justifyContent: "space-between",
        

        },

    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    

    topPostTitle: {
        fontSize: 10, fontWeight: 'bold', textDecorationLine: 'underline',
        paddingVertical: 10
    },
    topPost:{
        fontSize: 25
    },

    postCount:{

    },

    seeAll: {
        fontSize: 10, fontWeight: 'bold', textDecorationLine: 'underline',
        marginTop: 2
    },

    newPostsBox: {
        flexDirection: 'row',
        marginLeft: 'auto'
    }

});