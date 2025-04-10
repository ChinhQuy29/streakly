import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, ScrollView } from 'react-native';

interface Habit {
  title: string;
  description: string;
  completed: boolean;
  _id: string;
}

// IMPORTANT: Replace with your actual IP address that you used in Postman
const API_BASE_URL = 'http://10.106.34.170:3000'; // Replace 192.168.1.X with your actual IP

const HomeScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleCreateHabit = async () => {
    try {
      if (!title || !description) {
        Alert.alert('Error', 'Title and description are required');
        return;
      }
      
      console.log(`Attempting to connect to: ${API_BASE_URL}/api/habits`);
      
      const response = await fetch(`${API_BASE_URL}/api/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      
      const data = await response.json();
      Alert.alert('Success', data.message);
      fetchHabits(); // Refresh the list
      setTitle('');
      setDescription('');
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error('Error creating habit:', errorMessage);
      Alert.alert('Error', `Failed to create habit: ${errorMessage}`);
      setError(errorMessage);
    }
  }

  const fetchHabits = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching from: ${API_BASE_URL}/api/habits`);
      
      const response = await fetch(`${API_BASE_URL}/api/habits`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setHabits(data.habits || []);
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error('Error fetching habits:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHabit = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/habits`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: id }),
      });
      const data = await response.json();
      Alert.alert('Success', data.message);
      fetchHabits(); // Refresh the list
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error('Error deleting habit:', errorMessage);
      Alert.alert('Error', `Failed to delete habit: ${errorMessage}`);
      setError(errorMessage);
    }
  }

  useEffect(() => {
    fetchHabits();
    
    // Test connection
    const testConnection = async () => {
      try {
        await fetch(API_BASE_URL);
        console.log('Successfully connected to server');
      } catch (error) {
        console.error('Failed to connect to server:', error);
      }
    };
    
    testConnection();
  }, []);
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error connecting to server:</Text>
            <Text style={styles.errorDetail}>{error}</Text>
            <Text style={styles.errorNote}>Make sure your server is running at: {API_BASE_URL}</Text>
            <Button title="Retry Connection" onPress={fetchHabits} />
          </View>
        )}
        
        <Text style={styles.title}>Create New Habit</Text>
        <TextInput
          placeholder="Title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Description"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
        <Button
          title="Create Habit"
          onPress={handleCreateHabit}
        />
        
        <View style={styles.habitsContainer}>
          <Text style={styles.subTitle}>Your Habits</Text>
          {loading ? (
            <Text>Loading habits...</Text>
          ) : habits.length > 0 ? (
            habits.map((habit, index) => (
              <View key={index} style={styles.habitItem}>
                <Text style={styles.habitTitle}>{habit.title}</Text>
                <Text>{habit.description}</Text>
                <Text>{habit.completed ? 'Completed' : 'Not Completed'}</Text>
                <Text>{habit._id}</Text>
                <Button title="Delete" onPress={() => handleDeleteHabit(habit._id)} />
              </View>
            ))
          ) : (
            <Text>No habits found</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    width: '100%',
    maxWidth: "100%",
    minHeight: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  habitsContainer: {
    marginTop: 30,
    width: '100%',
  },
  habitItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  habitTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  errorContainer: {
    backgroundColor: '#ffeeee',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorDetail: {
    color: 'red',
    marginBottom: 10,
  },
  errorNote: {
    marginBottom: 10,
  },
});

export default HomeScreen;


