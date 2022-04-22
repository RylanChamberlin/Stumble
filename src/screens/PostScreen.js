import { useState } from "react";
import { ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import ButtonSwitch from "../components/ButtonSwitch";
import NewPost from "../components/NewPost";
import PostBox from "../components/PostBox";



export default function PostScreen(){

    const image = require('../../src/assets/images/yeet.jpeg');
    
    const [post, setPost] = useState(false)

    return(
        <ImageBackground style= { styles.backgroundImage } source={image} resizeMode='cover'>
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <View style={{alignItems: "center",}}>

                
                    <Text style={styles.title}>Posts</Text>
                </View>

                <ButtonSwitch button1 = "RECENT" button2 = "POPULAR"/>
                
                <TouchableOpacity style={styles.newPost} onPress={() => setPost(!post)}>
                    <Text style={{fontSize:20, fontWeight: "bold"}}>CREATE NEW POST</Text>
                </TouchableOpacity>
            </View>


            <NewPost post = {post} setPost={setPost}/>
            


        <ScrollView>
            <PostBox/>
            <PostBox/>
            <PostBox/>
            <PostBox/>
            <PostBox/>
            <PostBox/>
            <PostBox/>
            <PostBox/>
        </ScrollView>   
            
        </SafeAreaView>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
       
    },
    header:{
        height: "15%",
        justifyContent: "space-between",
        marginBottom: 10
        //backgroundColor: 'green',
    },
    title:{
        color: 'white',
        fontSize: 35,
    },
      backgroundImage:{
        flex: 1,
    },

    newPost:{

        alignItems: "center", 
        backgroundColor: 'white',
        borderRadius: 10
    }

})

