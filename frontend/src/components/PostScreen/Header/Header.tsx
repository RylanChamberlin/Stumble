import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import styles from './styles'
import { useState } from 'react';
import NewPost from '../NewPost';
import ButtonSwitch from '../../general/ButtonSwitch';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 

type Props = {
  title: string,
  left: boolean,
  setLeft: any
}

export const Header: FC<Props> = ({title, left, setLeft}) => {
  
  const [post, setPost] = useState<boolean>(false);

  const singleBar = (title: string) => {

    const navigation = useNavigation<any>()
  
    const goBack = () => {
      navigation.navigate("BottomTab")
    }
  
    return(
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backArrow}>
          <AntDesign name="arrowleft" size={34} color="black"/>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View> 
    );
  
  }

  return (

    <View style={styles.header}>
      
        {title ? singleBar(title) : <View style={{alignItems: "center"}}><Text style={styles.postTitle}>POSTS</Text></View>}
      
      <ButtonSwitch button1 = "RECENT" button2 = "POPULAR" left={left} setLeft={setLeft}/>
      <NewPost post = {post} setPost={setPost}/>
      <TouchableOpacity style={styles.newPost} onPress={() => setPost(!post)}>
        <Text style={{fontSize:20, fontWeight: "bold"}}>CREATE NEW POST</Text>
      </TouchableOpacity>
    </View>     
  );
}

export default Header;