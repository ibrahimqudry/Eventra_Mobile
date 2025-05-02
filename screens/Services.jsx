
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // أضفت ده عشان الـ Navigation

const { width } = Dimensions.get("window");

const Services = () => {
  const navigation = useNavigation(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedTab, setSelectedTab] = useState(2);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scaleValues = useRef(
    [0, 0, 0, 0].map(() => new Animated.Value(1))
  ).current;
  const heroTitleOpacity = useRef(new Animated.Value(0)).current;
  const heroTextOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslateY = useRef(new Animated.Value(-50)).current;

  const categories = [
    { label: "All Categories", value: "" },
    { label: "Wedding Services", value: "wedding" },
    { label: "Corporate Events", value: "corporate" },
    { label: "Social Events", value: "social" },
    { label: "Decoration", value: "decor" },
  ];

  const bannerImage =
    "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

  const features = [
    {
      icon: "gem",
      title: "Wedding Decor",
      description:
        "Transform your special day with our elegant and customized wedding decorations.",
    },
    {
      icon: "music",
      title: "Sound Systems",
      description:
        "Professional audio equipment and setup for crystal clear sound at your event.",
    },
    {
      icon: "magic",
      title: "Makeup Services",
      description:
        "Professional makeup artists to help you look your best on your special day.",
    },
    {
      icon: "paint-brush",
      title: "Event Decor",
      description:
        "Creative and themed decorations for any type of event or celebration.",
    },
  ];

  const services = [
    {
      id: 1,
      title: "Wedding Halls",
      description:
        "Turn your dream wedding into reality! Grand ballrooms, intimate garden settings, or chic modern spaces every detail crafted to mirror your love story. ✨💍",
      image: require("../assets/card1.jpg"),
    },
    {
      id: 2,
      title: "Makeup Services",
      description:
        "Enhance your natural beauty with expert touch! From glamorous bridal looks to chic evening styles, our artists bring your vision to life. 💄✨",
      image: require("../assets/card2.jpg"),
    },
    {
      id: 3,
      title: "Product Launch",
      description:
        "Make your product unforgettable! From concept to execution, we create buzz-worthy events that captivate audiences and leave a lasting impression. 🚀✨",
      image: require("../assets/card3.webp"),
    },
    {
      id: 4,
      title: "Conference Halls",
      description:
        "Host impactful events in style! State-of-the-art facilities, flexible setups, and seamless tech integration—perfect for meetings, seminars, and corporate gatherings. 🎤💼",
      image: require("../assets/card4.jpg"),
    },
    {
      id: 5,
      title: "Award Ceremonies",
      description:
        "Celebrate excellence in style! From red-carpet glamour to elegant stages, we create unforgettable moments that honor achievements and inspire greatness. 🏆✨",
      image: require("../assets/card5.webp"),
    },
    {
      id: 6,
      title: "Photography",
      description:
        "Capture the world through your unique perspective! Whether it's breathtaking landscapes, candid emotions, or artistic details, every shot tells a story. 🌟📸",
      image: require("../assets/card6.jpg"),
    },
    {
      id: 7,
      title: "Events Decorations",
      description:
        "Transform any space into a magical setting! From elegant floral arrangements to dazzling lighting, we create unforgettable atmospheres for every occasion. ✨🎉",
      image: require("../assets/card7.jpg"),
    },
    {
      id: 8,
      title: "Catering For Events",
      description:
        "Delight your guests with exquisite flavors! From gourmet dishes to custom menus, we craft unforgettable culinary experiences for every occasion. 🍴✨",
      image: require("../assets/card8.jpg"),
    },
    {
      id: 9,
      title: "Music Concerts",
      description:
        "Feel the rhythm, live the moment! From electrifying performances to unforgettable acoustics, we bring the stage to life for every music lover. 🎶✨",
      image: require("../assets/card10.jpg"),
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

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
            useNativeDriver: true,
          })
        ),
      ]).start();

      if (screenName) {
        navigation.navigate(screenName); // الـ Navigation شغال دلوقتي
      }
    },
    [scaleValues, navigation]
  );

  // Filter Services
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter
      ? service.title.toLowerCase().includes(categoryFilter.toLowerCase())
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner Image */}
        <View style={styles.banner}>
          <Image source={{ uri: bannerImage }} style={styles.bannerImage} />
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.5)", "transparent"]}
            style={styles.bannerOverlay}
          />
        </View>

        {/* What We Do Section */}
        <View style={styles.whatWeDo}>
          <Text style={styles.sectionTitle}>
            What <Text style={styles.sectionTitleHighlight}>We Do</Text>
          </Text>
          <View style={styles.servicesContent}>
            <Text style={styles.servicesTitle}>
              Comprehensive Event Solutions
            </Text>
            <Text style={styles.servicesDescription}>
              We provide end-to-end event management services tailored to your
              needs.
            </Text>
            <View style={styles.servicesFeatures}>
              {features.map((feature, index) => (
                <View key={index} style={styles.feature}>
                  <FontAwesome5
                    name={feature.icon}
                    size={16}
                    color={COLORS.primary}
                  />
                  <View>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>
                      {feature.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <Pressable style={styles.btnPrimary}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btnGradient}
              >
                <Text style={styles.btnText}>Explore Services</Text>
              </LinearGradient>
            </Pressable>
          </View>
          <View style={styles.servicesGallery}>
            <View style={styles.galleryGrid}>
              {galleryImages.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.galleryImage}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Services Catalog */}
        <View style={styles.servicesCatalog}>
          <Text style={styles.sectionTitle}>
            Our <Text style={styles.sectionTitleHighlight}>Services</Text>
          </Text>
          <View style={styles.catalogFilters}>
            <View style={styles.searchBox}>
              <FontAwesome
                name="search"
                size={18}
                color={COLORS.textSecondary}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search services..."
                placeholderTextColor={COLORS.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <View style={styles.categoryFilter}>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Text style={styles.dropdownText}>
                  {categories.find((cat) => cat.value === categoryFilter)
                    ?.label || "Select Category"}
                </Text>
                <Ionicons
                  name={isDropdownOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              {isDropdownOpen && (
                <View style={styles.dropdownMenu}>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category.value}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setCategoryFilter(category.value);
                        setIsDropdownOpen(false);
                        console.log("Selected Category:", category.value);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>
                        {category.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
          <View style={styles.servicesCards}>
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomNav}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress(0, "Home")}
          >
            <Animated.View
              style={{ transform: [{ scale: scaleValues[0] }], zIndex: 1 }}
            >
              <Ionicons // استبدلت Icon بـ Ionicons
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
              <Ionicons // استبدلت Icon بـ Ionicons
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
              <Ionicons // استبدلت Icon بـ Ionicons
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
              <Ionicons // استبدلت Icon بـ Ionicons
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
    </SafeAreaView>
  );
};

const ServiceCard = ({ service }) => {
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation();
  

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[styles.serviceCard, isPressed && styles.serviceCardPressed]}
    >
      <View style={styles.cardImage}>
        <Image
          source={
            typeof service.image === "string"
              ? { uri: service.image }
              : service.image
          }
          style={styles.cardImageContent}
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{service.title}</Text>
        <Text style={styles.cardDescription}>{service.description}</Text>
        <Pressable
          style={styles.btnSecondary}
          onPress={() => navigation.navigate("ServiceDetails")}
        >
          <Text style={styles.btnSecondaryText}>Learn More</Text>
        </Pressable>
      </View>
    </Pressable>
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
    marginTop: 30,
  },
  scrollContent: {
    paddingBottom: SPACING.xLarge + 80,
  },
  banner: {
    height: 150,
    width: "100%",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.7,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  whatWeDo: {
    padding: SPACING.xLarge,
    backgroundColor: COLORS.bgWhite,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.large,
  },
  sectionTitleHighlight: {
    color: COLORS.primary,
  },
  servicesContent: {
    marginBottom: SPACING.large,
  },
  servicesTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
    textAlign: "center",
  },
  servicesDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SPACING.medium,
    textAlign: "center",
  },
  servicesFeatures: {
    marginBottom: SPACING.medium,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.small,
    marginBottom: SPACING.medium,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  featureDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  btnPrimary: {
    borderRadius: 9999,
    overflow: "hidden",
    alignSelf: "center",
  },
  btnGradient: {
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    alignItems: "center",
  },
  btnText: {
    color: COLORS.bgWhite,
    fontWeight: "600",
    fontSize: 16,
  },
  servicesGallery: {
    marginBottom: SPACING.medium,
  },
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  galleryImage: {
    width: (width - SPACING.xLarge * 2 - SPACING.medium) / 2,
    height: 150,
    borderRadius: 15,
    marginBottom: SPACING.medium,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  servicesCatalog: {
    padding: SPACING.large,
    backgroundColor: COLORS.bgLight,
  },
  catalogFilters: {
    marginBottom: SPACING.large,
    gap: SPACING.medium,
  },
  searchBox: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.bgWhite,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginLeft: SPACING.medium,
    color: COLORS.primary,
  },
  searchInput: {
    flex: 1,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    paddingLeft: SPACING.small,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  categoryFilter: {
    flex: 1,
    zIndex: 1000,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.bgWhite,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  dropdownMenu: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: COLORS.bgWhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 2000,
  },
  dropdownItem: {
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownItemText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  servicesCards: {
    gap: SPACING.medium,
  },
  serviceCard: {
    backgroundColor: COLORS.bgWhite,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceCardPressed: {
    transform: [{ translateY: -5 }],
  },
  cardImage: {
    height: 200,
    overflow: "hidden",
  },
  cardImageContent: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardContent: {
    padding: SPACING.medium,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.medium,
  },
  btnSecondary: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 9999,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.large,
  },
  btnSecondaryText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 14,
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

export default Services;


