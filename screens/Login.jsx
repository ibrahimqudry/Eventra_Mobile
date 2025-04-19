import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);
  const orbitAnim = new Animated.Value(0);

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
  }, []);

  return (
    <View style={styles.container}>
      {/* Form Container (Centered Vertically) */}
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

        {/* Toggle Buttons (Navigation) Without Rectangle */}
        <Animated.View style={[styles.toggleContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity style={[styles.toggleButton, styles.activeToggle]}>
            <Text style={[styles.toggleText, { color: COLORS.primary }]}>
              Log In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={[styles.toggleText, { color: COLORS.textSecondary }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Title and Subtitle */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.title}>Get Started Now</Text>
          <Text style={styles.subtitle}>
            Create an account or login to explore
          </Text>
        </Animated.View>

        {/* Input Fields with Icons */}
        <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
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
              placeholder="Password"
              placeholderTextColor={COLORS.textSecondary}
              secureTextEntry
            />
            <Icon
              name="lock-closed"
              size={20}
              color={COLORS.primary}
              style={styles.inputIcon}
            />
          </View>
        </Animated.View>

        {/* Remember Me and Forgot Password */}
        <Animated.View style={[styles.optionsContainer, { opacity: fadeAnim }]}>
          <View style={styles.rememberContainer}>
            <TouchableOpacity>
              <View style={styles.checkbox} />
            </TouchableOpacity>
            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Login Button */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Social Login */}
        <Animated.View style={[styles.socialContainer, { opacity: fadeAnim }]}>
          <Text style={styles.socialText}>Or login with</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialButton}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.socialButtonGradient}
              >
                <Icon name="logo-google" size={24} color={COLORS.bgWhite} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.socialButtonGradient}
              >
                <Icon name="logo-facebook" size={24} color={COLORS.bgWhite} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.socialButtonGradient}
              >
                <Icon name="logo-apple" size={24} color={COLORS.bgWhite} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </View>
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
    marginBottom: 30,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
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
    marginVertical: 20,
  },
  inputContainer: {
    width: width * 0.9,
    marginVertical: 20,
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    paddingRight: 40, // مساحة للأيقونة
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.bgWhite,
  },
  inputIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.9,
    marginVertical: 20,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 4,
    marginRight: 8,
  },
  rememberText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  forgotText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  button: {
    width: width * 0.9,
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.bgWhite,
  },
  socialContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  socialText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 15,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },
  socialButton: {
    borderRadius: 8,
    overflow: "hidden",
  },
  socialButtonGradient: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
