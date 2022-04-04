import { StyleSheet, View, Text } from "react-native";
import yelp from "../api/yelp";

export default function Restaurants(){


    const searchRestaurants = async () => {
        const response = await yelp.get('/search', {
            params: {
                limit:1,
                term: 'Dessert',
                location: "Toronto"
            },
        });

        console.log(response);
    };

    searchRestaurants();

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Top Restaurants</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 25,
        marginVertical: 25,
        flex: 1,
    },
    header: {
        fontWeight: "bold",
        fontSize: 20,
        paddingBottom: 10,
        height: 100
    }

})