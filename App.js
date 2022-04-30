import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LogBox } from "react-native";

import BottomTab from "./src/components/BottomTab";
import LoginScreen from "./src/screens/auth/LoginScreen";
import PostScreen from "./src/screens/PostScreen";

const Stack = createNativeStackNavigator();

export default function App() {

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="Single" component={PostScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BottomTab" component={BottomTab}  options={{ headerShown: false }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}