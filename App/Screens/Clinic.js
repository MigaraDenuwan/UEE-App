import { ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const Clinic = () => {
  const [loading, setLoading] = useState(true);
  const [activeAppointmentIndex, setActiveAppointmentIndex] = useState(0);
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const [isAppointmentAutoPlayPaused, setIsAppointmentAutoPlayPaused] = useState(false);
  const [isTipAutoPlayPaused, setIsTipAutoPlayPaused] = useState(false);
  const [tipData, setTipData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);

  const appointmentCarouselRef = useRef(null);
  const tipCarouselRef = useRef(null);

  const fetchData = async () => {
    try {
      const [tipsResponse, appointmentsResponse] = await Promise.all([
        axios.get('https://momcare.azurewebsites.net/notes'),
        axios.get('https://momcare.azurewebsites.net/visits'),
      ]);
      setTipData(tipsResponse.data);
      console.log(tipsResponse.data);
      setAppointmentData(appointmentsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000); // 60 seconds interval for data fetching

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);


  useEffect(() => {
    let appointmentInterval, tipInterval;

    if (!isAppointmentAutoPlayPaused) {
      appointmentInterval = setInterval(() => {
        if (appointmentCarouselRef.current && appointmentData.length > 1) {
          const nextIndex = (activeAppointmentIndex + 1) % appointmentData.length;
          appointmentCarouselRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          setActiveAppointmentIndex(nextIndex);
        }
      }, 4000);
    }

    if (!isTipAutoPlayPaused) {
      tipInterval = setInterval(() => {
        if (tipCarouselRef.current && tipData.length > 1) {
          const nextIndex = (activeTipIndex + 1) % tipData.length;
          tipCarouselRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          setActiveTipIndex(nextIndex);
        }
      }, 3000);
    }

    return () => {
      clearInterval(appointmentInterval);
      clearInterval(tipInterval);
    };
  }, [activeAppointmentIndex, activeTipIndex, isAppointmentAutoPlayPaused, isTipAutoPlayPaused, appointmentData, tipData]);

  const handleAppointmentScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setActiveAppointmentIndex(index);
  };

  const handleTipScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setActiveTipIndex(index);
  };

  const renderAppointmentCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, styles.appointmentCard, { width: CARD_WIDTH }]}
    >
      <View style={styles.cardHeader}>
        <FontAwesome5 name="calendar-alt" size={24} color="#8B4C70" />
        <Text style={styles.cardTitle}>{item.clinicName}</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardRow}>
          <FontAwesome5 name="clock" size={16} color="#8B4C70" />
          <Text style={styles.cardInfo}>{item.selectedDate} at {item.time}</Text>
        </View>
        <View style={styles.cardRow}>
          <FontAwesome5 name="user-md" size={16} color="#8B4C70" />
          <Text style={styles.cardInfo}>{item.doctorName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTipCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, styles.tipCard, { width: CARD_WIDTH }]}
      onPress={() => setIsTipAutoPlayPaused(!isTipAutoPlayPaused)}
    >
      <View style={styles.cardHeader}>
        <FontAwesome5 name="lightbulb" size={24} color="#8B4C70" />
        <Text style={styles.cardTitle}>Health Tip</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.tipText}>"{item.healthTips}"</Text>
        <View style={styles.cardRow}>
          <FontAwesome5 name="user-nurse" size={16} color="#8B4C70" />
          <Text style={styles.tipAuthor}>{item.doctorName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDotIndicator = (activeIndex, dataLength) => (
    <View style={styles.dotContainer}>
      {[...Array(dataLength)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: index === activeIndex ? '#8B4C70' : '#FFB38A' }
          ]}
        />
      ))}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#8B4C70" style={styles.loading} />;
  }

  return (
    <ImageBackground
      source={require('../../assets/Background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>MomCare</Text>
        </View>

        <Text style={styles.sectionTitle}>Your Clinic Card</Text>
        <FlatList
          ref={appointmentCarouselRef}
          data={appointmentData}
          renderItem={renderAppointmentCard}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 10}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContainer}
          onScroll={handleAppointmentScroll}
        />
        {renderDotIndicator(activeAppointmentIndex, appointmentData.length)}

        <Text style={styles.sectionTitle}>For you</Text>
        <FlatList
          ref={tipCarouselRef}
          data={tipData}
          renderItem={renderTipCard}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 10}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContainer}
          onScroll={handleTipScroll}
        />
        {renderDotIndicator(activeTipIndex, tipData.length)}

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add New Visit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Health tips note</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Reminder Settings</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: (StatusBar.currentHeight ?? 0) + 1,
  },
  title: {
    fontFamily: 'Appname',
    fontSize: 35.35,
    fontWeight: '400',
    lineHeight: 42.77,
    textAlign: 'center',
    color: '#A91E64',
    opacity: 0.8,
    top: 5,
  },
  sectionTitle: {
    paddingTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4C70',
    marginBottom: 10,
  },
  carouselContainer: {
    paddingHorizontal: 10,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentCard: {
    backgroundColor: 'rgba(255, 179, 138, 0.9)',
  },
  tipCard: {
    backgroundColor: 'rgba(255, 230, 240, 0.9)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4C70',
    marginLeft: 10,
  },
  cardContent: {
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardInfo: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  tipAuthor: {
    fontSize: 14,
    color: '#8B4C70',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  button: {
    backgroundColor: 'rgba(255, 179, 138, 0.9)',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default Clinic;
