import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Alert, Text } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

const PAYPAL_CLIENT_ID =
  "AcK3wxtaIgBIQr4u3zm1E8gHkRhv2NEID-9xT2HPHyCaKwBRiO2JOmBN1Mq-TCtgUaigrP5Kva4u1bpG";

const Paypal = ({ route }) => {
  const navigation = useNavigation();
  const { product } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Validate product data
  useEffect(() => {
    if (!product || !product.price || isNaN(product.price)) {
      setError("Invalid product data");
      Alert.alert("Error", "Invalid product data. Please try again.");
      navigation.goBack();
    }
  }, [product, navigation]);

  const price = product.price.toFixed(2);

  // Using PayPal's sandbox checkout page with additional parameters
  const paypalURL = `https://www.sandbox.paypal.com/checkoutnow?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture&amount=${price}&item_name=${encodeURIComponent(
    product.name
  )}&commit=true&disable-funding=credit,card&vault=false`;

  const handleNavigationStateChange = (navState) => {
    console.log("Navigation URL:", navState.url);

    if (navState.url.includes("success")) {
      Alert.alert("Success", "Payment completed successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } else if (navState.url.includes("cancel")) {
      Alert.alert("Cancelled", "Payment was cancelled", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } else if (navState.url.includes("error")) {
      setError("Payment failed");
      Alert.alert("Error", "Payment failed. Please try again.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: paypalURL }}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0070BA" />
            <Text style={styles.loadingText}>Loading PayPal...</Text>
          </View>
        )}
        onNavigationStateChange={handleNavigationStateChange}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.log("WebView Error:", nativeEvent);
          setError(`WebView error: ${nativeEvent.description}`);
        }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
        originWhitelist={["*"]}
        mixedContentMode="always"
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#0070BA",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Paypal;
