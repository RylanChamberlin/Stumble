import {View, Text, TouchableOpacity, Image, ScrollView, ImageStyle } from "react-native";
import {GOOGLE_KEY} from '@env'
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../../App";

// type Props = NativeStackScreenProps<RootStackParamList, 'Single'>;

const BarBox = ({item, numComment}) => {

    const navigation = useNavigation({navigation});
    // navigates to comments on the bar
    const clickBar = () => {
        navigation.navigate('Single', {
            itemId: item.key,
            name: item.name,
          });
    }
    
    return (

            <TouchableOpacity activeOpacity={.8} onPress={clickBar}>
            
            <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false}>
            
            <View style={[styles.outsideContainer]}>
                <View style={styles.container}>
                    <View style = {styles.infoBox}>

                        <View style = {styles.infoBoxLeft}>
                            <Text style = {[styles.title, styles.bold]}>{item.name}</Text>

                            <View>
                                <Text>new posts</Text>
                            </View>
                            
                            <View>
                                <Text style={styles.bold}>TODAY'S DEALS:</Text>
                                <Text>{}</Text>
                            </View>
                        </View>
                        
                        <View style={styles.infoBoxRight}>
                            <Image style = {styles.image} source={{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.photoID}&key=${GOOGLE_KEY}`}}/>
                        </View>
                    </View>
                </View>
            </View>
            </ScrollView>
            </TouchableOpacity>
    );

}

export default BarBox;