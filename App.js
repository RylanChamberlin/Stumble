import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import BottomTab from "./src/components/BottomTab";
import LoginScreen from "./src/screens/auth/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="BottomTab" component={BottomTab}  options={{ headerShown: false }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}