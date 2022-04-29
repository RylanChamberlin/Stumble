import { useState } from "react";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppView from "../components/general/AppView";
import ButtonSwitch from "../components/general/ButtonSwitch";
import FriendBox from "../components/FriendScreen/FriendBox";
import CheckIn from "../components/FriendScreen/CheckIn/CheckIn";



export default function FriendScreen(){
       

    const [post, setPost] = useState(false);

    return(
       
        <AppView>

            <View style={styles.header}>
                <View style={{alignItems: "center",}}>
                    <Text style={styles.title}>FRIENDS</Text>
                </View>

                <ButtonSwitch button1 = "RECENT" button2 = "SEARCH"/>
                
                <TouchableOpacity style={styles.newPost} onPress={() => setPost(!post)}>
                    <Text style={{fontSize:20, fontWeight: "bold"}}>CHECK-IN</Text>
                </TouchableOpacity>
            </View>


            <CheckIn post = {post} setPost={setPost}/>

            <ScrollView>
                <FriendBox/>
                <FriendBox/>
                <FriendBox/>
               
            </ScrollView>

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