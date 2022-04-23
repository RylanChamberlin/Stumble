


// import { useAuthState } from 'react-firebase-hooks/auth'
// import {useCollectionData} from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { auth, db } from '../firebase';


export default function StartScreen(){

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  const [formValue, setFormValue] = useState('');
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


    if (loading) {
    return <ActivityIndicator />;
    }


    const getTime = (seconds) => {
      let time = new Date(seconds*1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      return time;
    }
  

    return (
      <SafeAreaView>
        <Text>nope</Text>
        {/* <FlatList
          data={users}
          renderItem={({ item }) => (

          <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Time: {getTime(item.createdAt?.seconds)}</Text>
            <Text>User UID: {item.uid}</Text>
            <Text>Text: {item.text}</Text>
          </View>
        )}
        /> */}

      <View style={{ height: 50, alignItems: 'center', backgroundColor: 'green'}}>
        <TextInput 
          placeholder="enter message"
          onChangeText={(text) => {setFormValue(text);
          }}

 

          />

          

          {/* <Text>{formValue}</Text> */}
  
      </View>

      <TouchableOpacity style={{ alignItems: "center", padding: 15, backgroundColor: 'blue'}} onPress={sendMessage}>
        <Text>Submit me</Text>
        
      </TouchableOpacity>
      </SafeAreaView>


    );

}
