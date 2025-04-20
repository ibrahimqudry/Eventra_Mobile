import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const NotificationsScreen = ({ navigation }) => {
  // Tested Notifications
  const [notifications, setNotifications] = useState([
    { id: "1", name: "Mariam", message: "We’ve got an exciting new event in Business, and we think you’ll love it!", time: "8 mins ago", isNew: true },
    { id: "2", name: "Mariam", message: "Don’t miss out! Register now or learn more about Tech Summit 2025", time: "10 mins ago", isNew: true },
    { id: "3", name: "Nathan Lucas", message: "Added New Event, Learn more !", time: "7 hrs ago", isNew: false },
  ]);

  // Function to Remove a Notification
  const removeNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* If no notifications, show empty state */}
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={require("../assets/empty.png")} style={styles.bellImage} />
          <Text style={styles.emptyText}>Nothing here!!!</Text>
          <Text style={styles.subText}>Tap the notification settings button below and check again.</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.buttonText}>Notification Settings</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Notifications List
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name} <Text style={styles.message}>{item.message}</Text></Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>

              {/* Buttons */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.ignoreButton} onPress={() => removeNotification(item.id)}>
                  <Icon name="close" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate("EventDetails")}>
                  <Icon name="chevron-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default NotificationsScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 10,
    paddingBlock: 70,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bellImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginHorizontal: 40,
    marginTop: 5,
  },
  settingsButton: {
    marginTop: 20,
    backgroundColor: "#a855f7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    color: "#555",
  },
  time: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  ignoreButton: {
    backgroundColor: "#E57373",
    padding: 10,
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: "#81C784",
    padding: 10,
    borderRadius: 5,
  },
});
