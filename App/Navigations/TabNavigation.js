import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Index from '../Screens/Index';
import Report from '../Screens/Report';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import HomeNavigation from './HomeNavigation';
import Clinic from '../Screens/Clinic';
import Reminders from '../Screens/Remainders';

export default function TabNavigation() {

    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false
    }}>
        <Tab.Screen name="Report" component={Report} 
            options={{tabBarLabel: 'Report',
            tabBarIcon: ({color, size}) =>(
                <FontAwesome5 name="search" size={24} color="black" />
            ),
            }}
        />
        <Tab.Screen name="Remainders" component={Reminders} 
            options={{tabBarLabel: 'Remainders',
            tabBarIcon: ({color, size}) =>(
                <FontAwesome name="heartbeat" size={24} color="black" />
            ),
            }}
        />
        <Tab.Screen name="Home" component={Index} 
            options={{tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) =>(
                <FontAwesome name="home" size={24} color="black" />
            ),
            }}
        />
        <Tab.Screen name="Clinis" component={Clinic} 
            options={{tabBarLabel: 'Clinic',
            tabBarIcon: ({color, size}) =>(
                <FontAwesome5 name="user-circle" size={24} color="black" />
            ),
            }}
        />
        <Tab.Screen name="Map" component={HomeNavigation} 
            options={{tabBarLabel: 'Map',
            tabBarIcon: ({color, size}) =>(
                <FontAwesome5 name="user-circle" size={24} color="black" />
            ),
            }}
        />
    </Tab.Navigator>
  )
}