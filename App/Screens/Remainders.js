import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, FlatList, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const Reminders = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://momcare.azurewebsites.net/visits');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const AppointmentItem = ({ doctorName, clinicName, time, selectedDate, Notification }) => (
    <View style={styles.appointmentItem}>
      <View style={styles.appointmentIcon}>
        <Ionicons name="calendar" size={24} color="#C41E3A" />
      </View>
      <View style={styles.appointmentDetails}>
        <Text style={styles.appointmentTitle}>{clinicName}</Text>
        <Text style={styles.appointmentDoctor}>{doctorName}</Text>
        <Text style={styles.appointmentDate}>{`${selectedDate}, ${time}`}</Text>
      </View>
      <View style={styles.appointmentActions}>
        <Switch
          value={Notification === "ME"}
          onValueChange={() => {}}
          trackColor={{ false: "#FAE3E3", true: "#C41E3A" }}
          thumbColor={Notification === "ME" ? "#FFFFFF" : "#F4F3F4"}
        />
        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={24} color="#C41E3A" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const CustomizationItem = ({ title, value, onValueChange, iconName }) => (
    <View style={styles.customizationItem}>
      <View style={styles.customizationIconContainer}>
        <Ionicons name={iconName} size={24} color="#C41E3A" />
      </View>
      <View style={styles.customizationTextContainer}>
        <Text style={styles.customizationTitle}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#FAE3E3", true: "#C41E3A" }}
        thumbColor={value ? "#FFFFFF" : "#F4F3F4"}
        style={styles.customizationSwitch}
      />
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/Background.png')}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>MomCare</Text>
        </View>

        <Text style={styles.sectionTitle}>Reminder Settings</Text>

        <View style={styles.appointmentsContainer}>
          <Text style={styles.subTitle}>Upcoming Appointments</Text>
          <FlatList
            data={appointments}
            renderItem={({ item }) => (
              <AppointmentItem
                doctorName={item.doctorName}
                clinicName={item.clinicName}
                time={item.time}
                selectedDate={item.selectedDate}
                Notification={item.Notification}
              />
            )}
            keyExtractor={(item) => item._id.$oid}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.customizationContainer}>
          <Text style={styles.subTitle}>Customized reminder settings</Text>
          <CustomizationItem 
            title="Send to mobile" 
            value={true} 
            onValueChange={() => {}} 
            iconName="phone-portrait-outline"
          />
          <CustomizationItem 
            title="Send to email" 
            value={false} 
            onValueChange={() => {}} 
            iconName="mail-outline"
          />
          <CustomizationItem 
            title="Mobile notification" 
            value={true} 
            onValueChange={() => {}} 
            iconName="notifications-outline"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: StatusBar.currentHeight + 10,
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    // borderRadius: 20,
    // padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C41E3A',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#C41E3A',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#C41E3A',
  },
  appointmentsContainer: {
    flex: 1,
    marginBottom: 16,
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appointmentIcon: {
    backgroundColor: '#FAE3E3',
    borderRadius: 20,
    padding: 10,
    marginRight: 12,
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C41E3A',
    marginBottom: 4,
  },
  appointmentDoctor: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  appointmentDate: {
    fontSize: 14,
    color: '#666',
  },
  appointmentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 12,
    backgroundColor: '#FAE3E3',
    borderRadius: 15,
    padding: 8,
  },
  customizationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  customizationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#FAE3E3',
  },
  customizationIconContainer: {
    backgroundColor: '#FAE3E3',
    borderRadius: 15,
    padding: 8,
    marginRight: 12,
  },
  customizationTextContainer: {
    flex: 1,
  },
  customizationTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  customizationSwitch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
});

export default Reminders;