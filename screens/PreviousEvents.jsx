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

// Add the COLORS object
const COLORS = {
  primary: "#6366f1",
  secondary: "#a855f7",
  textPrimary: "#1f2937",
  textSecondary: "#6b7280",
  bgLight: "#f3f4f6",
  bgWhite: "#ffffff",
  success: "#4CAF50",
  warning: "#ff9800",
  danger: "#f44336",
  border: "#e5e7eb",
};

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
          <FontAwesome name="calendar" size={14} color={COLORS.textSecondary} />
          <Text style={styles.eventInfoText}>{item.date}</Text>
        </View>
        <View style={styles.eventInfoRow}>
          <FontAwesome name="map-marker" size={14} color={COLORS.textSecondary} />
          <Text style={styles.eventInfoText}>{item.location}</Text>
        </View>
        <Text style={styles.eventDescription}>{item.description}</Text>
        <View style={styles.eventInfoRow}>
          <FontAwesome name="users" size={14} color={COLORS.textSecondary} />
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
    backgroundColor: COLORS.bgLight,
    paddingTop: 30,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: COLORS.bgWhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  eventCard: {
    backgroundColor: COLORS.bgWhite,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventDetails: {
    padding: 16,
  },
  eventTitle: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 10,
    color: COLORS.textPrimary,
  },
  eventDescription: {
    marginVertical: 12,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  eventInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventInfoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  noEventsText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginVertical: 30,
    fontSize: 16,
  },
});

export default PreviousEvents;