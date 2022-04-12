import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import useRestaurants from "../../hooks/useRestaurants";
import ResultItem from "./ResultItem";



export default function Results({title}){

const [{data, loading, error}, searchRestaurants] = useRestaurants();

    useEffect(() => {
        searchRestaurants(title);
    }, [title]);//will run function again if [term] is changed


    if(loading) return <ActivityIndicator size = "large" marginVertical={30}/>

    if(error) return(
        <View style={styles.container}>
        <Text style={styles.header}>{error}</Text>
        </View>
        );
        
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList 
                data={data} 
        
                renderItem={({ item }) => {
                    return (
                    <ResultItem
                        name={item.name} 
                        loading={loading}
                        imageUrl={item.image_url} 
                        handlePress={() => console.warn(`${item.name}`)}
                    />
                    );
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(restaurant) => restaurant.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        marginVertical: 0
    },
    
    title: {
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: 10,
    }
})