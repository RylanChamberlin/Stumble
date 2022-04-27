import { StyleSheet, Text, View } from "react-native";
import LikeButton from "../../general/LikeButton";

export default function FriendBox(){

    return(
        <View style={styles.container}>  

            <View style={styles.image}>

            </View>
                
            <View style = {styles.textContainer}>
                <Text>Rylan Chamberlin is at</Text>
                <Text style = {{fontWeight: "bold"}}>Harpo's</Text>
            </View>

            <View style = {styles.rightContainer}>
                <LikeButton/>
                <Text>7:48 pm</Text>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5

    }, 
    image:{
        //flex: 1,
        height: 50,
        width: 50,
        backgroundColor: 'blue',
        borderRadius: 50/2,
        marginLeft: 10,
        marginVertical: 5
    },
    textContainer: {
        paddingVertical: 12,
        justifyContent: 'space-between'
    },
    rightContainer: {
        alignItems: "center",
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingRight: 5
    }
})