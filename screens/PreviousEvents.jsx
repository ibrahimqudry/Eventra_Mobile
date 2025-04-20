import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const eventsData = [
  {
    id: '1',
    title: 'Tech Conference 2023',
    date: '15 Oct 2023',
    description: 'Annual technology conference with industry leaders',
    image: 'https://img.freepik.com/free-photo/business-people-conference-room_53876-94868.jpg',
    attendees: 250,
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    title: 'Product Launch',
    date: '22 Nov 2023',
    description: 'Launch of our new product line with live demonstrations',
    image: 'https://img.freepik.com/free-photo/people-taking-part-business-event_23-2149109151.jpg',
    attendees: 180,
    location: 'New York, NY'
  },
];

function PreviousEvents({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredEvents(eventsData);
    } else {
      const filtered = eventsData.filter(event =>
        event.title.toLowerCase().includes(text.toLowerCase()) ||
        event.description.toLowerCase().includes(text.toLowerCase()) ||
        event.location.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.eventCard}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventInfoRow}>
          <FontAwesome name="calendar" size={14} color="#666" />
          <Text style={styles.eventInfoText}>{item.date}</Text>
        </View>
        <View style={styles.eventInfoRow}>
          <FontAwesome name="map-marker" size={14} color="#666" />
          <Text style={styles.eventInfoText}>{item.location}</Text>
        </View>
        <Text style={styles.eventDescription}>{item.description}</Text>
        <View style={styles.eventInfoRow}>
          <FontAwesome name="users" size={14} color="#666" />
          <Text style={styles.eventInfoText}>{item.attendees} attendees</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Previous Events</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search events..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {filteredEvents.length === 0 ? (
        <Text style={styles.noEventsText}>No events found. Try a different search.</Text>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  eventCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 1,
  },
  eventImage: {
    width: '100%',
    height: 180,
  },
  eventDetails: {
    padding: 16,
  },
  eventTitle: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 8,
    color: '#222',
  },
  eventDescription: {
    marginVertical: 10,
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  eventInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventInfoText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
  },
  noEventsText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
    fontSize: 15,
  },
});

export default PreviousEvents;