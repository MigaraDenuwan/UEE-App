import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import PlaceDetail from '../Components/PlaceDetails/PlaceDetail';
import Home from '../Screens/map';
import Search from '../Screens/Search'; // Import your Search component
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import DoctorDetails from '../Components/DoctorDetails/DoctorDetails'; // Ensure correct import
import DoctorReview from '../Components/DoctorDetails/DoctorReview';
import Addvisits from '../Screens/Addvisits';

const HomeNavigation = () => {
    const isAndroid = true;
    const Stack = createStackNavigator();

    return (
        <>
            {/* Set the StatusBar to be hidden or transparent */}
            <StatusBar 
                barStyle="light-content" // Use 'dark-content' if your background is dark
                backgroundColor="transparent" // Make it transparent
                translucent // Allow background to show through the status bar
            />
            <Stack.Navigator
                screenOptions={{
                    gestureEnabled: true,
                    ...(isAndroid && TransitionPresets.ModalPresentationIOS),
                    headerShown: false, // Hide the header for all screens
                }}
            >
                <Stack.Screen
                    name="home-screen"
                    component={Home}
                />
                <Stack.Screen
                    name="place-detail"
                    component={PlaceDetail}
                    options={{
                        presentation: 'modal',
                        title: "",
                    }}
                />
                <Stack.Screen 
                    name="Search"
                    component={Search}
                    options={{ title: " " }}
                />
                <Stack.Screen 
                    name="DoctorDetails" 
                    component={DoctorDetails} 
                    options={{ title: "" }} 
                />
                <Stack.Screen 
                    name="DoctorReview" 
                    component={DoctorReview} 
                    options={{
                        title: "",
                        presentation: 'modal', // Treat this screen as a modal
                        ...TransitionPresets.ModalSlideFromBottomIOS, // Slide from bottom transition
                    }} 
                />
                <Stack.Screen 
                    name="Addvisit" 
                    component={Addvisits} 
                    options={{
                        title: "",
                        presentation: 'modal', // Treat this screen as a modal
                        ...TransitionPresets.ModalSlideFromBottomIOS, // Slide from bottom transition
                    }} 
                />
            </Stack.Navigator>
        </>
    );
};

export default HomeNavigation;
