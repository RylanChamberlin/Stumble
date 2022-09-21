import {View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { FC } from "react";
import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";


type BarBoxProps = { 
    bar: any,
 }; 

type BarBoxNavigationProps = NativeStackNavigationProp<RootStackParamList, 'SinglePostScreen'>;

const BarBox: FC<BarBoxProps> = ({bar}) => {

    const navigation = useNavigation<BarBoxNavigationProps>()
    
    // navigates to comments on the selected bar
    const clickBar = () => {

        navigation.navigate('SinglePostScreen', {
            bar: bar
          });
    }
    
    return (
            <TouchableOpacity style={[styles.outsideContainer]} activeOpacity={.8} onPress={clickBar}>
                <View style={styles.container}>
                    <View style = {styles.infoBox}>
                        <Text style = {styles.title}>{bar.name}</Text>
                        <Text style = {styles.topPostTitle}>TODAY'S TOP POST</Text>
                        <Text style = {styles.topPost} >{bar.topPost ? `"${bar.topPost}"` : 'Click to add new post'}</Text>
                        <View style = {styles.newPostsBox}>
                            <Text style = {styles.postCount}>{bar.postCount} new posts </Text>
                            <Text style = {styles.seeAll}>see all</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
    );

}

export default BarBox;