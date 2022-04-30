import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Dimensions } from 'react-native';
import LikeButton from "../../general/LikeButton";
import { useState } from "react";
import {GOOGLE_KEY} from '@env'
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";



export default function BarBox({item, numComment}){


    const navigation = useNavigation({navigator})

    const clickBar = () => {
        console.log(item)
        //navigation.navigate('Single');
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
                                {numComment == 1 ? 
                                <Text>{numComment} new post</Text> : 
                                <Text>{numComment ??= 0} new posts</Text>
                                }
                            </View>
                            
                            <View style = {styles.specialsContainer}>
                                <Text style={[styles.specialsTitle, styles.bold]}>TODAY'S DEALS:</Text>
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