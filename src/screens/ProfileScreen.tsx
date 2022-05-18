import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

import AppView from "../components/general/AppView";
import ButtonSwitch from "../components/general/ButtonSwitch";
import LikeButton from "../components/general/LikeButton";
import PostList from "../components/PostScreen/PostList";
import { auth } from "../firebase";
import timeSince from "../services/timeSince";


const ProfileScreen = () => {

    const [feed,setFeed] = useState();


    const feedList = () => {
        return(
            <View style={styles2.container}>  
            <View style={styles2.image}></View>   
            <View style = {styles2.textContainer}>
                <Text>James Richard like your check-in</Text>
                <Text style = {{fontWeight: "bold"}}></Text>
            </View>
            <View style = {styles2.rightContainer}>
                <Text>{0 ? timeSince() : 'Now' }</Text>
                {/* <Text>{item.checkInAt.seconds = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text> */}
            </View>
        </View>
        )
    }


    return(
       
        <AppView>    
             <View style={styles.container}>
                <View style={styles.image}></View>

                <View style={styles.textContainer}>

                    <Text style={styles.name}>Rylan Chamberlin</Text>
                    <Text style={styles.username}>@prett.boy.3</Text>

                    <View style={styles.statContainer}>

                        <View style={styles.statCircle}>
                            <Text>12</Text>
                            <Text>checkins</Text>
                        </View>
                        <View style={styles.statCircle}>
                            <Text>245</Text>
                            <Text>upvotes</Text>
                        </View>

                        <TouchableOpacity>
                        <View style={styles.statCircle}>
                            <Text>12</Text>
                            <Text>friends</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
             </View>

           
            <ButtonSwitch button1 = "MY FEED" button2 = "MY POSTS" left = {feed} setLeft = {setFeed}/>

            {feed ? <PostList userId={auth.currentUser?.uid}/>: feedList()}
             

             

        </AppView>
    );

}

const styles = StyleSheet.create({

    container:{
        alignItems: 'center',
        backgroundColor: '#f2f2f1',
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        marginBottom: 10
    },

    textContainer:{
        flexDirection: 'column'
    },

    statContainer:{
        flexDirection: 'row'
    },

    image:{
        width: 75,
        height: 75,
        borderRadius: 50,
        backgroundColor: "blue",
        marginRight: 10
    },

    name: {
        fontSize: 25,
        fontWeight: "bold",
    },

    username: {

    },

    statCircle:{
        alignItems: 'center',
        margin: 5,
        padding: 10,
        borderRadius: 15,
        backgroundColor: 'white'
    },


})

const styles2 = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5

    }, 
    image:{
        //flex: 1,
        height: 50,
        width: 50,
        backgroundColor: 'blue',
        borderRadius: 50/2,
        marginLeft: 10,
        marginVertical: 5,
        
    },
    textContainer: {
        flex:1,
        paddingVertical: 12,
        marginHorizontal: 10,
        justifyContent: 'space-between'
    },
    rightContainer: {
        alignItems: "flex-end",
        marginTop: 'auto',
        paddingVertical: 5,
        paddingRight: 5
    }
})

export default ProfileScreen;