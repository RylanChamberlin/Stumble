
import { SafeAreaView, StyleSheet, View, ImageBackground} from "react-native";
import Header from "../components/SearchScreen/Header";
import Search from "../components/SearchScreen/Search";
export default function MainScreen(){

    const image = require('../../src/assets/images/kel.png');
    
    return (
        <View style={styles.container}>
            <ImageBackground style= { styles.backgroundImage } source={image} resizeMode='cover'>
            <SafeAreaView>
                <Header/>
                <Search/>
              
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
})

