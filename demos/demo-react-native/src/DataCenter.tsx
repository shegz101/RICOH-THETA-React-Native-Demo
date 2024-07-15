import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataCenter = ({ navigation, route }) => {
  const [vehicleId, setVehicleId] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const { imagePath } = route.params;

  const saveData = async () => {
    const data = {
      vehicleId,
      make,
      model,
      location,
      notes,
      imagePath,
    };

    try {
      const jsonValue = JSON.stringify(data);
      console.log(jsonValue)
      await AsyncStorage.setItem(`@vehicle_${vehicleId}`, jsonValue);
      Alert.alert('Data saved successfully');
      navigation.goBack();
    } catch (e) {
      console.error('Error saving data', e);
      Alert.alert('Failed to save data');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Vehicle ID"
        value={vehicleId}
        onChangeText={setVehicleId}
      />
      <TextInput
        style={styles.input}
        placeholder="Make"
        value={make}
        onChangeText={setMake}
      />
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={model}
        onChangeText={setModel}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        value={notes}
        placeholder="Additional Notes"
        onChangeText={setNotes}
        multiline
        numberOfLines={5}
        style={styles.textArea}
        textAlignVertical="top" // This line aligns the text to the top
      />
      <Button title="Save Data" color="#6200ee" onPress={saveData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  textArea: {
    height: 150,
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default DataCenter;
