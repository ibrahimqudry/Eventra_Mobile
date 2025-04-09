import React from 'react';
import {View,Text, Image,StyleSheet,ScrollView, Dimensions, TouchableOpacity,FlatList,} from "react-native";
import { useSelector,useDispatch } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { removeEvent } from '../redux/savedEventsSlice';

const { width } = Dimensions.get("window");

const SavedEventsScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const handleBookmark = (event) => {
      dispatch(removeEvent({ id: event.id }));
    };
  const savedEvents = useSelector((state) => state.savedEvents.savedEvents);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Events</Text>
      
      <FlatList
        data={savedEvents}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <View style={styles.eventImageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.eventImage}
              />
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
                  onPress={() => navigation.navigate("event-details", { event: item })}
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
          <Icon name="bookmark" size={35} style={styles.savedIcon} color={COLORS.primary} />
                          </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 ,marginTop: 60 }}>
          <Image source={require('../assets/no-events.png')} style={{ width: 300, height: 300 }} />
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: COLORS.textPrimary,
            marginTop: 16,
          }}>Discover and Save Your Favorite Events!</Text>
        </View>
        }
      />
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: COLORS.bgWhite,
  },
  eventCard: {
    width: width - 32,
    backgroundColor: COLORS.bgWhite,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 16,
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
  }
  
});

export default SavedEventsScreen;