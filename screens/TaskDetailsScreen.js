import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TaskDetailsScreen = () => {
  const [status, setStatus] = useState('Pending'); // ['Pending', 'Completed']
  const [buttonText, setButtonText] = useState('Mark as Completed'); // ['Mark as Completed', 'Mark as Pending']

  const handleStatusChange = () => {
    // Handle changing the task status
    if (status === 'Pending') {
      setStatus('Completed');
      setButtonText('Reset');
    } else {
      setStatus('Pending');
      setButtonText('Mark as Completed');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/placeholder-image.png')} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Task Details</Text>
          <View style={styles.row}>
            <MaterialIcons name="description" size={24} color="#008080" />
            <Text style={styles.infoText}>Task details go here</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.row}>
            <MaterialIcons name="place" size={24} color="#008080" />
            <Text style={styles.infoText}>Specified location goes here</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Geofence Radius</Text>
          <View style={styles.row}>
            <MaterialIcons name="my-location" size={24} color="#008080" />
            <Text style={styles.infoText}>Geofence radius goes here</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time and Date</Text>
          <View style={styles.row}>
            <MaterialIcons name="access-time" size={24} color="#008080" />
            <Text style={styles.infoText}>Time and date go here</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Repetition</Text>
          <View style={styles.row}>
            <MaterialIcons name="repeat" size={24} color="#008080" />
            <Text style={styles.infoText}>Repetition details go here</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View style={styles.row}>
            <MaterialIcons name="info-outline" size={24} color="#008080" />
            <Text style={styles.infoText}>{status}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleStatusChange}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#008080', // Teal
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText
  : {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#008080', // Teal
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 16,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TaskDetailsScreen;
