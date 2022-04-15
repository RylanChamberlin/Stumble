import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Modal} from "react-native";
import StarButton from './StarButton';

import { Dimensions } from 'react-native';
import {elevation} from "../../common/styles";
import LikeButton from "./LikeButton";
import { useState } from "react";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function BarBox({name, review_count, specials, events, imageUrl}){

    const [more, setMore] = useState(true);
    

    return (
        <ScrollView horizontal={true}>
        <View style={styles.container}>
            <View style = {styles.infoBox}>
                <View style = {styles.infoBoxLeft}>
                    <Text style = {styles.title}>{name}</Text>
                    <View style = {styles.reviews}>
                        <StarButton/>
                        <StarButton/>
                        <StarButton/>
                        <StarButton/>
                        <StarButton/>
                        <Text style = {styles.reviewNumber}>{review_count}</Text>
                    </View>

                    <View style = {styles.specialsContainer}>
                        <Text style={styles.specialsTitle}>TODAY'S SPECIALS:</Text>
                        <Text style={styles.specialsText}>{specials}</Text>
                    </View>

                    <View style = {styles.eventContainer}>
                        <Text style={styles.eventTitle}>TODAY'S EVENTS:</Text>
                        <Text style={styles.eventText}>{events}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setMore((isMore) => !isMore)}>
                        {more ? moreButton() : <View style = {styles.moreContainer}><Text style={styles.moreArrow}>More Info:</Text></View>} 
                    </TouchableOpacity>
                    
                </View>

                <View style={styles.infoBoxRight}>
                    <View style={styles.likeButton}>
                        <LikeButton/>
                    </View>
                    <Image style = {styles.image} source={imageUrl}/>

                    <View>
                        <TouchableOpacity onPress={() => console.warn('Reserve Button pressed')}>
                            <View style={[styles.buttonStyle, styles.elevation]}>
                                <Text style={styles.buttonTextStyle}>RESERVE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

                <View>
                    {!more ? moreText(() => setMore((isMore) => !isMore)) : null} 
                </View>
               
        </View>
        </ScrollView>
    );

}

function moreButton(){
    return( 
        <View style = {styles.moreContainer}>
            <Text style={styles.moreText}>more </Text>
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

function moreText(onClick){
    return(
        <View>

            <View style = {styles.moreTextContainer}>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                
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
        marginHorizontal: 15,
        backgroundColor: "rgb(249,249,249)",
        width: infoBoxWidth,
        
    },
    moreTextContainer:{
        marginHorizontal: 15,
        //marginTop: 40
    },
    infoBox: {
        //marginTop: 12,
        //marginHorizontal: 15,
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
        paddingRight: 5
    },
    infoBoxLeft: {
        width: infoBoxWidth/2,
        

    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        paddingLeft: 5,
        paddingTop: 5,
        
    },
    reviews: {
        flexDirection: "row",
        paddingLeft: 5,

    },
    reviewNumber: {
        padding: 2
    },

    specialsContainer: {
        padding: 5,
        marginLeft: 5,
        marginTop: 20
    },

    specialsTitle: {
        fontWeight: "bold",
    },
    specialsText: {

    },
    eventContainer: {
        marginLeft: 5,
        padding: 5,
        marginTop: 20
    },
    eventTitle: {
        fontWeight: "bold",
    },
    eventText: {

    },
    
    moreContainer: {
        flexDirection: "row",
        marginLeft: 10,
        marginTop: 15,
        //backgroundColor: "green"
        
    },

    moreText: {
        fontSize: 12,
        fontWeight: "bold",
    },

    moreArrow: {
        marginTop: 4,
        fontWeight: "bold",
    },
    likeButton: {
       marginTop: 5,
       marginRight: 5
    },
    image: {
        width: infoBoxWidth/2 - 10,
        height: (infoBoxWidth/2 - 10)/1.3,
        //marginVertical: 7,
        borderRadius: 5
    },
    buttonStyle: {
        //marginTop: 15,
        marginBottom: 5,
       // marginRight: 5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth:1,
        backgroundColor: "white",
        
    },
    buttonTextStyle: {
        fontWeight: "bold",
        fontSize: 16
    },
    elevation,

})