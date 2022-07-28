import { createNativeStackNavigator } from "@react-navigation/native-stack"

import BottomTab from "./BottomTab";
import PostScreen from "../screens/PostScreen";
import ProfileFriendScreen from "../screens/Profile/ProfileFriendScreen";
import AddFriendScreen from "../screens/AddFriendScreen";
import CheckInScreen from "../screens/CheckInScreen";
import NewPostScreen from "../screens/NewPostScreen";

import React, { FC} from "react";
import CreateNameScreen from "../screens/auth/CreateNameScreen";


export type RootStackParamList = {
 
  Login: undefined;
  SignUp: undefined;
  CreateUser: undefined;
  PostScreen: { bar?: any } | undefined;
  BottomTab: undefined;
  UserInfo: undefined;
  ProfileFriendScreen: undefined;
  AddFriendScreen: undefined;
  CheckInScreen: undefined;
  NewPostScreen: {bar?: any} | undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeStackProps = {

}

const HomeStack:FC<HomeStackProps> = () => {

  const POST_TAG = 'PostScreen';
  const BOTTOM_TAB_TAG = 'BottomTab'
  const PROFILE_FRIEND_SCREEN_TAG = 'ProfileFriendScreen';
  const ADD_FRIEND_SCREEN_TAG = 'AddFriendScreen'
  const CHECK_IN_SCREEN_TAG = 'CheckInScreen'
  const NEW_POST_TAG = 'NewPostScreen'
  const CREATE_USER = "CreateUser"
  

  // const [user, setUser] = useState(false)

  // useEffect( () => {
  //   DoesUserExistsInDoc(auth.currentUser.uid)
  // },[])

  //gets user to enter username if used authButtons
  //def a better way to do this
  // const DoesUserExistsInDoc = async (userID: string) => {
  //   db.collection("users").doc(userID).get().then((doc: { exists: any }) => {
  //     console.log('checking exsistenceeeee\n\n\n')
  //     if(doc.exists){
  //       setUser(true)
  //     } 
  //   })
  // }

  return (
    <Stack.Navigator>

     
     
      <Stack.Screen name={BOTTOM_TAB_TAG} component={BottomTab}  options={{ headerShown: false }}/>
      <Stack.Screen name={POST_TAG} component={PostScreen} options={{ headerShown: false }} />
      <Stack.Screen name={PROFILE_FRIEND_SCREEN_TAG} component={ProfileFriendScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ADD_FRIEND_SCREEN_TAG} component={AddFriendScreen} options={{ headerShown: false }} />
      <Stack.Screen name={CHECK_IN_SCREEN_TAG} component={CheckInScreen} options={{ headerShown: false }} />
      <Stack.Screen name={NEW_POST_TAG} component={NewPostScreen} options={{ headerShown: false }} />
      <Stack.Screen name={CREATE_USER} component={CreateNameScreen}  options={{ headerShown: false }}/> 
      
    </Stack.Navigator>
);
}

export default HomeStack