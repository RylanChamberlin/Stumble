import {View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { Bar } from "../../../services/bars";
import { FC } from "react";
import { RootStackParamList } from "../../../../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// type Props = NativeStackScreenProps<RootStackParamList, 'Single'>;

type Props = { 
    item: Bar,
    
 }; 

 type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Single'>;

const BarBox: FC<Props> = ({item}) => {

    //const navigation = useNavigation<navigation>();
    const navigation = useNavigation<any>()
    
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
                        <Text style = {[styles.title, styles.bold]}>{item.name}</Text>
                        <Text style = {styles.topPostTitle}>TODAY'S TOP POST</Text>
                        <Text style = {styles.topPost} >{item.topPost ? `"${item.topPost}"` : 'Click to add new post'}</Text>
                        <View style = {styles.newPostsBox}>
                            <Text style = {styles.postCount}>{item.postCount} new posts </Text>
                            <Text style = {styles.seeAll}>see all</Text>
                        </View>
                    </View>
                </View>
            </View>
            </ScrollView>
            </TouchableOpacity>
    );

}

export default BarBox;