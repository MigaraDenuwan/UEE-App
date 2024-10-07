import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../Shared/Colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

const Header = () => {
  const navigation = useNavigation(); // Hook to access navigation

  // Declare the function before using it in the return statement
  const handleSearchPress = () => {
    navigation.navigate('Search'); // Navigate to Search.js
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.textStyle}>MomCare</Text>
        <Image source={require('../../../assets/user.png')} style={styles.userImage} />
      </View>
      <TouchableOpacity style={styles.searchBarContainer} onPress={handleSearchPress}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={24} color={Colors.DARK_GRAY} style={styles.searchIcon} />
          <Text style={styles.searchBar}>Search</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    top:25,
    gap: 20,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    top: 5,
  },
  textStyle: {
    fontFamily: 'Appname', // Ensure 'Appname' is linked correctly or use another font
    fontSize: 35.35,
    fontWeight: '400',
    lineHeight: 42.77,
    textAlign: 'center',
    color: '#A91E64',
    opacity: 0.8,
    top: 5,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    top: 5,
  },
  searchBarContainer: {
    alignSelf: 'center', // Center the container within its parent
    marginTop: 40,
    marginBottom: 10,
  },
  searchInputContainer: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center vertically
    backgroundColor: Colors.LIGHT_GRAY, // Background color of the search bar
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.PRIMARY, // Ensure border color is set
    paddingHorizontal: 10, // Add horizontal padding
    width: Dimensions.get('screen').width * 0.6, // Adjust width if necessary
    height: 40, // Define height for better visibility of the border
  },
  searchIcon: {
    marginRight: 5, // Space between icon and text
  },
  searchBar: {
    flex: 1, // Allow the text input to take up available space
    color: Colors.DARK_GRAY, // Change text color
    fontSize: 18, // Change font size
    fontFamily: 'raleway-bold', // Replace with your desired font family
    textAlign: 'left', // Align text to the left
  },
});
