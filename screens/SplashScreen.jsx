import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

// Color Palette
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

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const orbitAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animationSequence = Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.loop(
          Animated.timing(orbitAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          })
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.04,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 1200,
              useNativeDriver: true,
            }),
          ])
        ),
      ]),
    ]);

    animationSequence.start();

    const navigationTimeout = setTimeout(() => {
      navigation.replace("login");
    }, 3500);

    return () => clearTimeout(navigationTimeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Full-Screen Background */}
      <LottieView
        source={require("../assets/bg-animation.json")}
        autoPlay
        loop
        style={styles.lottieBg}
      />

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

      {/* Logo with Pulse */}
      <Animated.Image
        source={require("../assets/logo.jpeg")}
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { scale: pulseAnim }],
          },
        ]}
      />

      {/* App Name */}
      <Animated.Text
        style={[
          styles.appName,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        Eventera
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text
        style={[
          styles.tagline,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        Craft Your Next Adventure
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgLight,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  lottieBg: {
    position: "absolute",
    width: width * 1.1,
    height: height * 1.1,
    opacity: 0.15,
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
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
    opacity: 0.5,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    borderRadius: 30,
    marginBottom: 30,
  },
  appName: {
    fontSize: 48,
    fontWeight: "900",
    color: COLORS.primary,
    letterSpacing: 1.5,
    textShadowColor: `rgba(99, 102, 241, 0.3)`,
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
    marginBottom: 15,
  },
  tagline: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.textSecondary,
    letterSpacing: 0.8,
  },
});
