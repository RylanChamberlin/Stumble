import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Categories from "../components/HomeScreen/Categories";
import Header from "../components/HomeScreen/Header";
import Restaurants from "../components/HomeScreen/Restaurants";
import Search from "../components/HomeScreen/Search";

export default function HomeScreen(){

    const [term, setTerm] = useState("Burger");

    const commonCategories = [
    { 
      name: "Burger",
      imageUrl: require('../assets/images/burger.png')
    },
    { 
      name: "Pizza",
      imageUrl: require('../assets/images/pizza.png')
    },
    { 
      name: "Steak",
      imageUrl: require('../assets/images/steak.png')
    },
    { 
      name: "Drink",
      imageUrl: require('../assets/images/smoothies.png')
    },
    { 
      name: "Pasta",
      imageUrl: require('../assets/images/pasta.png')
    },
    { 
      name: "Cake",
      imageUrl: require('../assets/images/cake.png')
    }
  ];

    
    return (
    <View style={styles.container}>
        <Header />
        <Search setTerm={setTerm}/>
        <Categories categories={commonCategories} setTerm={setTerm} term={term}/>
        <Restaurants term = {term}/>
        

    </View>
    );
} 

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgb(253,253,253)',
      flex: 1,
    },
  });