import { useEffect } from "react";
import { View, Text, FlatList, Dimensions, Image, StyleSheet, ScrollView } from "react-native";
import RestaurantInfo from "../components/RestaurantInfo";
import useRestaurant from "../hooks/useRestaurant";

export default function RestaurantScreen({navigation}){
    const [{data, loading, error}, searchRestaurant] = useRestaurant();
    const id = navigation.getParam("id");

    const dimensions = Dimensions.get("window");
    const imageWidth = dimensions.width;
    const imageHeight = Math.round((dimensions.width * 9)/16);

    useEffect(() => {
        searchRestaurant(id+"/reviews");
    }, []);

    console.log(data);

    if(loading) return <Text>Loading...</Text>;
    if(error) return <Text>{error}</Text>;

    return (
        <View>
            {data && (
                <FlatList
                    data={data.reviews}
                    keyExtractor={(comment) => comment.id}
                    renderItem={({item}) => <Text style = {{padding: 15}}>{item.text}</Text> }

                />
            )}    
        </View>
    );
}




