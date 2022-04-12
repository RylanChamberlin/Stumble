import * as React from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import MainScreen from "../screens/MainScreen";
import SearchScreen from "../screens/SearchScreen";

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

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}


const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator 
      initialRouteName="Search"
      screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen 
        name="Main" 
        component={MainScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}

      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={Notifications} 
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="add-to-list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarLabel: 'Save',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="save-alt" color={color} size={size} />
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