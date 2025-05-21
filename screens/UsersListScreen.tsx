// UsersListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function UsersListScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'registrations'));
        const usersData = usersSnapshot.docs.map(doc => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>No registered users found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registered Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userText}>{`Name: ${item.name} ${item.surname}`}</Text>
            <Text style={styles.userText}>{`Email: ${item.email}`}</Text>
            <Text style={styles.userText}>{`ID: ${item.idNumber}`}</Text>
            <Text style={styles.userText}>{`Address: ${item.address}`}</Text>
            <Text style={styles.userText}>{`Political Party: ${item.party}`}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#121212' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: 'white' },
  userCard: { padding: 10, marginVertical: 10, borderWidth: 1, borderColor: '#444', borderRadius: 5, backgroundColor: '#1e1e1e' },
  userText: { fontSize: 16, marginBottom: 5, color: 'white' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  loadingText: { marginTop: 10, fontSize: 16, color: 'white' },
});
