import { useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View} from "react-native";
import { auth } from "../../../firebase";
import useLocation from "../../../hooks/useLocation";
import PopupPost from "../../general/PopupPost/PopupPost";
import styles from "./styles";

import {GOOGLE_KEY} from '@env'
import useNearby from "../../../hooks/useNearby";



export default function CheckIn({post, setPost}){

    const [{data, loading, error}, searchNearby] = useNearby();
    useEffect(() => {
        searchNearby();
    }, []);

    

    if(loading || !data) return (<ActivityIndicator/>)

    console.log(data?.results)

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
                data={data?.results} 
                renderItem={({ item, index }) => {   
                    console.log(item)
                return (
                    <Text style={styles.barName}>{item.name}</Text>
                );
                }}
                vertical
                showsVerticalScrollIndicator={false}
                keyExtractor={(index) => index}
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
