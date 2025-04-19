
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const EventDetails = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const eventImages = [
    {
      uri: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      uri: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      uri: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    },
  ];

  const sponsors = [
    { id: 1, image: require("../assets/logo.png") },
    { id: 2, image: require("../assets/logo1.png") },
    { id: 3, image: require("../assets/logo2.png") },
    { id: 4, image: require("../assets/logo3.png") },
    { id: 5, image: require("../assets/logo4.png") },
    { id: 6, image: require("../assets/logo5.png") },
  ];

  const previousEvents = [
    {
      id: 1,
      title: "Tech Summit 2023",
      description: "A look back at last year's success",
      uri: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 2,
      title: "Tech Summit 2022",
      description: "Innovation meets technology",
      uri: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    },
    {
      id: 3,
      title: "Tech Summit 2021",
      description: "Where ideas come to life",
      uri: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
  ];

  const tickets = [
    {
      id: 1,
      type: "Standard",
      price: 100,
      features: [
        "Full Conference Access",
        "Workshop Materials",
        "Lunch & Refreshments",
      ],
      seating: "Standard Seating",
    },
    {
      id: 2,
      type: "Early Bird",
      price: 200,
      features: [
        "Full Conference Access",
        "Workshop Materials",
        "Lunch & Refreshments",
        "Networking Session",
      ],
      seating: "Premium Seating",
    },
    {
      id: 3,
      type: "VIP",
      price: 300,
      features: [
        "Full Conference Access",
        "Workshop Materials",
        "Lunch & Refreshments",
        "Networking Session",
        "VIP Lounge Access",
        "Private Meeting Room",
      ],
      seating: "VIP Seating",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % eventImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [eventImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % eventImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + eventImages.length) % eventImages.length
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Event Gallery */}
        <View style={styles.slideshowContainer}>
          <Image
            source={{ uri: eventImages[currentSlide].uri }}
            style={styles.slideImage}
          />
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.3)", "transparent"]}
            style={styles.slideOverlay}
          />
          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {eventImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentSlide === index
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Event Details */}
        <View style={styles.eventDetails}>
          <View style={styles.eventHeader}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientTextContainer}
            >
              <Text style={styles.eventTitle}>Tech Summit 2024</Text>
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
            <InfoItem
              icon="map-marker"
              title="Location"
              value="Cairo International Convention Center"
            />
            <InfoItem icon="calendar" title="Date" value="April 15, 2025" />
            <InfoItem icon="clock-o" title="Time" value="9:00 AM - 5:00 PM" />
            <InfoItem icon="users" title="Capacity" value="500 Attendees" />
            <InfoItem
              icon="hourglass-half"
              title="Purchase Deadline"
              value="Till 1 April, 2025"
            />
          </View>

          {/* Event Description */}
          <View style={styles.eventDescription}>
            <Text style={styles.sectionTitle}>About The Event</Text>
            <Text style={styles.descriptionText}>
              Join us for the biggest tech conference of the year! Tech Summit
              2024 brings together industry leaders, innovators, and tech
              enthusiasts for an unforgettable day of learning, networking, and
              inspiration.
            </Text>
            <Text style={styles.descriptionText}>
              Experience keynote speeches from renowned speakers, interactive
              workshops, and cutting-edge product demonstrations. Whether you're
              a developer, entrepreneur, or tech enthusiast, this event is
              designed to help you stay ahead in the rapidly evolving tech
              landscape.
            </Text>
          </View>

          {/* Sponsors Section */}
          <View style={styles.sponsorsSection}>
            <Text style={styles.sectionTitle}>Event Sponsors</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.sponsorsScroll}
            >
              {sponsors.map((sponsor) => (
                <View key={sponsor.id} style={styles.sponsor}>
                  <Image source={sponsor.image} style={styles.sponsorImage} />
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Previous Events */}
          <View style={styles.previousEvents}>
            <Text style={styles.sectionTitle}>Previous Events</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {previousEvents.map((event) => (
                <EventCard key={event.id} event={event} />
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
    </SafeAreaView>
  );
};

const InfoItem = ({ icon, title, value }) => {
  return (
    <View style={styles.infoItem}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.infoIcon}
      >
        <FontAwesome name={icon} size={16} color={COLORS.bgWhite} />
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
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.eventCardOverlay}
      >
        <Text style={styles.eventCardTitle}>{event.title}</Text>
        <Text style={styles.eventCardDescription}>{event.description}</Text>
      </LinearGradient>
    </View>
  );
};

const TicketCard = ({ ticket }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={styles.ticket}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
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
            <FontAwesome5 name="chair" size={16} color={COLORS.primary} />
            <Text style={styles.detailText}>{ticket.seating}</Text>
          </View>
        </View>
        <View style={styles.ticketFeatures}>
          {ticket.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <FontAwesome name="check" size={16} color={COLORS.success} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        <Pressable
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          style={[styles.ticketButton, isPressed && styles.ticketButtonPressed]}
        >
          <Text style={styles.ticketButtonText}>Buy Now</Text>
          <MaterialIcons
            name="arrow-forward"
            size={16}
            color={COLORS.bgWhite}
          />
        </Pressable>
      </View>
    </View>
  );
};

// Constants
const COLORS = {
  primary: "#6366f1",
  secondary: "#a855f7",
  textPrimary: "#1f2937",
  textSecondary: "#4b5563",
  bgLight: "#f3f4f6",
  bgWhite: "#ffffff",
  success: "#22c55e",
  warning: "#ff9800",
  danger: "#f44336",
  border: "#e5e7eb",
};

const SPACING = {
  tiny: 4,
  small: 8,
  medium: 16,
  large: 24,
  xLarge: 32,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgLight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    backgroundColor: COLORS.bgWhite,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  scrollContent: {
    paddingBottom: SPACING.xLarge,
  },
  slideshowContainer: {
    height: 250,
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: SPACING.medium,
    marginBottom: SPACING.medium,
    position: "relative",
  },
  slideImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  slideOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  navBtn: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  prevBtn: {
    left: SPACING.small,
  },
  nextBtn: {
    right: SPACING.small,
  },
  dotsContainer: {
    position: "absolute",
    bottom: SPACING.small,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: SPACING.tiny,
  },
  activeDot: {
    backgroundColor: COLORS.bgWhite,
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  eventDetails: {
    backgroundColor: COLORS.bgWhite,
    borderRadius: 20,
    padding: SPACING.medium,
    marginHorizontal: SPACING.medium,
    marginBottom: SPACING.medium,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  eventHeader: {
    marginBottom: SPACING.medium,
    alignItems: "center",
  },
  gradientTextContainer: {
    borderRadius: 10,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    marginBottom: SPACING.small,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.bgWhite,
    textAlign: "center",
  },
  eventMeta: {
    flexDirection: "row",
    gap: SPACING.small,
  },
  category: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.tiny,
    borderRadius: 20,
  },
  categoryText: {
    color: COLORS.primary,
    fontWeight: "500",
    fontSize: 14,
  },
  status: {
    backgroundColor: "rgba(168, 85, 247, 0.1)",
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.tiny,
    borderRadius: 20,
  },
  statusText: {
    color: COLORS.secondary,
    fontWeight: "500",
    fontSize: 14,
  },
  eventInfo: {
    backgroundColor: COLORS.bgLight,
    borderRadius: 15,
    padding: SPACING.medium,
    marginBottom: SPACING.large,
    gap: SPACING.medium,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.small,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  eventDescription: {
    marginBottom: SPACING.large,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
    textAlign: "center",
  },
  descriptionText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: SPACING.small,
  },
  sponsorsSection: {
    marginBottom: SPACING.large,
  },
  sponsorsScroll: {
    paddingHorizontal: SPACING.medium,
  },
  sponsor: {
    marginRight: SPACING.medium,
    alignItems: "center",
    justifyContent: "center",
  },
  sponsorImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  previousEvents: {
    marginBottom: SPACING.large,
  },
  eventCard: {
    width: width * 0.7,
    height: 180,
    borderRadius: 15,
    overflow: "hidden",
    marginRight: SPACING.medium,
    position: "relative",
  },
  eventCardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  eventCardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.medium,
  },
  eventCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.bgWhite,
    marginBottom: SPACING.tiny,
  },
  eventCardDescription: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  ticketsSection: {
    marginBottom: SPACING.large,
  },
  ticket: {
    backgroundColor: COLORS.bgWhite,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: SPACING.medium,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketHeader: {
    padding: SPACING.medium,
    alignItems: "center",
  },
  ticketType: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.bgWhite,
    marginBottom: SPACING.small,
  },
  ticketPrice: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.bgWhite,
  },
  ticketBody: {
    padding: SPACING.medium,
  },
  ticketDetails: {
    marginBottom: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    borderStyle: "dashed",
    paddingBottom: SPACING.medium,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.small,
  },
  detailText: {
    color: COLORS.textPrimary,
    fontWeight: "500",
    fontSize: 14,
  },
  ticketFeatures: {
    marginBottom: SPACING.medium,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.small,
    paddingVertical: SPACING.tiny,
  },
  featureText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  ticketButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.medium,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.small,
  },
  ticketButtonPressed: {
    backgroundColor: COLORS.secondary,
  },
  ticketButtonText: {
    color: COLORS.bgWhite,
    fontWeight: "600",
    fontSize: 16,
  },
});

export default EventDetails;