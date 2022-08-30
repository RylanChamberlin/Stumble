import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/auth/AuthScreens/LoginScreen";
import SignUpScreen from "../screens/auth/AuthScreens/SignUpScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
   
    const LOGIN_TAG = 'Login';
    const SIGN_UP_TAG = "SignUp"
    
    return (
        <Stack.Navigator>
            <Stack.Screen name={LOGIN_TAG} component={LoginScreen}  options={{ headerShown: false }}/>
            <Stack.Screen name={SIGN_UP_TAG} component={SignUpScreen}  options={{ headerShown: false }}/>
        </Stack.Navigator>
  );
}

export default AuthStack