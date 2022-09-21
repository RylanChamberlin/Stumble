import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import BarScreen from '../screens/Bars/BarScreen';
import PostScreen from '../screens/Posts/PostScreen';
import FriendScreen from '../screens/Friends/FriendScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { RootTabParamList } from './types';


const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTab = () => {

  return (
    <Tab.Navigator 
        initialRouteName="BarScreen"
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#e91e63',
        }}
    >
      <Tab.Screen 
        name="BarScreen" 
        component={BarScreen} 
        options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size+5} />
          ),
        }}

      />
      <Tab.Screen 
        name="PostScreen" 
        component={PostScreen} 
        options={{
            tabBarLabel: 'Posts',
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="forum" size={size+1} color={color} />
            ),
        }}
      />
      <Tab.Screen 
        name="FriendScreen" 
        component={FriendScreen} 
        options={{
            tabBarLabel: 'Friends',
            tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="user-friends" size={size} color={color} />
                
            ),
        }}
      />
      <Tab.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-circle-outline" size={size+5} color={color} />
                
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab