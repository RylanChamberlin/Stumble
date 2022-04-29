import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppView from "../components/general/AppView";
import ButtonSwitch from "../components/general/ButtonSwitch";
import NewPost from "../components/PostScreen/NewPost";
import PostBox from "../components/PostScreen/PostBox";
import { auth, db } from "../firebase";
import useMessages from "../hooks/useMessages";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";



export default function PostScreen(route){

    const [{data, loading, error}, getMessages] = useMessages();
    const [post, setPost] = useState(false);
    const navigation = useNavigation({navigator})

    let itemId, name;
    if(route.route.params){
        itemId = route.route.params.itemId;
        name = route.route.params.name
    }

    const goBack = () => {
        navigation.navigate("BottomTab")
    }

    useEffect(() => {
        getMessages(itemId);
    }, []);// [] could be which bar?

    if (loading) {
        return <ActivityIndicator />;
    }

    return(
       
        <AppView>
            <View style={styles.header}>
                <View style={{alignItems: "center",}}>

                    {name ? <View style={{alignItems: "center", flexDirection: 'row'}}>
                                <TouchableOpacity onPress={goBack}>
                                    <AntDesign name="arrowleft" size={34} color="black"/>
                                </TouchableOpacity>
                                <Text style={styles.title}>{name}</Text>
                            </View> 
                            : 
                            <Text style={styles.title}>POSTS</Text>}
                </View>

                <ButtonSwitch button1 = "RECENT" button2 = "POPULAR"/>
                
                <TouchableOpacity style={styles.newPost} onPress={() => setPost(!post)}>
                    <Text style={{fontSize:20, fontWeight: "bold"}}>CREATE NEW POST</Text>
                </TouchableOpacity>
            </View>


            <NewPost post = {post} setPost={setPost}/>

           
            <FlatList

                contentContainerStyle={{marginBottom: 300}}
                data={data}
                
                renderItem={({ item }) => (
                    <PostBox item = {item}/>
                )}
                keyExtractor={(item) => item.key}
            />  


        </AppView>
       
    );

}

const styles = StyleSheet.create({
   
    header:{
        height: "15%",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title:{
        color: 'white',
        fontSize: 35,
        shadowColor: "black",
        shadowOffset: {width: 5, height: 5}, //gives shadow offset
        shadowOpacity: .6,
    },
    newPost:{
        alignItems: "center", 
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        padding: 5
    }

})

