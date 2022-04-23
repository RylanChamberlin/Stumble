import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Modal} from "react-native";
import StarButton from './StarButton';

import { Dimensions } from 'react-native';
import {elevation, bold} from "../../common/styles";
import LikeButton from "./LikeButton";
import { useState } from "react";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function BarBox({name, review_count, specials, events, imageUrl, milesAway, moreInfo, rentals }){

    const [more, setMore] = useState(true);
    
    return (
        <ScrollView horizontal={true}>
        <View style={styles.container}>
            <View style = {styles.infoBox}>
                <View style = {styles.infoBoxLeft}>
                    <Text style = {[styles.title, bold]}>{name}</Text>

                    <View>
                        <Text>16 new Comments</Text>
                    </View>
                    
                    <View style = {styles.specialsContainer}>
                        <Text style={[styles.specialsTitle, bold]}>TODAY'S SPECIALS:</Text>
                        <Text>{specials}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setMore((isMore) => !isMore)}>
                        {more ? moreButton() : <View style = {styles.moreContainer}><Text style={styles.moreArrow}>More Info:</Text></View>} 
                    </TouchableOpacity>
                    
                </View>

                <View style={styles.infoBoxRight}>
                    <View>
                        <LikeButton/>
                    </View>
                    <Image style = {styles.image} source={imageUrl}/>

                </View>
            </View>

                <View>
                    {!more ? moreText( () => setMore((isMore) => !isMore),  milesAway, moreInfo, rentals, imageUrl) : null} 
                </View>
               
        </View>
        </ScrollView>
    );

}

function moreButton(){
    return( 
        <View style = {styles.moreContainer}>
            <Text style={[styles.moreText, bold]}>more </Text>
            <Text style={styles.moreArrow}>ˇ</Text>
        </View> 
    );
}

function lessButton(){
    return(
        <View style = {styles.moreContainer}>
            <Text style={styles.moreArrow}>^</Text>
        </View>      
    );
}

function moreText(onClick, milesAway, moreInfo, rentals, image){
    return(
        <View>

            <View style = {styles.moreTextContainer}>
                <Text>{milesAway}</Text>
                <Text>{moreInfo}</Text>

                <ScrollView horizontal={true}>
                    <Image style = {styles.image} source={image}/>
                    <Image style = {styles.image} source={image}/>
                    <Image style = {styles.image} source={image}/>
                    <Image style = {styles.image} source={image}/>
                    <Image style = {styles.image} source={image}/>
                </ScrollView>

                <Text>{rentals}</Text>   

            </View>
            <TouchableOpacity onPress={onClick}>
                {lessButton(onClick)}
            </TouchableOpacity>     
        </View>
    );
}

const infoBoxWidth = windowWidth-30;
const infoBoxHeight = windowHeight/4;

const styles = StyleSheet.create({

    container: {
        borderRadius: 8,
        marginTop: 12,
        backgroundColor: "rgb(249,249,249)",
        width: infoBoxWidth,
        
    },
   
    infoBox: {
        borderRadius: 8,
        backgroundColor: "rgb(249,249,249)",
        flexDirection: "row",
        width: infoBoxWidth,

        },
    infoBoxRight: {
        flexDirection: "column",
        width: infoBoxWidth/2,
        alignItems: 'flex-end',
        justifyContent: "space-between",
        paddingRight: 5,
    },
    infoBoxLeft: {
        width: infoBoxWidth/2,
        justifyContent: "space-between",
        marginLeft: 5
    },
    title: {
        fontSize: 20,
    },
    
    moreContainer: {
        flexDirection: "row",
    },

    moreText: {
        fontSize: 12,
    },

    moreArrow: {
        paddingTop: 4,
    },
    image: {
        width: infoBoxWidth/2 - 10,
        height: (infoBoxWidth/2 - 10)/1.3,
        borderRadius: 5
    },
    elevation,
    bold,

})