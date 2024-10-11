import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../Home/Header'; // Assuming this is your header component
import Colors from '../../Shared/Colors';
import Svg, { Polygon } from 'react-native-svg'; // Correctly import Svg and Polygon
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import DoctorDetails from './DoctorDetails';

const DoctorReview = () => {
  const navigation = useNavigation(); // Get the navigation object
  const totalStars = 5; // Total number of stars
  const [rating, setRating] = useState(0); // Manage user's selected rating
  
  // State for managing the comment
  const [comment, setComment] = useState(''); // Initialize with an empty string

  // Function to render a star
  const renderStar = (index) => {
    const isFilled = index < rating;
    return (
      <Pressable key={index} onPress={() => setRating(index + 1)}>
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
      </Pressable>
    );
  };

  // Function to handle navigation to the DoctorReview page
  const handleGiveRating = () => {
    console.log(`User rating: ${rating}`);
    console.log(`User comment: ${comment}`);

    // Show alert on submission
    Alert.alert(
      'Success',
      'Your review has been submitted successfully.',
      [
        {
          text: 'OK',
          onPress: () => navigation.pop(2),
        },
      ],
      { cancelable: false } 
    );
  };

  return (
    <ImageBackground 
      source={require('../../../assets/Background.png')} 
      style={{ flex: 1, resizeMode: 'cover' }} 
      imageStyle={{ opacity: 0.7 }}  
    >
      <Header />

      <View style={styles.container}>
        <Text style={styles.title}>Review and Rating Submission</Text>
        <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false} // Hide the scroll bar
            contentContainerStyle={styles.scrollContent} // Center the items in ScrollView
            bounces={true} // Enable bounce effect on scroll
            scrollEventThrottle={16} // Improve performance of scroll events
        >
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

          {/* Doctor's Name */}
          <Text style={styles.label}>Name</Text>
          <TextInput 
            value="Doctor Name" // Replace with actual name
            style={styles.input}
            editable={false} // Make it read-only
          />

          {/* Star Rating Selection */}
          <View style={styles.starsContainer}>
            {Array.from({ length: totalStars }, (_, index) => renderStar(index))}
          </View>

          {/* Comment Section */}
          <Text style={styles.label}>Enter Comment</Text>
          <TextInput 
            value={comment} // Controlled input
            onChangeText={setComment} // Set the comment state when typing
            style={styles.commentInput} // Apply the new style here
            multiline={true} // Allow multiple lines for the comment
            placeholder="Write your comment..." // Placeholder text
            placeholderTextColor={Colors.LIGHT_GRAY} // Lighter text for placeholder
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleGiveRating}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default DoctorReview;

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
    marginBottom: 4,
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
    fontFamily: 'raleway-bold',
    marginVertical: 5, // Space between label and input
    textAlign: 'center', // Center labels
    width: '100%', // Full width for labels
    color: Colors.BLACK, // Change this to your desired color
  },
  input: {
    height: 40,
    borderColor: Colors.DARK_GRAY,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 3,
    width: '90%',
    fontFamily: 'raleway-bold',
    paddingHorizontal: 10,
    textAlign: 'center',
    color: Colors.DARK_GRAY,
    marginVertical: 10,
    backgroundColor: Colors.GRAY,
  },
  commentInput: {
    height: 100, // Increased height for the comment input
    borderColor: Colors.DARK_GRAY,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 3,
    width: '90%',
    fontFamily: 'raleway', // Custom font family
    paddingHorizontal: 10,
    paddingVertical: 10, // Add padding for multiline input
    textAlignVertical: 'top', // Align text to the top of the input box
    color: Colors.BLACK, // Text color for the comment
    backgroundColor: Colors.GRAY, // Background color for the comment input
    marginVertical: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  starContainer: {
    marginHorizontal: 2, // Add some spacing between stars
  },
  button: {
    marginTop: 10,
    backgroundColor: Colors.DARK_GRAY, // Your primary button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.GRAY,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'raleway-bold',
  },
});
