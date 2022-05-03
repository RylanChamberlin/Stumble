import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import ButtonSwitch from '../../general/ButtonSwitch'
import CheckIn from '../CheckIn'
import { useState } from 'react'

const Header = ({feed, setFeed}) => {

const [post, setPost] = useState(false);

  return (
        <View style={styles.header}>
        
            <View style={{alignItems: "center",}}>
            
                <Text style={styles.title}>FRIENDS</Text>
            </View>
            <ButtonSwitch button1 = "FEED" button2 = "MAP" left = {feed} setLeft = {setFeed}/>

            <CheckIn post={post} setPost={setPost}/>
            {/* Not sure the best place for this */}

            <TouchableOpacity style={styles.newPost} onPress={() => setPost(!post)}>
                <Text style={{fontSize:20, fontWeight: "bold"}}>CHECK-IN</Text>
            </TouchableOpacity>

        

        </View>



  )
}

export default Header