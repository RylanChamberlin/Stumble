import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LogBox } from "react-native";

import BottomTab from "./frontend/src/components/BottomTab";
import UserFriends from "./frontend/src/components/ProfileScreen/Friends/UserFriends";
import LoginScreen from "./frontend/src/screens/auth/LoginScreen";
import PostScreen from "./frontend/src/screens/PostScreen";

import { Provider } from 'react-redux';
import { store } from "./frontend/src/app/store";
import { StrictMode } from "react";
//const store = createStore(rootReducer, applyMiddleware(thunk))


const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Login: undefined;
  PostScreen: { placeID?: string, name?: string } | undefined;
  BottomTab: undefined;
  UserFriends: undefined;  
  UserInfo: undefined;
};

export default function App() {

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications


  return (
    // <StrictMode>
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="PostScreen" component={PostScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BottomTab" component={BottomTab}  options={{ headerShown: false }}/>
        <Stack.Screen name="UserFriends" component={UserFriends} options={{ headerShown: false }} />
      </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // </StrictMode>
  );
}