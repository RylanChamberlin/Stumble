import {useState} from 'react';
import { StyleSheet, View} from 'react-native';
import Header from "./src/components/Header";
import Search from "./src/components/Search";

import Categories from './src/components/Categories';
import Restaurants from './src/components/Restaurants';

export default function App() {

  const [term, setTerm] = useState("Burger");

  const commonCategories = [
    { 
      name: "Burger",
      imageUrl: require('./src/assets/images/burger.png')
    },
    { 
      name: "Pizza",
      imageUrl: require('./src/assets/images/pizza.png')
    },
    { 
      name: "Steak",
      imageUrl: require('./src/assets/images/steak.png')
    },
    { 
      name: "Drink",
      imageUrl: require('./src/assets/images/smoothies.png')
    },
    { 
      name: "Pasta",
      imageUrl: require('./src/assets/images/pasta.png')
    },
    { 
      name: "Cake",
      imageUrl: require('./src/assets/images/cake.png')
    }
  ];

  return (
    <View style={styles.container}>
      <Header />
      <Search setTerm={setTerm}/>
      <Categories categories={commonCategories} setTerm={setTerm} term={term}/>
      <Restaurants/>
    

    </View>
  );
}


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});