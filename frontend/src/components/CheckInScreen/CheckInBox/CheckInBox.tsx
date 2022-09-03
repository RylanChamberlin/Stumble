import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { storeUserInfo } from "../../../features/Location/locationSlice"
import useNearby from "../../../hooks/useNearby"
import { RootStackParamList } from "../../../navigation/types"
import { fetchUserInfo } from "../../../services/fetchUserInfo"
import NearbyBarList from "../NearbyBarList"
import styles from "./styles"

type NavProp = NativeStackNavigationProp<RootStackParamList, 'BottomTab'>;

const CheckInBox = () => {

    const user = useAppSelector(state => state.location.info);
    const location = useAppSelector(state => state.location.coords);
    const {data, isLoading, searchNearbyPhone, checkIn} = useNearby();
    const [selectedBar, setSelectedBar] = useState()
    const navigation = useNavigation<NavProp>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        searchNearbyPhone(150);
    }, [location])

    const barCheckIn = async() => {
        checkIn(selectedBar) 
        navigation.goBack()
        dispatch(storeUserInfo(await fetchUserInfo(user.uid)));
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