import { useState } from "react";
import { Button, ImageBackground, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Feather } from '@expo/vector-icons'; 
import {elevation} from "../../../common/styles"
import { auth, db, dbTime } from "../../../firebase";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {GOOGLE_KEY} from '@env'
import AppView from "../../general/AppView";
import PopupPost from "../../general/PopupPost/PopupPost";


export default function CheckIn({post, setPost}){
    return(
        <PopupPost post={post} setPost={setPost} title={'CHECK-IN'} buttonTitle={'CHECK-IN'}>
            <Text>Hello</Text>
        </PopupPost>        
    );
}

const styles = StyleSheet.create({
   
    

})