import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

const UserDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.headerBackground}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image source={{ uri: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436180.jpg?w=900" }} style={styles.avatar} />
          <Text style={styles.userName}>Mariam Ahmed</Text>
        </View>
      </LinearGradient>

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer}>
        <View style={styles.section}>
          <MenuItem label="Account" icon="person-outline" onPress={() => navigation.navigate("Account")}/>
          <MenuItem label="Notifications" icon="notifications-outline" onPress={() => navigation.navigate("Notifications")} />
        </View>

        <View style={styles.section}>
          <MenuItem label="Scheduled Events" icon="clipboard-outline"/>
          <MenuItem label="Saved Events" icon="bookmark-outline" onPress={() => navigation.navigate("savedEvents")} />
          <MenuItem label="Your Tickets" icon="ticket-outline" />
          <MenuItem label="Bank Accounts" icon="card-outline" />
          <MenuItem label="Community Room" icon="chatbubble-ellipses-outline" />
          <MenuItem label="Help/Support" icon="call-outline" />
          <MenuItem label="Logout" icon="exit-outline" />
        </View>
      </ScrollView>
    </View>
  );
};

// تحديث `MenuItem` ليمرر `onPress`
const MenuItem = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Icon name={icon} size={20} color="#555" />
    <Text style={styles.menuText}>{label}</Text>
    <Icon name="chevron-forward" size={20} color="#aaa" />
  </TouchableOpacity>
);

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
  headerBackground: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.textSecondary
  },
  userName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  menuContainer: {
    marginTop: -20,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: COLORS.bgWhite,
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 15,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginLeft: 10,
  },
});

export default UserDashboard;
