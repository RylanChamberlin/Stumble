import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

import BarScreen from "../screens/BarScreen";
import PostScreen from '../screens/PostScreen';
import FriendScreen from '../screens/FriendScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { fetchUser, fetchUserLocation, fetchUserFriends, fetchUserFriendRequests, fetchUserFriendRequestsSent } from '../redux/actions/index';
import { useAppDispatch } from '../app/hooks';
import { storeLocation } from '../features/Location/locationSlice';
import { fetchLocation } from '../services/fetchLocation';


const Tab = createBottomTabNavigator();

type Props = {
  fetchUser: () => void;
  fetchUserLocation: () => void;
  fetchUserFriends: () => void;
  fetchUserFriendRequests: () => void;
  fetchUserFriendRequestsSent: () => void;
  
}

function BottomTab(props: Props) {

    const dispatch = useAppDispatch()

    useEffect( async () => {

      dispatch(storeLocation(await fetchLocation()));

      // props.fetchUser();
      // props.fetchUserLocation();
      // props.fetchUserFriends();
      // props.fetchUserFriendRequests();
      // props.fetchUserFriendRequestsSent();
      // console.log('FETCHING ALL DATA')
  
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

// const mapStateToProps = (store: { userState: { currentUser: any; currentUserLocation: any; }; }) => ({
//   currentUser: store.userState.currentUser,
//   currentUserLocation: store.userState.currentUserLocation
// })

// const mapDispatchProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({ fetchUser, fetchUserLocation, fetchUserFriends, fetchUserFriendRequests, fetchUserFriendRequestsSent }, dispatch);

// export default connect(mapStateToProps, mapDispatchProps)(BottomTab);

export default BottomTab