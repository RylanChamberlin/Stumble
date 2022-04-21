import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Entypo } from '@expo/vector-icons'; 
import { useState } from "react";

export default function PostBox(){

    const [count, setCount] = useState(0);

    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={{paddingBottom: 15, fontSize: 20}}>blah blah bldddddah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah</Text>
                <Text style = {{fontWeight: 'bold'}}>At b12 5 minutes at ago</Text>
            </View>
            <View style={styles.likeContainer}>
                <TouchableOpacity onPress={() => setCount(count+1)}>
                    <Entypo name="plus" size={24} color="black" />
                </TouchableOpacity>
                <Text style = {{marginTop: 5}}>{count}</Text>
                <TouchableOpacity onPress={() => setCount(count-1)}>
                    <Entypo name="minus" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 15,
        marginVertical: 5
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
    }
})