import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Dimensions } from 'react-native';
import {elevation, bold} from "../../../common/styles";
import LikeButton from "../../general/LikeButton";
import { useState } from "react";
import {GOOGLE_KEY} from '@env'
import { useNavigation } from "@react-navigation/native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
                        <Text style = {[styles.title, bold]}>{item.name}</Text>

                        <View>
                            {numComment == 1 ? 
                            <Text>{numComment} new post</Text> : 
                            <Text>{numComment ??= 0} new posts</Text>
                            }
                        </View>
                        
                        <View style = {styles.specialsContainer}>
                            <Text style={[styles.specialsTitle, bold]}>TODAY'S DEALS:</Text>
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

const infoBoxWidth = windowWidth-30;

const styles = StyleSheet.create({

    outsideContainer:{
        padding: 3,
        shadowColor: "black",
        shadowOffset: {width: 10, height: 30}, //gives shadow offset
        shadowOpacity: .3,
    },

    container: {
        borderRadius: 8,
        backgroundColor: "#f2f1f1",
        marginTop: 5,
        width: infoBoxWidth,
        borderWidth: 1,
        
    },
   
    infoBox: {

        padding: 10,
        margin: 10,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "space-between",
        

        },
    infoBoxRight: {
      
     
    },
    infoBoxLeft: {
        width: infoBoxWidth/3,
        justifyContent: "space-between",
       
    },
    title: {
        fontSize: 20,
    },
    
    image: {

        resizeMode : 'stretch',
        width: infoBoxWidth/2.3, 
        height: infoBoxWidth/3,
        borderRadius: 10
    },
    elevation,
    bold,

})