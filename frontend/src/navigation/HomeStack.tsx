import { createNativeStackNavigator } from "@react-navigation/native-stack"

import BottomTab from "./BottomTab";
import ProfileFriendScreen from "../screens/Profile/ProfileFriendScreen";
import AddFriendScreen from "../screens/Profile/AddFriendScreen";
import CheckInScreen from "../screens/Friends/CheckInScreen";
import NewPostScreen from "../screens/Posts/NewPostScreen";

import React from "react";
import CreateNameScreen from "../screens/auth/AuthScreens/CreateNameScreen";
import { RootStackParamList } from "./types";
import PostScreen from "../screens/Posts/PostScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {

  const POST_TAG = 'PostScreen';
  const BOTTOM_TAB_TAG = 'BottomTab'
  const PROFILE_FRIEND_SCREEN_TAG = 'ProfileFriendScreen';
  const ADD_FRIEND_SCREEN_TAG = 'AddFriendScreen'
  const CHECK_IN_SCREEN_TAG = 'CheckInScreen'
  const NEW_POST_TAG = 'NewPostScreen'
  const CREATE_USER = "CreateUser"
  
  return (
    <Stack.Navigator> 
        <Stack.Screen name={BOTTOM_TAB_TAG} component={BottomTab}  options={{ headerShown: false }}/>
        <Stack.Screen name={POST_TAG} component={PostScreen} options={{ headerShown: false }} />
        <Stack.Screen name={PROFILE_FRIEND_SCREEN_TAG} component={ProfileFriendScreen} options={{ headerShown: false }} />
        <Stack.Screen name={ADD_FRIEND_SCREEN_TAG} component={AddFriendScreen} options={{ headerShown: false }} />
        <Stack.Screen name={CREATE_USER} component={CreateNameScreen}  options={{ headerShown: false }}/> 
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name={CHECK_IN_SCREEN_TAG} component={CheckInScreen} options={{ title: 'Check In' }}/>
            <Stack.Screen name={NEW_POST_TAG} component={NewPostScreen} options={{ title: 'New Post' }} />
        </Stack.Group>
      
    </Stack.Navigator>
);
}

export default HomeStack