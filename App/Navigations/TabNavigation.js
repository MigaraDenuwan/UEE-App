import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Index from '../Screens/Index';
import Addvisits from '../Screens/Addvisits';
import Report from '../Screens/Report';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import HomeNavigation from './HomeNavigation';
import Clinic from '../Screens/Clinic';
import Reminders from '../Screens/Remainders';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar, // Apply your custom styles here
        tabBarLabelStyle: styles.tabLabel, // Style for the tab labels
      }}>
      
        <Tab.Screen 
          name="Report" 
          component={Addvisits} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
                <Ionicons name="document-text-outline" size={30} color={'#000000'} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Remainders" 
          component={Reminders} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
                <MaterialIcons name="notifications-none" size={30} color={'#000000'} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Home" 
          component={Index} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
                <Ionicons name="home-outline" size={30} color={'#000000'} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Clinic" 
          component={Clinic} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
                <FontAwesome5 name="edit" size={25} color={'#000000'} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Map" 
          component={HomeNavigation} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="map-marker-multiple-outline" size={30} color={'#000000'} />
            ),
          }} 
        />
    </Tab.Navigator>
  );
}

// Styles for the Tab Navigator
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#D2AC41', // Background color for the tab bar
    borderTopColor: '#D1D1D1', // Border color for the top of the tab bar
    borderTopWidth: 2, // Border width
    height: 60, // Height of the tab bar
    borderTopLeftRadius: 20, // Radius for the top left corner
    borderTopRightRadius: 20, // Radius for the top right corner
    overflow: 'hidden', // Hide overflow to make corners rounded
  },
  tabLabel: {
    color: '#333333', // Default color for tab labels
    fontWeight: 'bold', // Bold font weight for tab labels
  },
});



