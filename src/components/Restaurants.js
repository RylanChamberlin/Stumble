import { StyleSheet, View, Text, ActivityIndicator, FlatList } from "react-native";
import useRestaurants from "../hooks/useRestaurants";
import {useEffect} from 'react';


export default function Restaurants({term}){
  
  const [{data, loading, error}, searchRestaurants] = useRestaurants();

  useEffect(() => {
    searchRestaurants(term);
  }, [term]);//will run function again if [term] is changed

  console.log({data, loading, error})

  if(loading) return <ActivityIndicator size = "large" marginVertical={30}/>

  if(error) return(
    <View style={styles.container}>
      <Text style={styles.header}>{error}</Text>
    </View>
    );

  return(
    <View style={styles.container}>
      <Text style={styles.header}>Top Restaurants</Text>
      <FlatList
        date={data}
        keyExtractor={(restaurant) => restaurant.id}
        renderItem={({item}) => <RestaurantItem restaurant={item}/>}

        />
    </View>
    );
}



const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    marginVertical: 25,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 10,
  }

})