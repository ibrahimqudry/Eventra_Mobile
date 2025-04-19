import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TestPayment = () => {
  const navigation = useNavigation();

  const handlePayment = () => {
    const product = {
      name: "Test Event Ticket",
      price: 29.99,
      description: "Test payment for event ticket",
    };
    navigation.navigate("Paypal", { product });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Payment</Text>
      <Text style={styles.subtitle}>Try the payment gateway</Text>

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Test Payment ($29.99)</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          • This is a test environment
          {"\n"}• Use test card: 4111 1111 1111 1111
          {"\n"}• Expiry: Any future date
          {"\n"}• CVV: Any 3 digits
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#0070BA",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "100%",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 24,
  },
});

export default TestPayment;
