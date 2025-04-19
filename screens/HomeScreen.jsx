
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const TAB_WIDTH = width / 4;

// أضفت navigation كـ prop للـ HomeScreen
const HomeScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  // Animations
  const scaleValues = useRef(
    [0, 0, 0, 0].map(() => new Animated.Value(1))
  ).current;
  const headerTitleOpacity = useRef(new Animated.Value(0)).current;
  const headerSloganOpacity = useRef(new Animated.Value(0)).current;

  // Data
  const events = useMemo(
    () => [
      {
        title: "Tech Summit 2024",
        location: "San Francisco",
        attendees: "500+ Attendees",
        description:
          "Join the biggest tech conference of the year featuring industry leaders.",
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        date: { day: "15", month: "APR" },
      },
      {
        title: "Design Conference",
        location: "New York",
        attendees: "300+ Attendees",
        description:
          "Explore the latest trends in design with world-renowned designers.",
        image:
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        date: { day: "20", month: "MAY" },
      },
      {
        title: "Startup Weekend",
        location: "London",
        attendees: "200+ Attendees",
        description: "Turn your idea into reality in 54 hours with mentors.",
        image:
          "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        date: { day: "10", month: "JUN" },
      },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        title: "Wedding Halls",
        description:
          "Turn your dream wedding into reality with grand ballrooms or intimate garden settings.",
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Makeup Services",
        description:
          "Enhance your natural beauty with expert touch for any occasion.",
        image:
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Product Launch",
        description:
          "Make your product unforgettable with a buzz-worthy event.",
        image:
          "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Conference Halls",
        description:
          "Host impactful events with state-of-the-art facilities and seamless tech.",
        image:
          "https://images.unsplash.com/photo-1505373877841-8d25f7d466b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    ],
    []
  );

  const whyChooseUs = useMemo(
    () => [
      {
        icon: "calendar-outline",
        title: "Easy Booking",
        description:
          "Book your events in just a few clicks with our seamless platform.",
      },
      {
        icon: "star-outline",
        title: "Top Events",
        description: "Discover the best events curated just for you.",
      },
      {
        icon: "briefcase-outline",
        title: "Premium Services",
        description:
          "Access a wide range of premium services tailored to your needs.",
      },
      {
        icon: "headset-outline",
        title: "24/7 Support",
        description: "Our team is here to assist you anytime, anywhere.",
      },
    ],
    []
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerTitleOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(headerSloganOpacity, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleTabPress = useCallback(
    (index, screenName) => {
      setSelectedTab(index);
      Animated.parallel([
        ...scaleValues.map((scale, i) =>
          Animated.timing(scale, {
            toValue: i === index ? 1.2 : 1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          })
        ),
      ]).start();

      // التنقل باستخدام navigation.navigate
      if (screenName) {
        navigation.navigate(screenName);
      }
    },
    [scaleValues, navigation]
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        }}
        style={styles.header}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0.3)"]}
          style={styles.overlay}
        />
        <View style={styles.headerContent}>
          <Animated.Text
            style={[styles.headerTitle, { opacity: headerTitleOpacity }]}
          >
            Discover Amazing Events
          </Animated.Text>
          <Animated.Text
            style={[styles.headerSlogan, { opacity: headerSloganOpacity }]}
          >
            Crafting Moments That Matter in Your Life
          </Animated.Text>
        </View>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Featured Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Events</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sliderContent}
            snapToInterval={width * 0.75 + 15}
            decelerationRate="fast"
          >
            {events.map((event, index) => (
              <TouchableOpacity key={index} style={styles.eventCard}>
                <View style={styles.eventImageContainer}>
                  <Image
                    source={{ uri: event.image }}
                    style={styles.eventImage}
                    defaultSource={{ uri: "https://via.placeholder.com/150" }}
                  />
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.7)"]}
                    style={styles.eventOverlay}
                  />
                  <View style={styles.eventDate}>
                    <Text style={styles.eventDay}>{event.date.day}</Text>
                    <Text style={styles.eventMonth}>{event.date.month}</Text>
                  </View>
                </View>
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventInfo}>
                    <Icon
                      name="location-outline"
                      size={16}
                      color={COLORS.textSecondary}
                    />
                    <Text style={styles.eventInfoText}>{event.location}</Text>
                    <Icon
                      name="people-outline"
                      size={16}
                      color={COLORS.textSecondary}
                    />
                    <Text style={styles.eventInfoText}>{event.attendees}</Text>
                  </View>
                  <Text style={styles.eventDescription}>
                    {event.description}
                  </Text>
                  <TouchableOpacity
                    style={styles.eventButton}
                    onPress={() => navigation.navigate("EventDetails")}
                  >
                    <Text style={styles.eventButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {events.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === 0 ? COLORS.secondary : COLORS.textSecondary,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Our Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sliderContent}
          >
            {services.map((service, index) => (
              <TouchableOpacity key={index} style={styles.serviceCard}>
                <View style={styles.serviceImageContainer}>
                  <Image
                    source={{ uri: service.image }}
                    style={styles.serviceImage}
                    defaultSource={{ uri: "https://via.placeholder.com/150" }}
                  />
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
                    style={styles.serviceOverlay}
                  />
                </View>
                <View style={styles.serviceDetails}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceDescription}>
                    {service.description}
                  </Text>
                  <TouchableOpacity style={styles.serviceButton}>
                    <Text style={styles.serviceButtonText}>Learn More</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Why Choose Us */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us</Text>
          <View style={styles.whyChooseUsContainer}>
            {whyChooseUs.map((item, index) => (
              <View key={index} style={styles.whyChooseUsCard}>
                <View style={styles.whyChooseUsIconContainer}>
                  <Icon name={item.icon} size={30} color={COLORS.primary} />
                </View>
                <Text style={styles.whyChooseUsTitle}>{item.title}</Text>
                <Text style={styles.whyChooseUsDescription}>
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Our Community */}
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
          }}
          style={styles.communitySection}
        >
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.7)", "rgba(0, 0, 0, 0.5)"]}
            style={styles.communityOverlay}
          />
          <View style={styles.communityContent}>
            <Text style={styles.communityTitle}>Join Our Community</Text>
            <Text style={styles.communitySubtitle}>
              Over 10,000 users have attended 500+ events with us. Be part of
              the experience!
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress(0, "Home")}
          >
            <Animated.View
              style={{ transform: [{ scale: scaleValues[0] }], zIndex: 1 }}
            >
              <Icon
                name={selectedTab === 0 ? "home" : "home-outline"}
                size={24}
                color={
                  selectedTab === 0 ? COLORS.secondary : COLORS.textSecondary
                }
              />
            </Animated.View>
            <Text
              style={[
                styles.tabLabel,
                {
                  color:
                    selectedTab === 0 ? COLORS.secondary : COLORS.textSecondary,
                  zIndex: 1,
                },
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress(1, "Event")}
          >
            <Animated.View
              style={{ transform: [{ scale: scaleValues[1] }], zIndex: 1 }}
            >
              <Icon
                name={selectedTab === 1 ? "calendar" : "calendar-outline"}
                size={24}
                color={
                  selectedTab === 1 ? COLORS.secondary : COLORS.textSecondary
                }
              />
            </Animated.View>
            <Text
              style={[
                styles.tabLabel,
                {
                  color:
                    selectedTab === 1 ? COLORS.secondary : COLORS.textSecondary,
                  zIndex: 1,
                },
              ]}
            >
              Events
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress(2, "Services")}
          >
            <Animated.View
              style={{ transform: [{ scale: scaleValues[2] }], zIndex: 1 }}
            >
              <Icon
                name={selectedTab === 2 ? "briefcase" : "briefcase-outline"}
                size={24}
                color={
                  selectedTab === 2 ? COLORS.secondary : COLORS.textSecondary
                }
              />
            </Animated.View>
            <Text
              style={[
                styles.tabLabel,
                {
                  color:
                    selectedTab === 2 ? COLORS.secondary : COLORS.textSecondary,
                  zIndex: 1,
                },
              ]}
            >
              Services
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress(3, "user")}
          >
            <Animated.View
              style={{ transform: [{ scale: scaleValues[3] }], zIndex: 1 }}
            >
              <Icon
                name={selectedTab === 3 ? "person" : "person-outline"}
                size={24}
                color={
                  selectedTab === 3 ? COLORS.secondary : COLORS.textSecondary
                }
              />
            </Animated.View>
            <Text
              style={[
                styles.tabLabel,
                {
                  color:
                    selectedTab === 3 ? COLORS.secondary : COLORS.textSecondary,
                  zIndex: 1,
                },
              ]}
            >
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles
const COLORS = {
  primary: "#6366f1",
  secondary: "#a855f7",
  textPrimary: "#1f2937",
  textSecondary: "#6b7280",
  bgLight: "#f3f4f6",
  bgWhite: "#ffffff",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgWhite,
  },
  header: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  headerContent: {
    padding: 35,
    alignItems: "center",
    width: "100%",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.bgWhite,
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  headerSlogan: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.bgWhite,
    opacity: 0.9,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    paddingVertical: 20,
    backgroundColor: COLORS.bgLight,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sliderContent: {
    paddingHorizontal: 20,
  },
  eventCard: {
    width: width * 0.75,
    backgroundColor: COLORS.bgWhite,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  eventImageContainer: {
    position: "relative",
    height: 160,
  },
  eventImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  eventOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  eventDate: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: COLORS.bgWhite,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  eventDay: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },
  eventMonth: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  eventDetails: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  eventInfo: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  eventInfoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  eventDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 15,
  },
  eventButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  eventButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.bgWhite,
  },
  serviceCard: {
    width: width * 0.75,
    backgroundColor: COLORS.bgWhite,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  serviceImageContainer: {
    position: "relative",
    height: 160,
  },
  serviceImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  serviceOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  serviceDetails: {
    padding: 15,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 15,
  },
  serviceButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  serviceButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.bgWhite,
  },
  whyChooseUsContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  whyChooseUsCard: {
    width: (width - 60) / 2,
    backgroundColor: COLORS.bgWhite,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  whyChooseUsIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.bgLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  whyChooseUsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 5,
    textAlign: "center",
  },
  whyChooseUsDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  communitySection: {
    padding: 30,
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 200,
  },
  communityOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  communityContent: {
    alignItems: "center",
  },
  communityTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.bgWhite,
    marginBottom: 10,
  },
  communitySubtitle: {
    fontSize: 16,
    color: COLORS.bgWhite,
    opacity: 0.9,
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.bgWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 80,
    paddingBottom: 5,
    paddingTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});

export default HomeScreen;
