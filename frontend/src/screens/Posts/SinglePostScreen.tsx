import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { FC, useState } from "react";
import { Platform } from "react-native";
import AppView from "../../components/general/AppView";
import Header from "../../components/PostScreen/Header";
import PopularPostList from "../../components/PostScreen/Posts/PopularPostList";
import RecentPostList from "../../components/PostScreen/Posts/RecentPostList";
import { RootStackParamList } from "../../navigation/types";

type SinglePostScreenProps = NativeStackScreenProps<RootStackParamList, 'SinglePostScreen'>;

const SinglePostScreen: FC<SinglePostScreenProps> = ({route}) => {

    const [left, setLeft] = useState(false);

    return(
        <AppView>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <Header bar = {route.params?.bar}  left={left} setLeft={setLeft}/>
            {!left ?  <RecentPostList itemID={route.params?.bar.place_id} order='createdAt' field='placeID'/> : <PopularPostList itemID={route.params?.bar.place_id}/>}
        </AppView>
       
    );

}

export default SinglePostScreen;