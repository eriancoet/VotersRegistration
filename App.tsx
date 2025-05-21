// App.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { db } from './firebaseConfig';
import UsersListScreen from './screens/UsersListScreen';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

function RegistrationScreen({ navigation }: any) {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    idNumber: '',
    party: '',
    email: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    idNumber: '',
    party: '',
    email: '',
    address: '',
  });

  const [duplicateError, setDuplicateError] = useState('');

  const handleChange = (field: string, value: string) => {
    if (field === 'idNumber') {
      value = value.replace(/[^0-9]/g, '').slice(0, 13);
      setDuplicateError('');
    }

    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    let valid = true;
    const newErrors: any = {};

    for (const key in form) {
      if (!form[key as keyof typeof form]) {
        newErrors[key] = 'This field is required.';
        valid = false;
      }
    }

    if (form.idNumber.length !== 13) {
      newErrors.idNumber = 'ID Number must be exactly 13 digits.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      Alert.alert('Form Incomplete', 'Please fill in all required fields correctly.');
      return;
    }

    try {
      const registrationsRef = collection(db, 'registrations');
      const q = query(registrationsRef, where('idNumber', '==', form.idNumber));
      const existing = await getDocs(q);

      if (!existing.empty) {
        setDuplicateError('A user with this ID number already exists.');
        setTimeout(() => {
          Alert.alert('Duplicate Entry', 'A user with this ID number already exists.');
        }, 100);
        return;
      } else {
        setDuplicateError('');
      }

      await addDoc(registrationsRef, form);
      Alert.alert('Success', 'Your registration was submitted successfully!');
      setForm({
        name: '',
        surname: '',
        idNumber: '',
        party: '',
        email: '',
        address: '',
      });
      navigation.navigate('UsersList');
    } catch (error: any) {
      Alert.alert('Submission Failed', error.message || 'An error occurred while submitting the form.');
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Voter Registration</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Surname"
            value={form.surname}
            onChangeText={(text) => handleChange('surname', text)}
          />
          {errors.surname && <Text style={styles.errorText}>{errors.surname}</Text>}

          <TextInput
            style={styles.input}
            placeholder="ID Number"
            value={form.idNumber}
            onChangeText={(text) => handleChange('idNumber', text)}
            keyboardType="numeric"
            maxLength={13}
          />
          {errors.idNumber && <Text style={styles.errorText}>{errors.idNumber}</Text>}
          {duplicateError !== '' && <Text style={styles.errorText}>{duplicateError}</Text>}

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
          {errors.party && <Text style={styles.errorText}>{errors.party}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Address"
            value={form.address}
            onChangeText={(text) => handleChange('address', text)}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

          <Button title="Submit" onPress={handleSubmit} color="#1e90ff" />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined} initialRouteName="Register">
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="UsersList" component={UsersListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
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
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
});
