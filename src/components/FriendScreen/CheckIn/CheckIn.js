import { useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View} from "react-native";
import { auth } from "../../../firebase";
import useLocation from "../../../hooks/useLocation";
import PopupPost from "../../general/PopupPost/PopupPost";
import styles from "./styles";

import {GOOGLE_KEY} from '@env'



export default function CheckIn({post, setPost}){

    const [{data, loading, error}, getLocation] = useLocation();
    useEffect(() => {
        getLocation();
    }, []);

    //console.log(data?.coords.latitude)

    var axios = require('axios');
    var config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data?.coords.latitude}%2C${data?.coords.longitude}&radius=50&type=bar&key=${GOOGLE_KEY}`,
    headers: { }
    };

    let barNames;
    axios(config)
    .then(function (response) {
        barNames = response.data.results;
        response.data.results.forEach(function(data) {
        //console.log(data.name);
    });

    console.log(barNames[0])
    
    })
    .catch(function (error) {
    console.log(error);
    });

    if(loading) return (<ActivityIndicator/>)

    return(
        <PopupPost post={post} setPost={setPost} title={'CHECK-IN'} buttonTitle={'CHECK-IN'}>

        <View style={styles.container}>
            <View style={styles.userBox}>
                <Image style={styles.image}/>
                <View style={styles.nameBox}>
                    <Text style={styles.name}>Rylan Chamberlin</Text>
                    <Text style={styles.username}>@pretty.boy.3</Text>
                </View>
            </View>
            {/* <TextInput style={styles.input} placeholder='is at....'></TextInput> */}
            <FlatList
                data={barNames} 
                renderItem={({ item, index }) => {   
                    console.log(item)
                return (
                    <Text style={styles.barName}>{item.name}</Text>
                );
                }}
                vertical
                showsVerticalScrollIndicator={false}
                //keyExtractor={(bar) => bar.name}
            />
            
            <Text style={{color: 'red'}}>NEARBY</Text>
            <View style={styles.barnameBox}>
                <Text style={styles.barName}>Harpo's </Text>
                <Text style={styles.cityName}>Columbia, MO</Text>
            </View>
            <View style={styles.barnameBox}>
                <Text style={styles.barName}>The Shot Bar </Text>
                <Text style={styles.cityName}>Columbia, MO</Text>
            </View>
        </View>
        </PopupPost>        
    );
}
