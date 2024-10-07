import { View, Text } from 'react-native';
import React from 'react';
import PlaceDetail from '../Components/PlaceDetails/PlaceDetail';
import Home from '../Screens/Home';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

const HomeNavigation = () => {
    const isAndroid=true;
    const Stack=createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
        gestureEnabled:true,
      
        ...(isAndroid&&TransitionPresets.ModalPresentationIOS)

    }}>
        <Stack.Screen name='home-screen'
       options={{headerShown:false}}
        component={Home} />
        <Stack.Screen name="place-detail" 
          options={{title:""}}
        component={PlaceDetail} screenOptions={{
            presentation:'modal',
           
        }}/>
    </Stack.Navigator>
  )
};

export default HomeNavigation;
