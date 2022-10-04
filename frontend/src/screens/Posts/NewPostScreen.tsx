import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { FC, useEffect } from "react";
import { Platform } from "react-native";
import { useAppDispatch } from "../../app/hooks";
import AppView from "../../components/general/AppView";
import NewPostBox from "../../components/NewPostScreen/NewPostBox";
import { storeLocation } from "../../features/Location/locationSlice";
import { RootStackParamList } from "../../navigation/types";
import { fetchLocation } from "../../services/fetchLocation";

type NewPostScreenProps = NativeStackScreenProps<RootStackParamList, 'NewPostScreen'>;

const NewPostScreen: FC<NewPostScreenProps> = ({route}) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        getNewLocation()
    },[])


    const getNewLocation = async() => {
        console.log('getting new location')
        let location = await fetchLocation()
        dispatch(storeLocation(location));
    }

    return(
        <AppView>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <NewPostBox bar = {route.params?.bar} />
        </AppView>
       
    );

}

export default NewPostScreen;