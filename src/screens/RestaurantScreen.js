import { useEffect } from "react";
import { View, Text, FlatList, Dimensions, Image, StyleSheet, ScrollView } from "react-native";
import RestaurantInfo from "../components/RestaurantScreen/RestaurantInfo";
import useRestaurant from "../hooks/useRestaurant";

export default function RestaurantScreen({navigation}){
    const [{data, loading, error}, searchRestaurant] = useRestaurant();
    const id = navigation.getParam("id");

    const dimensions = Dimensions.get("window");
    const imageWidth = dimensions.width;
    const imageHeight = Math.round((dimensions.width * 9)/16);

    useEffect(() => {
        searchRestaurant(id);
    }, []);

    console.log(data);

    if(loading) return <Text>Loading...</Text>;
    if(error) return <Text>{error}</Text>;

    return (
        <View>
            {data && (
                <View>
                    <RestaurantInfo data = {data}/>
                    <FlatList
                        data={data.photos}
                        keyExtractor={(photo) => photo.id}
                        renderItem={({ item }) => (
                            <Image 
                                source={{uri: item}} 
                                style={{height: imageHeight, width: imageWidth}}
                            />
                        )} 
                    />
                    
                    
                   
                </View>
            )}    
        </View>
    );
}




