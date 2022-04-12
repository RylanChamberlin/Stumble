import { useEffect } from "react";
import { View, Text, FlatList} from "react-native";
import useRestaurant from "../hooks/useRestaurant";

export default function ReviewScreen({navigation}){
    const [{data, loading, error}, searchRestaurant] = useRestaurant();
    const id = navigation.getParam("id");

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




