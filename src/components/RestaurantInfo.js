import { View,Text, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import {elevation} from "../common/styles"

function RestaurantInfo({data, navigation}){

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.phone}>{data.display_phone}</Text>
            <Text style={styles.hours}>{hoursElement(data.hours)}M-F 8-10</Text>
            <Text>Price {data.price}</Text>
            <Text>Rating: {data.rating}/5</Text>
            <Text>{data.location.display_address}</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("Review", {id: data.id})}
            >
                <View style={[styles.elevation, styles.review]}>
                    <Text style={styles.reviewText}>Reviews: {data.review_count}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

};

function hoursElement(hours){
    if(hours.is_open_now) return(<Text>Open Till: </Text>);
    return(<Text>Closed {hours.open}</Text>);
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 25,
        marginVertical: 25,
        alignItems: "center",
        backgroundColor: "grey",
        
    },
    title: {
        color: "blue",
        fontWeight: "bold",
        fontSize: 35,
        paddingBottom: 10,
    },
    phone: {
        fontWeight: "bold",
        paddingBottom: 10,
    },
    hours: {
        fontWeight: "bold",
        paddingBottom: 10,
    },
    review: {
        backgroundColor: "green",
        width: 100,
        height: 50,
        borderRadius: 20,
        marginVertical: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    reviewText: {
        fontWeight: "bold",
    },
    elevation

  
  })

  export default withNavigation(RestaurantInfo);