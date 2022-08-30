import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { FC, useState } from "react";
import { Platform } from "react-native";
import AppView from "../components/general/AppView";
import NewPostBox from "../components/NewPostScreen/NewPostBox";
import { RootStackParamList } from "../navigation/types";

type NewPostScreenProps = NativeStackScreenProps<RootStackParamList, 'NewPostScreen'>;

const NewPostScreen: FC<NewPostScreenProps> = ({route}) => {

    return(
        <AppView>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <NewPostBox bar = {route.params?.bar} />
        </AppView>
       
    );

}

export default NewPostScreen;