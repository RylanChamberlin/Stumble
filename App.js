import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import RestaurantScreen from "./src/screens/RestaurantScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./src/components/BottomTab";


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
      <BottomTab/>
    </NavigationContainer>
  );
}