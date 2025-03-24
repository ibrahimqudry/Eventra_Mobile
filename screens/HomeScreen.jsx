import React, { useState, useRef } from "react";
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

const { width } = Dimensions.get("window");
const TAB_WIDTH = width / 3; // عرض كل Tab بناءً على عدد الـ Tabs (3)

const HomeScreen = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0); // لتتبع الـ Tab المختارة
  const tabOffsetValue = useRef(new Animated.Value(0)).current; // للأنيميشن
  const scaleValues = useRef(
    [1, 1, 1].map(() => new Animated.Value(1))
  ).current; // لتأثير Scale للأيقونات

  // بيانات الـ Services لعرضها في Slider
  const services = [
    {
      title: "Wedding Halls",
      description:
        "Turn your dream wedding into reality! Grand ballrooms, intimate garden settings, or chic modern spaces.",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Makeup Services",
      description:
        "Enhance your natural beauty with expert touch! From glamorous bridal looks to chic evening styles.",
      image:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Product Launch",
      description:
        "Make your product unforgettable! From concept to execution, we create buzz-worthy events.",
      image:
        "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Conference Halls",
      description:
        "Host impactful events in style! State-of-the-art facilities, flexible setups, and seamless tech integration.",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d466b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Award Ceremonies",
      description:
        "Celebrate excellence in style! From red-carpet glamour to elegant stages, we create unforgettable moments.",
      image:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Photography",
      description:
        "Capture the world through your unique perspective! Whether it's breathtaking landscapes or candid emotions.",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Event Decorations",
      description:
        "Transform any space into a magical setting! From elegant floral arrangements to dazzling lighting.",
      image:
        "https://images.unsplash.com/photo-1519227356665-9d3d3d2e5878?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Catering For Events",
      description:
        "Delight your guests with exquisite flavors! From gourmet dishes to custom menus.",
      image:
        "https://images.unsplash.com/photo-1511690656952-34372bb4c2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Music Concerts",
      description:
        "Feel the rhythm, live the moment! From electrifying performances to unforgettable acoustics.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  // دالة لتحريك الأنيميشن لما نختار Tab
  const handleTabPress = (index) => {
    setSelectedTab(index);

    // أنيميشن الدائرة اللي بتتحرك
    Animated.timing(tabOffsetValue, {
      toValue: index * TAB_WIDTH,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    // أنيميشن Scale للأيقونات
    scaleValues.forEach((scale, i) => {
      Animated.timing(scale, {
        toValue: i === index ? 1.2 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      {/* Header with Slogan */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        }}
        style={styles.header}
      >
        <View style={styles.overlay} />
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Discover Amazing Events</Text>
          <Text style={styles.headerSlogan}>
            Crafting Moments That Matter 🎉
          </Text>
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
          >
            <View style={styles.eventGrid}>
              <TouchableOpacity style={styles.eventCard}>
                <View style={styles.eventImageContainer}>
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                    }}
                    style={styles.eventImage}
                  />
                  <View style={styles.eventOverlay} />
                  <View style={styles.eventDate}>
                    <Text style={styles.eventDay}>15</Text>
                    <Text style={styles.eventMonth}>APR</Text>
                  </View>
                </View>
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>Tech Summit 2024</Text>
                  <View style={styles.eventInfo}>
                    <Icon name="location-outline" size={16} color="#6b7280" />
                    <Text style={styles.eventInfoText}>San Francisco</Text>
                    <Icon name="people-outline" size={16} color="#6b7280" />
                    <Text style={styles.eventInfoText}>500+ Attendees</Text>
                  </View>
                  <Text style={styles.eventDescription}>
                    Join the biggest tech conference of the year featuring
                    industry leaders.
                  </Text>
                  <View style={styles.eventActions}>
                    <TouchableOpacity style={styles.detailsButton}>
                      <Text style={styles.detailsButtonText}>View Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.calendarButton}>
                      <Icon name="calendar-outline" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.eventCard}>
                <View style={styles.eventImageContainer}>
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
                    }}
                    style={styles.eventImage}
                  />
                  <View style={styles.eventOverlay} />
                  <View style={styles.eventDate}>
                    <Text style={styles.eventDay}>20</Text>
                    <Text style={styles.eventMonth}>MAY</Text>
                  </View>
                </View>
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>Design Conference</Text>
                  <View style={styles.eventInfo}>
                    <Icon name="location-outline" size={16} color="#6b7280" />
                    <Text style={styles.eventInfoText}>New York</Text>
                    <Icon name="people-outline" size={16} color="#6b7280" />
                    <Text style={styles.eventInfoText}>300+ Attendees</Text>
                  </View>
                  <Text style={styles.eventDescription}>
                    Explore the latest trends in design with world-renowned
                    designers.
                  </Text>
                  <View style={styles.eventActions}>
                    <TouchableOpacity style={styles.detailsButton}>
                      <Text style={styles.detailsButtonText}>View Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.calendarButton}>
                      <Icon name="calendar-outline" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.eventCard}>
                <View style={styles.eventImageContainer}>
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                    }}
                    style={styles.eventImage}
                  />
                  <View style={styles.eventOverlay} />
                  <View style={styles.eventDate}>
                    <Text style={styles.eventDay}>10</Text>
                    <Text style={styles.eventMonth}>JUN</Text>
                  </View>
                </View>
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>Startup Weekend</Text>
                  <View style={styles.eventInfo}>
                    <Icon name="location-outline" size={16} color="#6b7280" />
                    <Text style={styles.eventInfoText}>London</Text>
                    <Icon name="people-outline" size={16} color="#6b7280" />
                    <Text style={styles.eventInfoText}>200+ Attendees</Text>
                  </View>
                  <Text style={styles.eventDescription}>
                    Turn your idea into reality in 54 hours with mentors.
                  </Text>
                  <View style={styles.eventActions}>
                    <TouchableOpacity style={styles.detailsButton}>
                      <Text style={styles.detailsButtonText}>View Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.calendarButton}>
                      <Icon name="calendar-outline" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Our Services Slider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sliderContent}
          >
            <View style={styles.serviceGrid}>
              {services.map((service, index) => (
                <TouchableOpacity key={index} style={styles.serviceCard}>
                  <View style={styles.serviceImageContainer}>
                    <Image
                      source={{ uri: service.image }}
                      style={styles.serviceImage}
                    />
                    <View style={styles.serviceOverlay} />
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
            </View>
          </ScrollView>
        </View>

        {/* Testimonials */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What People Say</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sliderContent}
          >
            <View style={styles.testimonialGrid}>
              <View style={styles.testimonialCard}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
                  }}
                  style={styles.testimonialImage}
                />
                <Text style={styles.stars}>★★★★★</Text>
                <Text style={styles.testimonialText}>
                  "The platform made organizing our tech conference a breeze."
                </Text>
                <Text style={styles.testimonialAuthor}>Sarah Johnson</Text>
                <Text style={styles.testimonialRole}>Event Organizer</Text>
              </View>

              <View style={styles.testimonialCard}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
                  }}
                  style={styles.testimonialImage}
                />
                <Text style={styles.stars}>★★★★★</Text>
                <Text style={styles.testimonialText}>
                  "Found amazing events that matched my interests."
                </Text>
                <Text style={styles.testimonialAuthor}>Michael Chen</Text>
                <Text style={styles.testimonialRole}>Attendee</Text>
              </View>

              <View style={styles.testimonialCard}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
                  }}
                  style={styles.testimonialImage}
                />
                <Text style={styles.stars}>★★★★★</Text>
                <Text style={styles.testimonialText}>
                  "As a speaker, I love how easy it is to connect with
                  audiences."
                </Text>
                <Text style={styles.testimonialAuthor}>Emily Davis</Text>
                <Text style={styles.testimonialRole}>Speaker</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Newsletter */}
        <View style={styles.newsletterSection}>
          <Text style={styles.newsletterTitle}>Stay Updated</Text>
          <Text style={styles.newsletterSubtitle}>
            Subscribe to our newsletter for the latest events.
          </Text>
          {subscribed ? (
            <Text style={styles.successMessage}>
              Thank you for subscribing! 🎉
            </Text>
          ) : (
            <View style={styles.newsletterForm}>
              <Text style={styles.newsletterInput}>
                Enter your email (Input Placeholder)
              </Text>
              <TouchableOpacity
                style={styles.newsletterButton}
                onPress={() => setSubscribed(true)}
              >
                <Text style={styles.newsletterButtonText}>Subscribe</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress(0)}
          >
            <Animated.View style={{ transform: [{ scale: scaleValues[0] }] }}>
              <Icon
                name={selectedTab === 0 ? "home" : "home-outline"}
                size={24}
                color={selectedTab === 0 ? "#a855f7" : "#d1d5db"}
              />
            </Animated.View>
            <Text
              style={[
                styles.tabLabel,
                { color: selectedTab === 0 ? "#a855f7" : "#d1d5db" },
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress(1)}
          >
            <Animated.View style={{ transform: [{ scale: scaleValues[1] }] }}>
              <Icon
                name={selectedTab === 1 ? "search" : "search-outline"}
                size={24}
                color={selectedTab === 1 ? "#a855f7" : "#d1d5db"}
              />
            </Animated.View>
            <Text
              style={[
                styles.tabLabel,
                { color: selectedTab === 1 ? "#a855f7" : "#d1d5db" },
              ]}
            >
              Search
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress(2)}
          >
            <Animated.View style={{ transform: [{ scale: scaleValues[2] }] }}>
              <Icon
                name={selectedTab === 2 ? "cart" : "cart-outline"}
                size={24}
                color={selectedTab === 2 ? "#a855f7" : "#d1d5db"}
              />
            </Animated.View>
            <Text
              style={[
                styles.tabLabel,
                { color: selectedTab === 2 ? "#a855f7" : "#d1d5db" },
              ]}
            >
              Cart
            </Text>
          </TouchableOpacity>
        </View>

        {/* الأنيميشن للدائرة اللي بتتحرك تحت الأيقونة */}
        <Animated.View
          style={{
            width: TAB_WIDTH,
            height: 4,
            backgroundColor: "#a855f7",
            position: "absolute",
            bottom: 66,
            left: 0,
            transform: [{ translateX: tabOffsetValue }],
            borderRadius: 2,
            shadowColor: "#a855f7",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5,
          }}
        />
      </View>
    </View>
  );
};

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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  headerContent: {
    padding: 20,
    alignItems: "center",
    width: "100%",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
  },
  headerSlogan: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff",
    opacity: 0.9,
    textAlign: "center",
  },
  scrollContent: {
    paddingBottom: 80, // مساحة للـ Bottom Navigation Bar
  },
  section: {
    paddingVertical: 20,
    backgroundColor: COLORS.bgLight, // خلفية رمادي فاتح للـ Sliders
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sliderContent: {
    paddingHorizontal: 20,
  },
  eventGrid: {
    flexDirection: "row",
    gap: 15,
  },
  eventCard: {
    width: width * 0.7,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  eventImageContainer: {
    position: "relative",
    height: 150,
  },
  eventImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  eventOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  eventDate: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 5,
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
    marginBottom: 10,
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
  eventActions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  detailsButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  calendarButton: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  serviceGrid: {
    flexDirection: "row",
    gap: 15,
  },
  serviceCard: {
    width: width * 0.7,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  serviceImageContainer: {
    position: "relative",
    height: 150,
  },
  serviceImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  serviceOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  serviceDetails: {
    padding: 15,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 15,
  },
  serviceButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
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
    color: "#ffffff",
  },
  testimonialGrid: {
    flexDirection: "row",
    gap: 15,
  },
  testimonialCard: {
    width: width * 0.7,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.1)",
  },
  testimonialImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  stars: {
    fontSize: 16,
    color: "#fbbf24",
    marginBottom: 10,
  },
  testimonialText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 10,
    fontStyle: "italic",
  },
  testimonialAuthor: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  testimonialRole: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  newsletterSection: {
    padding: 20,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  newsletterTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 10,
  },
  newsletterSubtitle: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.9,
    marginBottom: 20,
    textAlign: "center",
  },
  newsletterForm: {
    width: width * 0.9,
    backgroundColor: "#ffffff",
    borderRadius: 50,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  newsletterInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  newsletterButton: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  newsletterButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  successMessage: {
    fontSize: 16,
    color: "#ffffff",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff", // خلفية بيضاء
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
    paddingBottom: 10,
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
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },
});

export default HomeScreen;
