import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Animated,
} from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';

const Report = () => {
  const [doctorName, setDoctorName] = useState('');
  const [healthTips, setHealthTips] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const toggleModal = () => {
    if (!isModalVisible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          speed: 12,
          bounciness: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false);
        slideAnim.setValue(50);
      });
    }
  };

  const showAlert = (message, success) => {
    setAlertMessage(message);
    setIsSuccess(success);
    toggleModal();
  };

  const saveVisitData = async () => {
    const NoteData = { doctorName, healthTips };
    console.log('Note Data:', NoteData);
    try {
      const response = await axios.post('https://momcare.azurewebsites.net/add-note', NoteData);
      console.log('Note Data saved:', response.data);
      showAlert("Health tips note has been added successfully!", true);
      setDoctorName('');
      setHealthTips('');
    } catch (error) {
      console.error('Error saving Note data:', error);
      showAlert("Failed to add health tips note. Please try again.", false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={require('../../assets/Background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton}>
            {/* Menu button content */}
          </TouchableOpacity>
          <Text style={styles.title}>MomCare</Text>
        </View>
        <Text style={styles.searchText}>Add Health tips note</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Enter Doctor Name</Text>
          <TextInput
            style={styles.input}
            placeholder="doctor name"
            value={doctorName}
            onChangeText={setDoctorName}
          />

          <Text style={styles.label}>Enter Health Tips</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Health Tips from Doctor"
            multiline
            numberOfLines={4}
            value={healthTips}
            onChangeText={setHealthTips}
          />

          <TouchableOpacity style={styles.addButton} onPress={saveVisitData}>
            <Text style={styles.addButtonText}>Add Health Tips Note</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} backdropOpacity={0.5}>
          <Animated.View style={[
            styles.modalContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}>
            <View style={[styles.modalHeader, isSuccess ? styles.successHeader : styles.errorHeader]}>
              <AntDesign name={isSuccess ? "checkcircleo" : "closecircleo"} size={30} color="white" />
              <Text style={styles.modalHeaderText}>{isSuccess ? 'Success' : 'Error'}</Text>
            </View>
            <Text style={styles.modalText}>{alertMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </Animated.View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingTop: (StatusBar.currentHeight ?? 0) + 16,
  },
  menuButton: {
    width: 24,
    justifyContent: 'space-between',
    height: 18,
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
  searchText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4C70',
    marginBottom: 10,
    paddingTop: 50,
    textAlign: 'center',
  },
  formContainer: {
    paddingTop: 50,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: '#FFE5D9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#FFA07A',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  successHeader: {
    backgroundColor: '#4CAF50',
  },
  errorHeader: {
    backgroundColor: '#F44336',
  },
  modalHeaderText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalText: {
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#FFA07A',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Report;