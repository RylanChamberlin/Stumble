import { useEffect, useState } from "react";
import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { auth, db, dbTime } from "../../../firebase";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {GOOGLE_KEY} from '@env'
import PopupPost from "../../general/PopupPost/PopupPost";
import useLocation from "../../../hooks/useLocation";
import { useRef } from "react";


export default function NewPost({post, setPost}){

    const [barInput, setBarInput] = useState("");
    const [bar, setBar] = useState("");
    const [input, setInput] = useState("");
    const [placeID, setPlaceID] = useState("");
    const [photoID, setPhotoID] = useState("");
    const [nearby, setNearby] = useState("");
    // const [keyword, setKeyword]

    const inputRef = useRef(null);

    const [location, getLocation] = useLocation();

    useEffect(() => {
        getLocation();
    }, [])

    useEffect(() => {
        console.log('barinput: ', barInput)
    }, [barInput])

    useEffect(() => {    
        //if coords are there fethc data
        if(location.data){
            const latitude = location.data.coords.latitude;
            const longitude = location.data.coords.longitude;
            fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=50000&type=bar&keyword=${barInput}&key=${GOOGLE_KEY}`)
            .then(response => response.json())
            .then(json => setNearby(json)) 
            console.log('fetching nearby list search')
        }
    }, [barInput])


    //
    if(nearby){
        nearby.results.forEach(element => console.log(element.name));
    }
    //console.log('\n\n')
   
    const handleEndEditing = () => {
        if(!input && !barInput) return
        setBarInput("")
        setInput("")
    }

    
    const writeMessage = async() => {

        const messagesRef = db.collection('messages');
        const {uid, photoURL} = auth.currentUser;
        await messagesRef.add({
        placeID: placeID, 
        bar: barInput,
        text: input,
        votes: 0,
        createdAt: dbTime,
        uid,
        });

    }

    const addNewBarWithMessage = async() => {
        db.collection('bars').doc(placeID).set({
            name: barInput,
            photoID: photoID
        });

        writeMessage();
        console.log("Making new document!");
    }

    const sendMessage = () => {

        setPost(!post);
        const docRef = db.collection("bars").doc(placeID);
        docRef.get().then((doc) => {
            if (doc.exists) {
                writeMessage();
            } else {
                addNewBarWithMessage();
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        handleEndEditing();
        
    }

    const clickBarName = (data) => {
        
        
        console.log(data);  
        setPhotoID(data.photos[0]?.photo_reference);
        setBarInput(data.name)
        setNearby('')
        setPlaceID(data.place_id);
        console.log(barInput)
        inputRef.current.focus();
    }


    return(

        <PopupPost post={post} setPost={setPost} title={'NEW POST'} buttonTitle={'POST'} buttonAction={sendMessage}>
        
        <TextInput 
            placeholder='Type SOMETHING........' 
            style = {styles.barInput} 
            maxLength = {100}
            value={barInput} 
            onPressIn={() => {setBarInput('')}}
            onChangeText={(text) => {setBarInput(text);
            }}
        />
        <TextInput 
            placeholder='Type SOMETHING........'
            ref = {inputRef} 
            style = {styles.textInput} 
            multiline={true} 
            maxHeight={200} 
            numberOfLines={3}
            maxLength = {256}
            value={input} 
            
            onChangeText={(text) => {
                setInput(text)    
            }}

            onPressIn={() => {setSearch(true)}}
        />
        <View style={styles.list}>
        <FlatList
            data={nearby.results}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => clickBarName(item)}>
                    <View style={{backgroundColor: 'white', borderWidth: 1, padding: 5,}}>
                        <Text style={{fontSize: 20}}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )}
            // ItemSeparatorComponent={}
            keyExtractor={(item) => item.place_id}
            showsVerticalScrollIndicator={false} 
        />
        </View>
                            
        {/* <GooglePlacesAutocomplete

            placeholder="Search"
            fetchDetails={true}
            GooglePlacesSearchQuery={{
                rankby: "distance",
                type: 'bar',
                types: 'cities'
            }}
            onPress={(data, details = null) => {
                console.log(data.place_id);
                
                setPhotoID(details.photos[0]?.photo_reference);
                setBarInput(data.structured_formatting.main_text);
                setPlaceID(data.place_id);
            }}
            query={{
                key: `${GOOGLE_KEY}`,
                language: "en",
                components: "country:us",
                fields: ["name"],
                types: "bar",
                radius: 100,
                location: `38.951561, -92.328636`
            }}
            styles={{
                container: { 
                    flex: 1,
                    // borderRadius: 10,
                    //backgroundColor: "black"
                    //borderWidth: 1
                    },
                listView: { 
                    backgroundColor: "white", 
                    }
            }}
        /> */}
        
        </PopupPost> 
    );
}

const styles = StyleSheet.create({

    textInput: {
        height: 200,
        marginTop: 30,
        padding: 10,
        fontSize: 20,
        borderRadius: 10,
        textAlignVertical: "top",
        backgroundColor: 'white',
        borderWidth: 1,
        
    },

    barInput: {
       
        padding: 10,
        fontSize: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        textAlignVertical: "top",
        backgroundColor: 'white',
        borderWidth: 1
        
    },
    list: {
        marginTop: 50,
        marginLeft: 15,
        width: '100%',
        height: '100%',
        position: "absolute",
    }


})