
import { SafeAreaView, ScrollView, StyleSheet, Text, View, ImageBackground} from "react-native";
import Header from "../components/MainScreen/Header";
import Results from "../components/MainScreen/Results";

export default function MainScreen(){

    const image = require('../../src/assets/images/kel.png');
    
    return (
        <View style={styles.container}>
            <ImageBackground style= { styles.backgroundImage } source={image} resizeMode='cover'>
            <SafeAreaView>
                <Header/>
                <ScrollView>
                <Results title='Campus Bar'/>
                <Results title='Top Rated Atmosphere'/> 
                <Results title='Best Value'/> 
                <Results title='Family Friendly'/> 
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                </ScrollView>
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
       // justifyContent: "center",
    },
})

