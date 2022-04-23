import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import RestaurantScreen from "./src/screens/RestaurantScreen";
import ReviewScreen from "./src/screens/ReviewScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import BottomTab from "./src/components/BottomTab";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createNativeStackNavigator();


// const navigator = createStackNavigator(
//   {
//   Home: HomeScreen,
//   Restaurant: RestaurantScreen,
//   Review: ReviewScreen,
//   //Main: MainScreen,
//   }, 
//   {
//     initialRouteName: "Home",
//     defaultNavigationOptions: {
      
//       headerShown: false,
//       title: "BusinessSearch",
//     },
//   }
// );

// export default createAppContainer(navigator);



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