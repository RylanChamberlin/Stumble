import * as React from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, AntDesign, Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons';

import MainScreen from "../screens/MainScreen";
import SearchScreen from "../screens/SearchScreen";
import BarScreen from "../screens/BarScreen";

function Profile() {
  const image = require('../../src/assets/images/kel.png')
  return (
    
    <View style={styles.container}>
    <ImageBackground style= { styles.backgroundImage } source={image} resizeMode='cover'>
      <Text>Profile</Text>
    </ImageBackground>
    </View>
    
  );
}



const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator 
      initialRouteName="Home"
      screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={BarScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}

      />
      <Tab.Screen 
        name="Account" 
        component={SearchScreen} 
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-box" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Wallet" 
        component={MainScreen} 
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="ShoppingCart" 
        component={Profile} 
        options={{
          tabBarLabel: 'Shopping Cart',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center", // or 'stretch'
  }
});