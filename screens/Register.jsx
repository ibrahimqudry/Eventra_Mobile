import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

export default function RegisterScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const orbitAnim = useRef(new Animated.Value(0)).current;
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(orbitAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, [fadeAnim, orbitAnim]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => {
      console.log("Show Password State:", !prev); // للاختبار
      return !prev;
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View style={styles.formWrapper}>
        {/* Orbiting Particles */}
        <Animated.View
          style={[
            styles.orbit,
            {
              transform: [
                {
                  rotate: orbitAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={[styles.particle, { top: -20, left: 80 }]} />
          <View style={[styles.particle, { bottom: -20, right: 80 }]} />
          <View style={[styles.particle, { top: 60, left: -40 }]} />
        </Animated.View>

        {/* Logo */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image
            source={require("../assets/logo.jpeg")} // استبدل بمسار اللوجو الخاص بيكي
            style={styles.logo}
          />
        </Animated.View>

        {/* Toggle Buttons (Navigation) */}
        <Animated.View style={[styles.toggleContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={[styles.toggleText, { color: COLORS.textSecondary }]}>
              Log In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.toggleButton, styles.activeToggle]}>
            <Text style={[styles.toggleText, { color: COLORS.primary }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Title and Subtitle */}
        <View>
          <Text style={styles.title}>Get Started Now</Text>
          <Text style={styles.subtitle}>
            Create an account or login to explore
          </Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {/* First Name and Last Name Side by Side */}
          <View style={styles.nameContainer}>
            <View style={styles.nameInputWrapper}>
              <TextInput
                style={styles.nameInput}
                placeholder="First Name"
                placeholderTextColor={COLORS.textSecondary}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.nameInputWrapper}>
              <TextInput
                style={styles.nameInput}
                placeholder="Last Name"
                placeholderTextColor={COLORS.textSecondary}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Icon
              name="mail"
              size={20}
              color={COLORS.primary}
              style={styles.inputIcon}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Birthdate (MM/DD/YYYY)"
              placeholderTextColor={COLORS.textSecondary}
            />
            <Icon
              name="calendar"
              size={20}
              color={COLORS.primary}
              style={styles.inputIcon}
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>+454</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="Phone Number"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="phone-pad"
              />
              <Icon
                name="call"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Set Password"
              placeholderTextColor={COLORS.textSecondary}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={toggleShowPassword}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Register Button */}
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  formWrapper: {
    alignItems: "center",
  },
  orbit: {
    position: "absolute",
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  particle: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: COLORS.secondary,
    opacity: 0.5,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeToggle: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginVertical: 10,
  },
  inputContainer: {
    width: width * 0.9,
    marginVertical: 10,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  nameInputWrapper: {
    width: "48%",
  },
  nameInput: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.bgWhite,
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.bgWhite,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    backgroundColor: COLORS.bgWhite,
  },
  countryCode: {
    padding: 15,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  phoneInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  inputIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
     transform: [{translateY: -10}], // تعديل الموقع لتكون في المنتصف بالضبط
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
      top: "50%",
    transform: [{ translateY: -10 }],
  },
  button: {
    width: width * 0.9,
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.bgWhite,
  },
});
