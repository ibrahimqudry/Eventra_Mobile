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
  Modal,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, removeEvent } from "../redux/savedEventsSlice";
import { FlatList } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { db } from "../firebase"; // Import Firestore

const { width } = Dimensions.get("window");
const TAB_WIDTH = width / 4;

const EventsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const savedEvents = useSelector((state) => state.savedEvents.savedEvents);

  // State for events fetched from Firestore
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for new event form
  const [newEventModalVisible, setNewEventModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    location: "",
    time: "",
    attendees: "",
    description: "",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Default image
    date: { day: "", month: "" },
    category: "",
    price: "",
  });

  // Fetch events from Firestore
  useEffect(() => {
    const unsubscribe = db.collection("events").onSnapshot((snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleBookmark = (event) => {
    const isSaved = savedEvents.some(
      (savedEvent) => savedEvent.id === event.id
    );

    if (isSaved) {
      dispatch(removeEvent({ id: event.id }));
      Toast.show({
        type: "info",
        text1: "Event Removed",
        text2: `${event.title} has been removed from your saved events.`,
        position: "top",
        visibilityTime: 3000,
      });
    } else {
      dispatch(addEvent(event));
      Toast.show({
        type: "success",
        text1: "Event Saved",
        text2: `${event.title} has been added to your saved events!`,
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  const [selectedTab, setSelectedTab] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    date: "",
    searchQuery: "",
  });

  const [categoryFilterVisible, setCategoryFilterVisible] = useState(false);
  const [locationFilterVisible, setLocationFilterVisible] = useState(false);
  const [dateFilterVisible, setDateFilterVisible] = useState(false);

  const handleCategoryFilter = (category) => {
    setFilters((prev) => ({ ...prev, category }));
    setCategoryFilterVisible(false);
  };

  const handleLocationFilter = (location) => {
    setFilters((prev) => ({ ...prev, location }));
    setLocationFilterVisible(false);
  };

  const handleDateFilter = (date) => {
    setFilters((prev) => ({ ...prev, date }));
    setDateFilterVisible(false);
  };

  const handleSearchQuery = (query) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  // Dynamically generate filter options from events
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(events.map((event) => event.category))];
    return [...uniqueCategories, ""]; // Add empty string for "All Categories"
  }, [events]);

  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(events.map((event) => event.location.split(" ")[0]))]; // Simplified extraction
    return [...uniqueLocations, ""]; // Add empty string for "All Locations"
  }, [events]);

  const dates = useMemo(() => {
    const uniqueDates = [...new Set(events.map((event) => event.date.month))];
    return [...uniqueDates, ""]; // Add empty string for "All Dates"
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (!events || !Array.isArray(events)) {
      console.warn("Events is undefined or not an array, returning empty array");
      return [];
    }

    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        event.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());
      const matchesCategory =
        !filters.category || event.category === filters.category;
      const matchesLocation =
        !filters.location || event.location.includes(filters.location);
      const matchesDate =
        !filters.date ||
        (event.date.month.toLowerCase().includes(filters.date.toLowerCase()) ||
          event.date.day.includes(filters.date));

      return matchesSearch && matchesCategory && matchesLocation && matchesDate;
    });
  }, [filters, events]);

  // Handle new event creation
  const handleCreateEvent = () => {
    if (
      !newEvent.title ||
      !newEvent.location ||
      !newEvent.time ||
      !newEvent.attendees ||
      !newEvent.description ||
      !newEvent.date.day ||
      !newEvent.date.month ||
      !newEvent.category ||
      !newEvent.price
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields.",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

    // Add new event to Firestore
    db.collection("events")
      .add({
        ...newEvent,
        date: {
          day: newEvent.date.day,
          month: newEvent.date.month.toUpperCase(),
        },
      })
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Event Created",
          text2: `${newEvent.title} has been created!`,
          position: "top",
          visibilityTime: 3000,
        });
        setNewEventModalVisible(false);
        setNewEvent({
          title: "",
          location: "",
          time: "",
          attendees: "",
          description: "",
          image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
          date: { day: "", month: "" },
          category: "",
          price: "",
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to create event.",
          position: "top",
          visibilityTime: 3000,
        });
        console.error("Error adding event: ", error);
      });
  };

  const scaleValues = useRef(
    [0, 0, 0, 0].map(() => new Animated.Value(1))
  ).current;
  const heroTitleOpacity = useRef(new Animated.Value(0)).current;
  const heroTextOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslateY = useRef(new Animated.Value(-50)).current;

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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading events...</Text>
      </View>
    );
  }

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
              <TouchableOpacity
                style={styles.createEventBtn}
                onPress={() => setNewEventModalVisible(true)}
              >
                <LinearGradient
                  colors={["#6366f1", "#a855f7"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
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
              value={filters.searchQuery}
              onChangeText={handleSearchQuery}
            />
          </View>
          <View style={styles.filters}>
            <TouchableOpacity
              style={styles.filterSelect}
              onPress={() => setCategoryFilterVisible(true)}
            >
              <Text style={styles.filterText}>
                {filters.category || "Category"}
              </Text>
              <Icon name="chevron-down" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterSelect}
              onPress={() => setLocationFilterVisible(true)}
            >
              <Text style={styles.filterText}>
                {filters.location || "Location"}
              </Text>
              <Icon name="chevron-down" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterSelect}
              onPress={() => setDateFilterVisible(true)}
            >
              <Text style={styles.filterText}>{filters.date || "Date"}</Text>
              <Icon name="chevron-down" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal for Category Filter */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={categoryFilterVisible}
          onRequestClose={() => setCategoryFilterVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Category</Text>
              {categories.map((category) => (
                <Pressable
                  key={category}
                  style={styles.modalOption}
                  onPress={() => handleCategoryFilter(category)}
                >
                  <Text style={styles.modalOptionText}>
                    {category || "All Categories"}
                  </Text>
                </Pressable>
              ))}
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setCategoryFilterVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Modal for Location Filter */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={locationFilterVisible}
          onRequestClose={() => setLocationFilterVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Location</Text>
              {locations.map((location) => (
                <Pressable
                  key={location}
                  style={styles.modalOption}
                  onPress={() => handleLocationFilter(location)}
                >
                  <Text style={styles.modalOptionText}>
                    {location || "All Locations"}
                  </Text>
                </Pressable>
              ))}
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setLocationFilterVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Modal for Date Filter */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={dateFilterVisible}
          onRequestClose={() => setDateFilterVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Date</Text>
              {dates.map((date) => (
                <Pressable
                  key={date}
                  style={styles.modalOption}
                  onPress={() => handleDateFilter(date)}
                >
                  <Text style={styles.modalOptionText}>
                    {date || "All Dates"}
                  </Text>
                </Pressable>
              ))}
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setDateFilterVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Modal for Creating New Event */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={newEventModalVisible}
          onRequestClose={() => setNewEventModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Create New Event</Text>
              <TextInput
                style={styles.input}
                placeholder="Event Title"
                placeholderTextColor={COLORS.textSecondary}
                value={newEvent.title}
                onChangeText={(text) =>
                  setNewEvent((prev) => ({ ...prev, title: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Location"
                placeholderTextColor={COLORS.textSecondary}
                value={newEvent.location}
                onChangeText={(text) =>
                  setNewEvent((prev) => ({ ...prev, location: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Time (e.g., 9:00 AM - 5:00 PM)"
                placeholderTextColor={COLORS.textSecondary}
                value={newEvent.time}
                onChangeText={(text) =>
                  setNewEvent((prev) => ({ ...prev, time: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Attendees (e.g., 500+ Attendees)"
                placeholderTextColor={COLORS.textSecondary}
                value={newEvent.attendees}
                onChangeText={(text) =>
                  setNewEvent((prev) => ({ ...prev, attendees: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor={COLORS.textSecondary}
                value={newEvent.description}
                onChangeText={(text) =>
                  setNewEvent((prev) => ({ ...prev, description: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Day (e.g., 15)"
                placeholderTextColor={COLORS.textSecondary}
                value={newEvent.date.day}
                onChangeText={(text) =>
                  setNewEvent((prev) => ({
                    ...prev,
                    date: { ...prev.date, day: text },
                  }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Month (e.g., APR)"
                placeholderTextColor={COLORS.textSecondary}
                value={newEvent.date.month}
                onChangeText={(text) =>
                  setNewEvent((prev) => ({
                    ...prev,
                    date: { ...prev.date, month: text },
                  }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Category"
                placeholderTextColor={COLORS.textSecondary}
                value={newEvent.category}
                onChangeText={(text) =>
                  setNewEvent((prev) => ({ ...prev, category: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Price (e.g., $299)"
                placeholderTextColor={COLORS.textSecondary}
                value={newEvent.price}
                onChangeText={(text) =>
                  setNewEvent((prev) => ({ ...prev, price: text }))
                }
              />
              <Pressable
                style={styles.modalCloseButton}
                onPress={handleCreateEvent}
              >
                <Text style={styles.modalCloseButtonText}>Create Event</Text>
              </Pressable>
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setNewEventModalVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Events Grid */}
        {filteredEvents && (
          <FlatList
            contentContainerStyle={styles.eventsGrid}
            data={filteredEvents}
            renderItem={({ item }) => (
              <View style={styles.eventCard}>
                <View style={styles.eventImageContainer}>
                  <Image source={{ uri: item.image }} style={styles.eventImage} />
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.7)"]}
                    style={styles.eventImageOverlay}
                  />
                  <View style={styles.eventCategory}>
                    <Text style={styles.eventCategoryText}>{item.category}</Text>
                  </View>
                </View>
                <View style={styles.eventDetails}>
                  <View style={styles.eventHeader}>
                    <Text style={styles.eventTitle}>{item.title}</Text>
                    <View style={styles.eventDate}>
                      <Text style={styles.eventDay}>{item.date.day}</Text>
                      <Text style={styles.eventMonth}>{item.date.month}</Text>
                    </View>
                  </View>
                  <Text style={styles.eventDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.eventInfo}>
                    <View style={styles.eventInfoItem}>
                      <Icon
                        name="location-outline"
                        size={14}
                        color={COLORS.textSecondary}
                      />
                      <Text style={styles.eventInfoText}>{item.location}</Text>
                    </View>
                    <View style={styles.eventInfoItem}>
                      <Icon
                        name="time-outline"
                        size={14}
                        color={COLORS.textSecondary}
                      />
                      <Text style={styles.eventInfoText}>{item.time}</Text>
                    </View>
                  </View>
                  <View style={styles.eventFooter}>
                    <Text style={styles.price}>{item.price}</Text>
                    <TouchableOpacity
                      style={styles.registerBtn}
                      onPress={() => navigation.navigate("event-details")}
                    >
                      <LinearGradient
                        colors={[COLORS.primary, COLORS.secondary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.registerBtnGradient}
                      >
                        <Text style={styles.registerBtnText}>Join Now</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleBookmark(item)}>
                      <Icon
                        name={
                          savedEvents.some((e) => e.id === item.id)
                            ? "bookmark"
                            : "bookmark-outline"
                        }
                        size={35}
                        style={styles.savedIcon}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) =>
              item?.id ? item.id.toString() : index.toString()
            }
          />
        )}

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
                      selectedTab === 0
                        ? COLORS.secondary
                        : COLORS.textSecondary,
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
                    selectedTab === 1
                      ? COLORS.secondary
                      : COLORS.textSecondary
                  }
                />
              </Animated.View>
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color:
                      selectedTab === 1
                        ? COLORS.secondary
                        : COLORS.textSecondary,
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
                    selectedTab === 2
                      ? COLORS.secondary
                      : COLORS.textSecondary
                  }
                />
              </Animated.View>
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color:
                      selectedTab === 2
                        ? COLORS.secondary
                        : COLORS.textSecondary,
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
                    selectedTab === 3
                      ? COLORS.secondary
                      : COLORS.textSecondary
                  }
                />
              </Animated.View>
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color:
                      selectedTab === 3
                        ? COLORS.secondary
                        : COLORS.textSecondary,
                    zIndex: 1,
                  },
                ]}
              >
                Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  success: "#4CAF50",
  warning: "#ff9800",
  danger: "#f44336",
  border: "#e5e7eb",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgLight,
    paddingTop: 30,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: COLORS.bgWhite,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
  },
  modalOptionText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: COLORS.bgWhite,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.bgLight,
    marginBottom: 10,
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
    width: (width - 40) / 1,
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
    height: 200,
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
    fontSize: 13,
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
    width: 130,
  },
  registerBtnGradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  registerBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.bgWhite,
    textAlign: "center",
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
  savedIcon: {
    color: COLORS.primary,
    marginLeft: 8,
  },
});

export default EventsScreen;