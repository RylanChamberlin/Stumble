import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import {elevation} from "../../common/styles"

export default function ResultItem({name, loading, imageUrl, handlePress}){
    // : <ActivityIndicator size = "large" marginVertical={30}/>}



    return (
        <TouchableOpacity onPress={handlePress}>
        <View style={styles.outsideContainer}>
            <View style={[styles.container, styles.elevation]}>               
                <Image style = {styles.image} source={imageUrl ? {uri: imageUrl} : null}/>
            </View>
            <Text style = {styles.name}>{name}</Text>  
        </View>
        </TouchableOpacity> 
    );
}

const styles = StyleSheet.create({
    outsideContainer: {

        width: 170,
        height: 145,
        margin: 4,
        alignItems: "center",
    },
    container: { 
        width: 150,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10
    },
    elevation,
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    name: {
        fontWeight: "bold",
    }
});