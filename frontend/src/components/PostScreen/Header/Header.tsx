import { View, Text, TouchableOpacity } from 'react-native'
import React, { Dispatch, FC, SetStateAction } from 'react'
import styles from './styles'
import { useState } from 'react';
import ButtonSwitch from '../../general/ButtonSwitch';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/Nav';

type Props = {
  title?: string,
  left: boolean,
  setLeft: Dispatch<SetStateAction<boolean>>
}

type HeaderNavigationProps = NativeStackNavigationProp<RootStackParamList, 'BottomTab' | 'NewPostScreen'>;

export const Header: FC<Props> = ({title, left, setLeft}) => {
  
  const [post, setPost] = useState<boolean>(false);
  const navigation = useNavigation<HeaderNavigationProps>()

  const makeNewPost = () => {
    navigation.navigate("NewPostScreen");
  }

  const singleBar = (title: string) => {
   

    const goBack = () => {
      navigation.navigate("BottomTab");
    }

    return(
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backArrow}>
          <AntDesign name="arrowleft" size={24} color="black"/>
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
      </View> 
    );
  
  }

  return (

    <View style={styles.header}>
      {title ? singleBar(title) : <View style={styles.titleContainer}><Text style={styles.title}>POSTS</Text></View>}
      <ButtonSwitch button1 = "RECENT" button2 = "POPULAR" left={left} setLeft={setLeft}/>
      <TouchableOpacity style={styles.newPostButton} onPress={() => makeNewPost()}>
        <Text style={styles.newPostText}>CREATE NEW POST</Text>
      </TouchableOpacity>
    </View>     
  );
}

export default Header;