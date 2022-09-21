import { createNativeStackNavigator } from "@react-navigation/native-stack"

import BottomTab from "./BottomTab";
import ProfileFriendScreen from "../screens/Profile/ProfileFriendScreen";
import AddFriendScreen from "../screens/Profile/AddFriendScreen";
import CheckInScreen from "../screens/Friends/CheckInScreen";
import NewPostScreen from "../screens/Posts/NewPostScreen";

import React from "react";
import { RootStackParamList } from "./types";
import SinglePostScreen from "../screens/Posts/SinglePostScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {

  const PROFILE_FRIEND_SCREEN_TAG = 'ProfileFriendScreen';
  const ADD_FRIEND_SCREEN_TAG = 'AddFriendScreen'
  const CHECK_IN_SCREEN_TAG = 'CheckInScreen'
  const NEW_POST_TAG = 'NewPostScreen'
  const SINGLE_POST_TAG = "SinglePostScreen"
  
  return (
    <Stack.Navigator> 
        <Stack.Screen name={"Root"} component={BottomTab}  options={{ headerShown: false }}/>
        <Stack.Screen name={PROFILE_FRIEND_SCREEN_TAG} component={ProfileFriendScreen} options={{ headerShown: false }} />
        <Stack.Screen name={ADD_FRIEND_SCREEN_TAG} component={AddFriendScreen} options={{ headerShown: false }} />
        <Stack.Screen name={SINGLE_POST_TAG} component={SinglePostScreen} options={{ headerShown: false }}/>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name={CHECK_IN_SCREEN_TAG} component={CheckInScreen} options={{ title: 'Check In' }}/>
            <Stack.Screen name={NEW_POST_TAG} component={NewPostScreen} options={{ title: 'New Post' }} />
        </Stack.Group>
      
    </Stack.Navigator>
);
}

export default HomeStack