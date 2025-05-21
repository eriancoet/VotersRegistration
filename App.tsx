import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    idNumber: '',
    party: '',
    email: '',
    address: '',
  });

 const handleChange = (field: string, value: string) => {
  setForm({ ...form, [field]: value });
};


  const handleSubmit = async () => {
    const { name, surname, idNumber, party, email, address } = form;
    if (!name || !surname || !idNumber || !party || !email || !address) {
      Alert.alert('Please fill in all fields');
      return;
    }

    try {
      await addDoc(collection(db, 'registrations'), form);
      Alert.alert('Submitted successfully!');
      setForm({ name: '', surname: '', idNumber: '', party: '', email: '', address: '' });
    } catch (error) {
      Alert.alert('Error submitting form', error.message);
    }
  };

  const parties = [
    'African National Congress (ANC)',
    'Democratic Alliance (DA)',
    'Economic Freedom Fighters (EFF)',
    'Inkatha Freedom Party (IFP)',
    'Freedom Front Plus (FF+)',
    'ActionSA',
    'United Democratic Movement (UDM)',
    'African Christian Democratic Party (ACDP)',
    'Al Jama-ah',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voter Registration</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={form.surname}
        onChangeText={(text) => handleChange('surname', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Number"
        value={form.idNumber}
        onChangeText={(text) => handleChange('idNumber', text)}
      />
      <Picker
        selectedValue={form.party}
        style={styles.input}
        onValueChange={(value) => handleChange('party', value)}
      >
        <Picker.Item label="Select a political party" value="" />
        {parties.map((p) => (
          <Picker.Item key={p} label={p} value={p} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={form.address}
        onChangeText={(text) => handleChange('address', text)}
      />

      <Button title="Submit" onPress={handleSubmit} color="#1e90ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});
