import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Screens/Home';
import Fav from '../Screens/Fav';
import Search from '../Screens/Search';
import Profile from '../Screens/Profile';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import HomeNavigation from './HomeNavigation';

export default function TabNavigation() {

    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false
    }}>
        <Tab.Screen name="Home" component={HomeNavigation} 
            options={{tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) =>(
                <FontAwesome name="home" size={24} color="black" />
            ),
            }}
        />
        <Tab.Screen name="Fav" component={Fav} 
            options={{tabBarLabel: 'Fav',
            tabBarIcon: ({color, size}) =>(
                <FontAwesome name="heartbeat" size={24} color="black" />
            ),
            }}
        />
        <Tab.Screen name="Search" component={Search} 
            options={{tabBarLabel: 'Search',
            tabBarIcon: ({color, size}) =>(
                <FontAwesome5 name="search" size={24} color="black" />
            ),
            }}
        />
        <Tab.Screen name="Profile" component={Profile} 
            options={{tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) =>(
                <FontAwesome5 name="user-circle" size={24} color="black" />
            ),
            }}
        />
    </Tab.Navigator>
  )
}