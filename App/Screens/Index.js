import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions, StatusBar, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const MomCareHomeScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselItems = [
    { image: '../../assets/Background.png', title: 'Healthy Baby Tips' },
    { image: '../../assets/Background.png', title: 'Caracal Fun Facts' },
    { image: '../../assets/Background.png', title: 'Outdoor Activities' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/Background.png')}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>

          <Text style={styles.logo}>MomCare</Text>

        </View>

        <Text style={styles.sectionTitle}>Daily Health Tips</Text>
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
          >
            {carouselItems.map((item, index) => (
              <View key={index} style={styles.carouselItem}>
                <Image source={{ uri: item.image }} style={styles.carouselImage} />
                <Text style={styles.carouselTitle}>{item.title}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {carouselItems.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeIndex ? styles.paginationDotActive : null,
                ]}
              />
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickAccessContainer}>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Icon name="line-chart" size={30} color="#8B4B8B" />
            <Text style={styles.quickAccessText}>Growth</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Icon name="lightbulb-o" size={30} color="#8B4B8B" />
            <Text style={styles.quickAccessText}>Tips</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Icon name="credit-card" size={30} color="#8B4B8B" />
            <Text style={styles.quickAccessText}>Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Icon name="user-md" size={30} color="#8B4B8B" />
            <Text style={styles.quickAccessText}>Doctors</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Your Child Condition</Text>
          <Text style={styles.progressSubtext}>4 Days Left to go to clinic</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingTop: (StatusBar.currentHeight ?? 0) + 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4B8B',

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4B8B',
    marginLeft: 15,
    marginTop: 15,
  },
  carouselContainer: {
    height: 200,
    marginBottom: 20,
  },
  carousel: {
    height: 200,
  },
  carouselItem: {
    width: width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: width - 40,
    height: 180,
    borderRadius: 10,
  },
  carouselTitle: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFF',
  },
  quickAccessContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 15,
  },
  quickAccessItem: {
    alignItems: 'center',
    backgroundColor: '#FFD7BA',
    borderRadius: 10,
    padding: 15,
    width: '45%',
    marginBottom: 15,
  },
  quickAccessText: {
    marginTop: 5,
    color: '#8B4B8B',
  },
  progressContainer: {
    backgroundColor: '#FFE4E1',
    margin: 15,
    padding: 15,
    borderRadius: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4B8B',
  },
  progressSubtext: {
    fontSize: 14,
    color: '#8B4B8B',
    marginTop: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginTop: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF69B4',
    borderRadius: 5,
  },
});

export default MomCareHomeScreen;
