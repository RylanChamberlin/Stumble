import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import BottomTab from "./BottomTab";
import LoginScreen from "../screens/auth/LoginScreen";
import PostScreen from "../screens/PostScreen";
import ProfileFriendScreen from "../screens/Profile/ProfileFriendScreen";
import AddFriendScreen from "../screens/AddFriendScreen";

export type RootStackParamList = {
  Login: undefined;
  PostScreen: { placeID?: string, name?: string } | undefined;
  BottomTab: undefined;
  UserInfo: undefined;
  ProfileFriendScreen: undefined;
  AddFriendScreen: undefined;
}

export const Nav = () => {

    const Stack = createNativeStackNavigator<RootStackParamList>();
    const LOGIN_TAG = 'Login';
    const POST_TAG = 'PostScreen';
    const BOTTOM_TAB_TAG = 'BottomTab'
    const PROFILE_FRIEND_SCREEN_TAG = 'ProfileFriendScreen';
    const ADD_FRIEND_SCREEN_TAG = 'AddFriendScreen'
    
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={LOGIN_TAG} component={LoginScreen}  options={{ headerShown: false }}/>
                <Stack.Screen name={POST_TAG} component={PostScreen} options={{ headerShown: false }} />
                <Stack.Screen name={BOTTOM_TAB_TAG} component={BottomTab}  options={{ headerShown: false }}/>
                <Stack.Screen name={PROFILE_FRIEND_SCREEN_TAG} component={ProfileFriendScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ADD_FRIEND_SCREEN_TAG} component={AddFriendScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};