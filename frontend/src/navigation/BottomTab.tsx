import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

import BarScreen from "../screens/BarScreen";
import PostScreen from '../screens/PostScreen';
import FriendScreen from '../screens/FriendScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAppDispatch } from '../app/hooks';
import { storeLocation, storeUserFriends, storeUserInfo } from '../features/Location/locationSlice';
import { fetchLocation } from '../services/fetchLocation';
import { fetchUserInfo } from '../services/fetchUserInfo';
import { fetchFriends } from '../services/userFetchData';

const Tab = createBottomTabNavigator();

const BottomTab = () => {

  const dispatch = useAppDispatch()
  
  useEffect( () => {
    
    (async () => { 
        console.log('get initla stuff')
        dispatch(storeLocation(await fetchLocation()));
        dispatch(storeUserInfo(await fetchUserInfo()));
        dispatch(storeUserFriends(await fetchFriends()));

        console.log('done fetch all stuff')
    })();
    
  }, [])

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
            <MaterialCommunityIcons name="home" color={color} size={size+5} />
          ),
        }}

      />
      <Tab.Screen 
        name="Posts" 
        component={PostScreen} 
        options={{
          tabBarLabel: 'Posts',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="forum" size={size+1} color={color} />
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
      <Tab.Screen 
        name="Profile" 
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