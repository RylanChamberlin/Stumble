import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import AppView from "../components/general/AppView";
import SimpleHeader from "../components/general/SimpleHeader";
import NewPostBox from "../components/NewPostScreen/NewPostBox";
import { RootStackParamList } from "../navigation/Nav";

type NewPostScreenProps = NativeStackScreenProps<RootStackParamList, 'NewPostScreen'>;

const NewPostScreen: FC<NewPostScreenProps> = ({route}) => {

    return(
        <AppView>
            <SimpleHeader title={"NEW POST"}/>
            <NewPostBox/>
        </AppView>
       
    );

}

export default NewPostScreen;