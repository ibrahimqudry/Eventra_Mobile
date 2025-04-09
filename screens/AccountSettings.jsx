import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

const AccountSettings = () => {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [image, setImage] = useState(null);
    const [interests, setInterests] = useState([]);

    const allInterests = ["Books", "Finance", "Fashion", "Medical", "Technology", "Business"];

    // Add Image
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    //Remove Image
    const removeImage = () => setImage(null);

    // Choose Interests
    const toggleInterest = (interest) => {
        setInterests((prev) =>
            prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Lorem ipsum dolor sit amet consectetur.</Text>

            {/* Personal profile Image*/}
            <View style={styles.profileContainer}>
                <Image source={image ? { uri: image } : { uri: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436180.jpg?w=900" }} style={styles.avatar} />
                <View style={styles.profileButtons}>
                    <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                        <Text style={styles.buttonText}>Upload New Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteBtn} onPress={removeImage}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Enter data*/}
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                <TextInput style={styles.input} placeholder="Country" value={country} onChangeText={setCountry} />
                <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
                <TextInput style={styles.input} placeholder="State" value={state} onChangeText={setState} />
            </View>

            {/* Add Interests*/}
            <Text style={styles.interestTitle}>
                <Icon name="plus" size={16} color="#6366f1" /> Add Interests
            </Text>
            <View style={styles.interestsContainer}>
                {allInterests.map((interest) => (
                    <TouchableOpacity
                        key={interest}
                        style={[styles.interestBtn, interests.includes(interest) && styles.selectedInterest]}
                        onPress={() => toggleInterest(interest)}
                    >
                        <Text style={styles.interestText}>{interest}</Text>
                    </TouchableOpacity>
                
                ))}
            </View>

            {/* Buttons*/}
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.cancelBtn}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 50, backgroundColor: "#f9f9f9" },
    title: { fontSize: 24, fontWeight: "bold", color: "#333" },
    subtitle: { fontSize: 14, color: "#666", marginBottom: 20 },
    profileContainer: { alignItems: "center", marginBottom: 20 },
    avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: "#ddd" },
    profileButtons: { flexDirection: "row", marginTop: 10 },
    uploadBtn: { backgroundColor: "#6366f1", padding: 10, borderRadius: 5, marginRight: 10 },
    deleteBtn: { backgroundColor: "#f44336", padding: 10, borderRadius: 5 },
    buttonText: { color: "#fff", fontWeight: "bold" },
    form: { marginBottom: 20 },
    input: { backgroundColor: "#fff", padding: 10, marginBottom: 10, borderRadius: 5, borderWidth: 1, borderColor: "#ddd" },
    interestTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    interestsContainer: { flexDirection: "row", flexWrap: "wrap" },
    interestBtn: { padding: 10, backgroundColor: "#6b7280", borderRadius: 20, marginRight: 10, marginBottom: 10 },
    selectedInterest: { backgroundColor: "#6366f1" },
    interestText: { fontWeight: "bold", color: "#f3f4f6" },
    buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
    cancelBtn: { backgroundColor: "#ccc", padding: 10, borderRadius: 5, flex: 1, marginRight: 10, alignItems: "center" },
    saveBtn: { backgroundColor: "#4CAF50", padding: 10, borderRadius: 5, flex: 1, alignItems: "center" },
});

export default AccountSettings;
