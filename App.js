import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import RestaurantScreen from "./src/screens/RestaurantScreen";
import ReviewScreen from "./src/screens/ReviewScreen";

const navigator = createStackNavigator(
  {
  Home: HomeScreen,
  Restaurant: RestaurantScreen,
  Review: ReviewScreen,
  }, 
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "BusinessSearch",
    },
  }
);

export default createAppContainer(navigator);