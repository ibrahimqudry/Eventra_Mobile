
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
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const TAB_WIDTH = width / 4;

const EventsScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [isLoadMorePressed, setIsLoadMorePressed] = useState(false);

  // Animations
  const scaleValues = useRef(
    [0, 0, 0, 0].map(() => new Animated.Value(1))
  ).current;
  const heroTitleOpacity = useRef(new Animated.Value(0)).current;
  const heroTextOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslateY = useRef(new Animated.Value(-50)).current;

  // Data
  const events = useMemo(
    () => [
      {
        title: "Tech Summit 2024",
        location: "Cairo International Convention Center",
        time: "9:00 AM - 5:00 PM",
        attendees: "500+ Attendees",
        description:
          "Join the biggest tech conference of the year featuring industry leaders and innovators.",
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        date: { day: "15", month: "APR" },
        category: "Technology",
        price: "$299",
      },
      {
        title: "Design Conference",
        location: "Alexandria Arts Center",
        time: "10:00 AM - 4:00 PM",
        attendees: "300+ Attendees",
        description:
          "Explore the latest trends in design with world-renowned designers and creative professionals.",
        image:
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
        date: { day: "20", month: "MAY" },
        category: "Design",
        price: "$199",
      },
      {
        title: "Startup Weekend",
        location: "Giza Innovation Hub",
        time: "9:00 AM - 6:00 PM",
        attendees: "200+ Attendees",
        description:
          "Turn your idea into reality in 54 hours with mentors, investors, and fellow entrepreneurs.",
        image:
          "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        date: { day: "10", month: "JUN" },
        category: "Business",
        price: "$149",
      },
    ],
    []
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroTitleOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(heroTextOpacity, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(heroTranslateY, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.exp),
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

      if (screenName) {
        navigation.navigate(screenName);
      }
    },
    [scaleValues, navigation]
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <Animated.View style={{ transform: [{ translateY: heroTranslateY }] }}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            }}
            style={styles.hero}
          >
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}
              style={styles.overlay}
            />
            <View style={styles.heroContent}>
              <Animated.Text
                style={[styles.heroTitle, { opacity: heroTitleOpacity }]}
              >
                Discover Events
              </Animated.Text>
              <Animated.Text
                style={[styles.heroText, { opacity: heroTextOpacity }]}
              >
                Find and join amazing events happening around you
              </Animated.Text>
              <TouchableOpacity style={styles.createEventBtn}>
                <LinearGradient
                  colors={["#6366f1", "#a855f7"]} // الـ Gradient اللي طلبته
                  start={{ x: 0, y: 0 }} // بداية الـ Gradient (شمال غرب)
                  end={{ x: 1, y: 1 }} // نهاية الـ Gradient (جنوب شرق)
                  style={styles.createEventBtnGradient}
                >
                  <Icon name="add" size={18} color={COLORS.bgWhite} />
                  <Text style={styles.createEventBtnText}>
                    Create New Event
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Animated.View>

        {/* Search and Filter Section */}
        <View style={styles.searchFilter}>
          <View style={styles.searchBar}>
            <Icon
              name="search"
              size={18}
              color={COLORS.textSecondary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search events..."
              placeholderTextColor={COLORS.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.filters}>
            <View style={styles.filterSelect}>
              <Text style={styles.filterText}>
                {categoryFilter || "Category"}
              </Text>
              <Icon
                name="chevron-down"
                size={18}
                color={COLORS.textSecondary}
              />
            </View>
            <View style={styles.filterSelect}>
              <Text style={styles.filterText}>
                {locationFilter || "Location"}
              </Text>
              <Icon
                name="chevron-down"
                size={18}
                color={COLORS.textSecondary}
              />
            </View>
            <View style={styles.filterSelect}>
              <Text style={styles.filterText}>{dateFilter || "Date"}</Text>
              <Icon
                name="chevron-down"
                size={18}
                color={COLORS.textSecondary}
              />
            </View>
          </View>
        </View>

        {/* Events Grid */}
        <View style={styles.eventsGrid}>
          {events.map((event, index) => (
            <TouchableOpacity key={index} style={styles.eventCard}>
              <View style={styles.eventImageContainer}>
                <Image
                  source={{ uri: event.image }}
                  style={styles.eventImage}
                />
                <LinearGradient
                  colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.7)"]}
                  style={styles.eventImageOverlay}
                />
                <View style={styles.eventCategory}>
                  <Text style={styles.eventCategoryText}>{event.category}</Text>
                </View>
              </View>
              <View style={styles.eventDetails}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventDate}>
                    <Text style={styles.eventDay}>{event.date.day}</Text>
                    <Text style={styles.eventMonth}>{event.date.month}</Text>
                  </View>
                </View>
                <Text style={styles.eventDescription} numberOfLines={2}>
                  {event.description}
                </Text>
                <View style={styles.eventInfo}>
                  <View style={styles.eventInfoItem}>
                    <Icon
                      name="location-outline"
                      size={14}
                      color={COLORS.textSecondary}
                    />
                    <Text style={styles.eventInfoText}>{event.location}</Text>
                  </View>
                  <View style={styles.eventInfoItem}>
                    <Icon
                      name="time-outline"
                      size={14}
                      color={COLORS.textSecondary}
                    />
                    <Text style={styles.eventInfoText}>{event.time}</Text>
                  </View>
                </View>
                <View style={styles.eventFooter}>
                  <Text style={styles.price}>{event.price}</Text>
                  <TouchableOpacity style={styles.registerBtn}>
                    <LinearGradient
                      colors={[COLORS.primary, COLORS.secondary]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.registerBtnGradient}
                    >
                      <Text style={styles.registerBtnText}>Join Now</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Load More Button */}
        <View style={styles.loadMore}>
          <TouchableOpacity
            style={[
              styles.loadMoreBtn,
              isLoadMorePressed && styles.loadMoreBtnPressed,
            ]}
            onPressIn={() => setIsLoadMorePressed(true)}
            onPressOut={() => setIsLoadMorePressed(false)}
          >
            <Text
              style={[
                styles.loadMoreBtnText,
                isLoadMorePressed && styles.loadMoreBtnTextPressed,
              ]}
            >
              Load More Events
            </Text>
          </TouchableOpacity>
        </View>
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
            onPress={() => handleTabPress(1, "Events")}
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
            onPress={() => handleTabPress(3, "Profile")}
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
  success: "#4CAF50",
  warning: "#ff9800",
  danger: "#f44336",
  border: "#e5e7eb",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgLight,
  },
  hero: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    padding: 20,
    alignItems: "center",
    maxWidth: 600,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.bgWhite,
    marginBottom: 8,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  heroText: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.bgWhite,
    opacity: 0.9,
    marginBottom: 16,
    textAlign: "center",
  },
  createEventBtn: {
    borderRadius: 25,
    overflow: "hidden",
  },
  createEventBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  createEventBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.bgWhite,
    marginLeft: 6,
  },
  searchFilter: {
    backgroundColor: COLORS.bgWhite,
    padding: 16,
    marginTop: -60,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "column",
    gap: 12,
    position: "relative",
    zIndex: 1,
  },
  searchBar: {
    flex: 1,
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: [{ translateY: -9 }],
  },
  searchInput: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingLeft: 40,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.bgLight,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  filterSelect: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.bgLight,
  },
  filterText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  eventsGrid: {
    marginVertical: 24,
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  eventCard: {
    width: (width - 48) / 2,
    backgroundColor: COLORS.bgWhite,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  eventImageContainer: {
    position: "relative",
    height: 120,
  },
  eventImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  eventImageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  eventCategory: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  eventCategoryText: {
    fontSize: 11,
    color: COLORS.bgWhite,
    fontWeight: "500",
  },
  eventDetails: {
    padding: 12,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    flex: 1,
  },
  eventDate: {
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  eventDay: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.bgWhite,
  },
  eventMonth: {
    fontSize: 10,
    color: COLORS.bgWhite,
    fontWeight: "500",
  },
  eventDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 8,
    lineHeight: 18,
  },
  eventInfo: {
    marginBottom: 8,
    gap: 4,
  },
  eventInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  eventInfoText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  registerBtn: {
    borderRadius: 12,
    overflow: "hidden",
  },
  registerBtnGradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  registerBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.bgWhite,
    textAlign: "center",
  },
  loadMore: {
    alignItems: "center",
    marginVertical: 24,
  },
  loadMoreBtn: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  loadMoreBtnPressed: {
    backgroundColor: COLORS.primary,
  },
  loadMoreBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
    textAlign: "center",
  },
  loadMoreBtnTextPressed: {
    color: COLORS.bgWhite,
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

export default EventsScreen;