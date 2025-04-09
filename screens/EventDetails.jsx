import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';

const EventDetails= () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const eventImages = [
    { uri: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' },
    { uri: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' },
    { uri: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80' }
  ];

  const sponsors = [
    { id: 1, image: require('../assets/logo.png') },
    { id: 2, image: require('../assets/logo1.png') },
    { id: 3, image: require('../assets/logo2.png') },
    { id: 4, image: require('../assets/logo3.png') },
    { id: 5, image: require('../assets/logo4.png') },
    { id: 6, image: require('../assets/logo5.png') },
  ];

  const previousEvents = [
    { id: 1, title: 'Tech Summit 2023', description: 'A look back at last year\'s success', uri: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' },
    { id: 2, title: 'Tech Summit 2022', description: 'Innovation meets technology', uri: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80' },
    { id: 3, title: 'Tech Summit 2021', description: 'Where ideas come to life', uri: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' },
  ];

  const tickets = [
    { 
      id: 1, 
      type: 'Standard', 
      price: 100, 
      features: [
        'Full Conference Access',
        'Workshop Materials',
        'Lunch & Refreshments'
      ],
      seating: 'Standard Seating'
    },
    { 
      id: 2, 
      type: 'Early Bird', 
      price: 200, 
      features: [
        'Full Conference Access',
        'Workshop Materials',
        'Lunch & Refreshments',
        'Networking Session'
      ],
      seating: 'Premium Seating'
    },
    { 
      id: 3, 
      type: 'VIP', 
      price: 300, 
      features: [
        'Full Conference Access',
        'Workshop Materials',
        'Lunch & Refreshments',
        'Networking Session',
        'VIP Lounge Access',
        'Private Meeting Room'
      ],
      seating: 'VIP Seating'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % eventImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % eventImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + eventImages.length) % eventImages.length);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Event Gallery */}
      <View style={styles.slideshowContainer}>
        <Image source={{ uri: eventImages[currentSlide].uri }} style={styles.slideImage} />
        <TouchableOpacity style={[styles.navBtn, styles.prevBtn]} onPress={prevSlide}>
          <MaterialIcons name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navBtn, styles.nextBtn]} onPress={nextSlide}>
          <MaterialIcons name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Event Details */}
      <View style={styles.eventDetails}>
        <View style={styles.eventHeader}>
          <LinearGradient
            colors={['#6366f1', '#a855f7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientTextContainer}
          >
            <Text style={styles.eventTitle}>Tech Summit 2025</Text>
          </LinearGradient>
          <View style={styles.eventMeta}>
            <View style={styles.category}>
              <Text style={styles.categoryText}>Technology</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusText}>Early Bird</Text>
            </View>
          </View>
        </View>

        {/* Event Info */}
        <View style={styles.eventInfo}>
          <InfoItem icon="map-marker" title="Location" value="Cairo International Convention Center" />
          <InfoItem icon="calendar" title="Date" value="April 15, 2025" />
          <InfoItem icon="clock-o" title="Time" value="9:00 AM - 5:00 PM"/>
          <InfoItem icon="users" title="Capacity" value="500 Attendees" />
          <InfoItem icon="hourglass-half" title="Purchase Deadline" value="Till 1 April, 2025" />
        </View>

        {/* Event Description */}
        <View style={styles.eventDescription}>
          <Text style={styles.sectionTitle}>About The Event</Text>
          <Text style={styles.descriptionText}>
            Join us for the biggest tech conference of the year! Tech Summit 2024 brings together industry
            leaders, innovators, and tech enthusiasts for an unforgettable day of learning, networking, and
            inspiration.
          </Text>
          <Text style={styles.descriptionText}>
            Experience keynote speeches from renowned speakers, interactive workshops, and cutting-edge product
            demonstrations. Whether you're a developer, entrepreneur, or tech enthusiast, this event is designed
            to help you stay ahead in the rapidly evolving tech landscape.
          </Text>
        </View>

        {/* Sponsors Section */}
        <View style={styles.sponsorsSection}>
  <Text style={styles.sectionTitle}>Event Sponsors</Text>
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sponsorsScroll}>
    {sponsors.map((sponsor) => (
      <View key={sponsor.id} style={styles.sponsor}>
        {sponsor.uri ? (
          <Image source={{ uri: sponsor.uri }} style={styles.sponsorImage} />
        ) : (
          <Image source={sponsor.image} style={styles.sponsorImage} />
        )}
      </View>
    ))}
  </ScrollView>
</View>

        {/* Previous Events */}
        <View style={styles.previousEvents}>
          <Text style={styles.sectionTitle}>Previous Events</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {previousEvents.map((event) => (
               <TouchableOpacity style={styles.previousEvents} onPress={() => navigation.navigate("CustomerReviews")}>
              <EventCard key={event.id} event={event} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tickets Section */}
        <View style={styles.ticketsSection}>
          <Text style={styles.sectionTitle}>Choose Your Ticket</Text>
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const InfoItem = ({ icon, title, value }) => {
  return (
    <View style={styles.infoItem}>
      <LinearGradient
        colors={['#6366f1', '#a855f7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.infoIcon}
      >
        <FontAwesome name={icon} size={16} color="white" />
      </LinearGradient>
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
};

const EventCard = ({ event }) => {
  return (
    <View style={styles.eventCard}>
      <Image source={{ uri: event.uri }} style={styles.eventCardImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.eventCardOverlay}
      >
        <Text style={styles.eventCardTitle}>{event.title}</Text>
        <Text style={styles.eventCardDescription}>{event.description}</Text>
      </LinearGradient>
    </View>
  );
};

const TicketCard = ({ ticket }) => {
  return (
    <View style={styles.ticket}>
      <LinearGradient
        colors={['#6366f1', '#a855f7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.ticketHeader}
      >
        <Text style={styles.ticketType}>{ticket.type}</Text>
        <Text style={styles.ticketPrice}>${ticket.price}</Text>
      </LinearGradient>
      <View style={styles.ticketBody}>
        <View style={styles.ticketDetails}>
          <View style={styles.detailItem}>
            <FontAwesome5 name="chair" size={16} color="#6366f1" />
            <Text style={styles.detailText}>{ticket.seating}</Text>
          </View>
        </View>
        <View style={styles.ticketFeatures}>
          {ticket.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <FontAwesome name="check" size={16} color="#22c55e" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.ticketButton}>
          <Text style={styles.ticketButtonText}>Buy Now</Text>
          <MaterialIcons name="arrow-forward" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingTop: 30,
  },
  slideshowContainer: {
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  navBtn: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevBtn: {
    left: 10,
  },
  nextBtn: {
    right: 10,
  },
  eventDetails: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  eventHeader: {
    marginBottom: 20,
    alignItems: 'center',
  },
  gradientTextContainer: {
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  eventMeta: {
    flexDirection: 'row',
    gap: 10,
  },
  category: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  categoryText: {
    color: '#6366f1',
    fontWeight: '500',
    fontSize: 14,
  },
  status: {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    color: '#a855f7',
    fontWeight: '500',
    fontSize: 14,
  },
  eventInfo: {
    backgroundColor: '#f3f4f6',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    gap: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#4b5563',
  },
  eventDescription: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
    textAlign: 'center',
  },
  descriptionText: {
    color: '#4b5563',
    marginBottom: 10,
    lineHeight: 22,
  },
  sponsorsSection: {
    marginBottom: 30,
  },
  sponsorsScroll: {
    paddingHorizontal: 10,
  },
  sponsor: {
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sponsorImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  previousEvents: {
    marginBottom: 30,
  },
  eventCard: {
    width: Dimensions.get('window').width * 0.8,
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
    position: 'relative',
  },
  eventCardImage: {
    width: '100%',
    height: '100%',
  },
  eventCardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  eventCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  eventCardDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  ticketsSection: {
    marginBottom: 30,
  },
  ticket: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  ticketHeader: {
    padding: 20,
    alignItems: 'center',
  },
  ticketType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  ticketPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  ticketBody: {
    padding: 20,
  },
  ticketDetails: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderStyle: 'dashed',
    paddingBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    color: '#1f2937',
    fontWeight: '500',
  },
  ticketFeatures: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  featureText: {
    color: '#4b5563',
  },
  ticketButton: {
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  ticketButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default EventDetails;