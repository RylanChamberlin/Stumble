import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { LogBox } from "react-native";

import BottomTab from "./frontend/src/components/BottomTab";
import UserFriends from "./frontend/src/components/ProfileScreen/UserFriends";
import LoginScreen from "./frontend/src/screens/auth/LoginScreen";
import PostScreen from "./frontend/src/screens/PostScreen";

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './frontend/src/redux/reducers';

const store = createStore(rootReducer, applyMiddleware(thunk))

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Login: undefined;
  Single: undefined;
  BottomTab: undefined;
  UserFriends: undefined;  
  UserInfo: undefined;
};

export default function App() {

  // LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  // LogBox.ignoreAllLogs();//Ignore all log notifications


  return (

    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="Single" component={PostScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BottomTab" component={BottomTab}  options={{ headerShown: false }}/>
        <Stack.Screen name="UserFriends" component={UserFriends} options={{ headerShown: false }} />
      </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}