import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import BarScreen from "../screens/BarScreen";
import MapScreen from '../screens/MapScreen';
import PostScreen from '../screens/PostScreen';
import FriendScreen from '../screens/FriendScreen';



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
        name="Posts" 
        component={PostScreen} 
        options={{
          tabBarLabel: 'Posts',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="forum" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Friends" 
        component={FriendScreen} 
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-friends" size={size} color={color} />
            
          ),
        }}
      />
    </Tab.Navigator>
  );
}
