import { SafeAreaView, StyleSheet, View, ImageBackground, Text, ScrollView} from "react-native";
import { Dimensions } from 'react-native';
import BarBox from "../components/BarScreen/BarBox";
import Search from "../components/BarScreen/Search";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function BarScreen(){
    const image = require('../../src/assets/images/kel.png');
        return (
        <View style={styles.container}>
            <ImageBackground style= { styles.backgroundImage } source={image} resizeMode='cover'>
            <SafeAreaView>

                <View style={styles.logo}>
                    <Text>Logo</Text>
                </View>

                <Search/>
                <ScrollView>
                    <BarBox/>
                    <BarBox/>
                    <BarBox/>
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
    },
    logo: {
        alignItems: 'center',
    },
})

