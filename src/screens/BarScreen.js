import { SafeAreaView, StyleSheet, View, ImageBackground, Text, ScrollView, FlatList} from "react-native";
import { Dimensions } from 'react-native';
import BarBox from "../components/BarScreen/BarBox";
import Search from "../components/BarScreen/Search";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function BarScreen(){


    const commonCategories = [
        { 
            name: "Willie's / FieldHouse",
            review_count: "432",
            specials: "$2 Tuesday",
            events: "neon party",
            imageUrl: require('../assets/images/willies.jpeg')
        },      
        { 
            name: "Harpos",
            review_count: "233",
            specials: "$2 Tuesday",
            events: "N/A",
            imageUrl: require('../assets/images/harpos.jpeg')
        },
        { 
            name: "Campus Bar and Grill",
            review_count: "420",
            specials: "$2 Shots, $2 Seltzers",
            events: "Beer Pong",
            imageUrl: require('../assets/images/b12.jpeg')
        },
        { 
            name: "Nash Vegas",
            review_count: "69",
            specials: "$3 Nash Vegas Bombs",
            events: "Live Music",
            imageUrl: require('../assets/images/nash.jpeg')
        },
        { 
            name: "Shiloh's",
            review_count: "902",
            specials: "Bottomless Wings",
            events: "Bingo",
            imageUrl: require('../assets/images/shilos.jpeg')
        },
        { 
            name: "The Understudy",
            review_count: "223",
            specials: "$2 Beer",
            events: "N/A",
            imageUrl: require('../assets/images/understudy.webp')
        }
    ];

    const image = require('../assets/images/kel.png');

        return (
        <View style={styles.container}>
            <ImageBackground style= { styles.backgroundImage } source={image} resizeMode='cover'>
            <SafeAreaView>

                <View style={styles.logo}>
                    <Text>Logo</Text>
                </View>

                <Search/>

                <FlatList 
                    data={commonCategories} 
                    renderItem={({ item, index }) => {
                    return (
                        <BarBox
                        
                            name={item.name} 
                            review_count={item.review_count}
                            specials = {item.specials}
                            events = {item.events}
                            imageUrl={item.imageUrl} 
                            //index = {index} 
                            //active={item.name === term} 
                        />
                    );
                }}
                vertical
                keyExtractor={(bar) => bar.name}
        />
            
            </SafeAreaView>
            </ImageBackground>
        </View>
        
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      backgroundImage:{
        flex: 1,
    },
    logo: {
        alignItems: 'center',
    },
})

