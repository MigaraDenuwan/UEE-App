import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, Animated } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StatusBar, StatusBarProps } from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
const backgroundImage = require('../../assets/Background.png');
const Addvisits = () => {
    const [doctorName, setDoctorName] = useState('');
    const [clinicName, setClinicName] = useState('');
    const [time, setTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

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

    //   const saveVisitData = async () => {
    //     const NoteData = { doctorName, healthTips };
    //     console.log('Note Data:', NoteData);
    //     try {
    //       const response = await axios.post('https://momcare.azurewebsites.net/add-note', NoteData);
    //       console.log('Note Data saved:', response.data);
    //       showAlert("Health tips note has been added successfully!", true);
    //       setDoctorName('');
    //       setHealthTips('');
    //     } catch (error) {
    //       console.error('Error saving Note data:', error);
    //       showAlert("Failed to add health tips note. Please try again.", false);
    //     }
    //   };


    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (date) => {
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setTime(formattedTime);
        hideTimePicker();
    };

    const saveVisitData = async () => {
        const visitData = { doctorName, clinicName, time, selectedDate, Notification: "ME" };
        console.log('Visit Data:', visitData);
        try {
            const response = await axios.post('https://momcare.azurewebsites.net/add-visit', visitData);
            console.log('Visit Data saved:', response.data);
            showAlert("visits  has been added successfully!", true);
        } catch (error) {
            console.error('Error saving visit data:', error);
            showAlert("Failed to add visits. Please try again.", false);
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>MomCare</Text>
                    </View>
                    <Text style={styles.sectionTitle}>Add New Visit</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter Doctor Name"
                        value={doctorName}
                        onChangeText={setDoctorName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Enter Clinic name"
                        value={clinicName}
                        onChangeText={setClinicName}
                    />

                    <TouchableOpacity onPress={showTimePicker}>
                        <TextInput
                            style={styles.input}
                            placeholder="Select Time"
                            value={time}
                            editable={false}
                        />
                    </TouchableOpacity>

                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleTimeConfirm}
                        onCancel={hideTimePicker}
                    />

                    <Text style={styles.label}>Date</Text>
                    <View style={styles.calendarContainer}>
                        <Calendar
                            onDayPress={(day) => setSelectedDate(day.dateString)}
                            markedDates={{
                                [selectedDate]: { selected: true, selectedColor: '#8e44ad' },
                            }}
                            style={styles.calendar}
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: '#b6c1cd',
                                selectedDayBackgroundColor: '#8e44ad',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#8e44ad',
                                dayTextColor: '#2d4150',
                                textDisabledColor: '#d9e1e8',
                                dotColor: '#8e44ad',
                                selectedDotColor: '#ffffff',
                                arrowColor: '#8e44ad',
                                monthTextColor: '#8e44ad',
                                indicatorColor: '#8e44ad',
                                textDayFontFamily: 'monospace',
                                textMonthFontFamily: 'monospace',
                                textDayHeaderFontFamily: 'monospace',
                                textDayFontWeight: '300',
                                textMonthFontWeight: 'bold',
                                textDayHeaderFontWeight: '300',
                                textDayFontSize: 12,
                                textMonthFontSize: 12,
                                textDayHeaderFontSize: 12,
                            }}
                        />
                    </View>

                    <TouchableOpacity style={styles.addButton} onPress={saveVisitData}>
                        <Text style={styles.addButtonText}>Add New Visit</Text>
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
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        paddingTop: (StatusBar.currentHeight ?? 0) + 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8e44ad',
        textAlign: 'center',
    },
    profileIcon: {
        width: 30,
        height: 30,
        backgroundColor: '#8e44ad',
        borderRadius: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
        paddingTop: 20,
    },
    input: {
        backgroundColor: '#fff2e6',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    calendarContainer: {
        flex: 1,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    calendar: {
        borderRadius: 10,
    },
    addButton: {
        backgroundColor: '#f0ad4e',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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

export default Addvisits;