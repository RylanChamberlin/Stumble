import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { LogBox } from "react-native";

import BottomTab from "./src/components/BottomTab";
import UserFriends from "./src/components/ProfileScreen/UserFriends";
import LoginScreen from "./src/screens/auth/LoginScreen";
import PostScreen from "./src/screens/PostScreen";
import { RootStackParamList } from "./src/screens/RootStackPrams";



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications


  

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="Single" component={PostScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BottomTab" component={BottomTab}  options={{ headerShown: false }}/>
      <Stack.Screen name="UserFriends" component={UserFriends} options={{ headerShown: false }} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}