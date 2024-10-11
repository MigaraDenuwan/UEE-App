import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../Home/Header'; // Assuming this is your header component
import Colors from '../../Shared/Colors';
import Svg, { Polygon } from 'react-native-svg'; // Correctly import Svg and Polygon
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const DoctorDetails = () => {
  const navigation = useNavigation(); // Get the navigation object
  const rating = 4.5; // Doctor's rating
  const starsCount = 5; // Total number of stars

  // Function to render a star
  const renderStar = (isFilled) => {
    return (
      <View style={styles.starContainer}>
        <Svg height="24" width="24">
          <Polygon
            points="12,2 15,10 24,10 17,15 19,24 12,19 5,24 7,15 0,10 9,10"
            fill={isFilled ? 'yellow' : 'transparent'} // Fill yellow for filled stars, transparent for outlined
            stroke={isFilled ? 'black' : 'black'} // Black stroke for outlined stars
            strokeWidth="1" // Border width
          />
        </Svg>
      </View>
    );
  };

  // Function to handle navigation to the DoctorRating page
  const handleGiveRating = () => {
    navigation.navigate('DoctorReview'); // Navigate to DoctorRating
  };

  return (
    <ImageBackground 
      source={require('../../../assets/Background.png')} 
      style={{ flex: 1, resizeMode: 'cover' }} 
      imageStyle={{ opacity: 0.7 }}  
    >
            <Header />

      <View style={styles.container}>
        <Text style={styles.title}>Doctor Profile</Text>

        {/* Container for Doctor's Image with Gradient Overlay */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../assets/DoctorImage.jpeg')} // Replace with your doctor image path
            style={styles.doctorImage} 
          />
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.89)']}
            style={styles.gradientBackground}
          />
        </View>

        <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false} // Hide the scroll bar
            contentContainerStyle={styles.scrollContent} // Center the items in ScrollView
            bounces={true} // Enable bounce effect on scroll
            scrollEventThrottle={16} // Improve performance of scroll events
        >
          {/* Doctor's Name */}
          <Text style={styles.label}>Name</Text>
          <TextInput 
            value="Doctor Name" // Replace with actual name
            style={styles.input}
            editable={false} // Make it read-only
          />

          {/* Doctor's Experience */}
          <Text style={styles.label}>Experience</Text>
          <TextInput 
            value="10 years" // Replace with actual experience
            style={styles.input}
            editable={false} // Make it read-only
          />

          {/* Doctor's Qualifications */}
          <Text style={styles.label}>Qualifications</Text>
          <TextInput 
            value="MD, PhD" // Replace with actual qualifications
            style={styles.input}
            editable={false} // Make it read-only
          />

          {/* Doctor's Rating */}
          <Text style={styles.ratingText}>Rating: {rating}</Text>
          <View style={styles.starsContainer}>
            {Array.from({ length: starsCount }, (_, index) => (
              renderStar(index < rating)
            ))}
          </View>

          {/* Give Rating Button */}
          <TouchableOpacity style={styles.button} onPress={handleGiveRating}>
            <Text style={styles.buttonText}>Give Rating</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default DoctorDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center', // Center the content
    paddingLeft: 40,
    paddingRight: 40,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    fontFamily: 'raleway-bold',
    textAlign: 'center',
    color: Colors.DARK_GRAY,
    marginTop: 20,
  },
  imageContainer: {
    width: 210.27,
    height: 209,
    borderRadius: 19,
    overflow: 'hidden', // Ensure that the image does not overflow
    elevation: 5, // For Android shadow
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  gradientBackground: {
    position: 'absolute',
    width: '100%',
    height: '70%', // Change this value to decrease the height of the overlay
    top: '60%', // This moves the gradient down if needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorImage: {
    width: '100%',
    height: '100%',
    borderRadius: 19, // Match border radius of container
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 5, // Space between label and input
    textAlign: 'center', // Center labels
    width: '100%', // Full width for labels
    fontFamily: 'raleway-bold',
    color: Colors.BLACK, // Change this to your desired color
  },
  input: {
    height: 40,
    borderColor: Colors.DARK_GRAY,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 3,
    width: '90%',
    paddingHorizontal: 10,
    textAlign: 'center',
    fontFamily: 'raleway-bold',
    color: Colors.DARK_GRAY,
    marginVertical: 10,
    backgroundColor: Colors.GRAY,
  },
  ratingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'raleway-bold',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  starContainer: {
    marginHorizontal: 2, // Add some spacing between stars
  },
  button: {
    marginTop: 15,
    backgroundColor: Colors.DARK_GRAY, // Your primary button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.GRAY,
    fontFamily: 'raleway-bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
