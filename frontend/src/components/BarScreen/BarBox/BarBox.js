import {View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import {GOOGLE_KEY} from '@env'
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

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
                            <Text style = {{fontSize: 10, fontWeight: 'bold', textDecorationLine: 'underline',}}>TODAY'S TOP POST</Text>
                            <Text>new posts</Text>
                        </View>
                        
                    </View>
                </View>
            </View>
            </ScrollView>
            </TouchableOpacity>
    );

}

export default BarBox;