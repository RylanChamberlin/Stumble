import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useAppSelector } from "../../../app/hooks"
import useNearby from "../../../hooks/useNearby"
import { RootStackParamList } from "../../../navigation/Nav"
import NearbyBarList from "../NearbyBarList"
import styles from "./styles"

type NavProp = NativeStackNavigationProp<RootStackParamList, 'BottomTab'>;

const CheckInBox = () => {

    const user = useAppSelector(state => state.location.info);
    const location = useAppSelector(state => state.location.coords);
    const {data, isLoading, searchNearbyPhone, checkIn} = useNearby();
    const [selectedBar, setSelectedBar] = useState()
    const navigation = useNavigation<NavProp>()

    useEffect(() => {
        searchNearbyPhone(100);
    }, [location])

    const barCheckIn = () => {
        checkIn(selectedBar) 
        navigation.navigate("BottomTab")
        
    }

    return (
        <>
            <View style = {styles.box}>
                <View style={styles.container}>
                    <View style={styles.userBox}>
                        <View>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={styles.username}>@{user.username}</Text>
                        </View>
                    </View>
                    <Text style={styles.nearby}>NEARBY</Text>
                    <NearbyBarList data={data} user={user} isLoading={isLoading} setSelectedBar={setSelectedBar}/>
                </View>
            </View>

            <TouchableOpacity style={[styles.button, styles.elevation]} onPress={barCheckIn} >
                <Text style={styles.buttonText}>Check In</Text>
            </TouchableOpacity>
        </>
    )
}

export default CheckInBox