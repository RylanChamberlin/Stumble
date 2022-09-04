import { View, Text, TouchableOpacity } from 'react-native'
import React, { Dispatch, FC, SetStateAction } from 'react'
import styles from './styles'
import ButtonSwitch from '../../general/ButtonSwitch'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../navigation/types'

type NavProp = NativeStackNavigationProp<RootStackParamList, 'CheckInScreen'>;

type HeaderProps = {
    feed: boolean
    setFeed: Dispatch<SetStateAction<boolean>>
}

const Header: FC<HeaderProps> = ({feed, setFeed}) => {

    const navigation = useNavigation<NavProp>()

    const goCheckIn = () => {
        navigation.navigate("CheckInScreen")
    }

  return ( 
        <View style={styles.header}>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>FRIENDS</Text>
            </View>

            <ButtonSwitch button1 = "FEED" button2 = "MAP" left = {feed} setLeft = {setFeed}/>

            <TouchableOpacity style={styles.newPost} onPress={() => goCheckIn()}>
                <Text style={styles.buttonText}>CHECK-IN</Text>
            </TouchableOpacity>
        </View>
  )
}

export default Header