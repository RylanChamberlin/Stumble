import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import ButtonSwitch from "../components/ButtonSwitch";
import NewPost from "../components/NewPost";
import PostBox from "../components/PostBox";
import { auth, db } from "../firebase";



export default function PostScreen(){


    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users
    
    
    
    const [formValue, setFormValue] = useState('');
    const [post, setPost] = useState(false);
    const messageClass = users?.uid === auth.currentUser.uid ? 'sent' : 'received';

    const messagesRef = db.collection('messages');

    const sendMessage = async() => {
        const {uid, photoURL} = auth.currentUser;
        await messagesRef.add({
        text: formValue,
        createdAt: new Date(),
        uid,
        photoURL
        });
    }
    useEffect(() => {
        const subscriber = db
        .collection('messages')
        .orderBy('createdAt')
        .onSnapshot(querySnapshot => {
            const users = [];
    
            querySnapshot.forEach(documentSnapshot => {
            users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
            });
    
            setUsers(users);
            setLoading(false);
        });
    
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    const image = require('../../src/assets/images/yeet.jpeg');    
    


    if (loading) {
        return <ActivityIndicator />;
        }

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

    
            <FlatList

                contentContainerStyle={{marginBottom: 300}}
                data={users}
                
                renderItem={({ item }) => (
                    <PostBox item = {item}/>
                )}
            />  
           
           
    
        
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
        marginBottom: 10,
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

