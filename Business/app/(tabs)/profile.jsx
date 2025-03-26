import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useUser } from "@clerk/clerk-expo"; // For authenticated user info
import * as ImagePicker from "expo-image-picker"; // For image picking
import { Colors } from "./../../constants/Colors";

export default function Profile() {
    const { isSignedIn, user } = useUser(); // Clerk hook to access user info
    const [username, setUsername] = useState(user?.unsafeMetadata?.username || ""); // Username from unsafeMetadata
    const [phoneNumber, setPhoneNumber] = useState(user?.unsafeMetadata?.phoneNumber || ""); // Contact Number
    const [emergencyContact, setEmergencyContact] = useState(user?.unsafeMetadata?.emergencyContact || ""); // Emergency Contact
    const [userPhoto, setUserPhoto] = useState(null); // To store the user's uploaded photo

    // Function to handle photo upload
    const handlePhotoUpload = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            alert("Permission to access the media library is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setUserPhoto(result.uri); // Set the uploaded photo URI
        }
    };

    // Function to handle updates to username, phone number, and emergency contact
    const handleProfileUpdate = async () => {
        try {
            if (!user) throw new Error("User not found");

            // Use the `update` method from the user object to store in unsafeMetadata
            await user.update({
                unsafeMetadata: {
                    username: username || null,
                    phoneNumber: phoneNumber || null,
                    emergencyContact: emergencyContact || null,
                },
            });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Profile update error:", error); // Log the error
            alert(`Failed to update profile: ${error.message}`);
        }
    };

    if (!isSignedIn) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>You need to sign in to view this page.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header Image */}
            <Image
                source={require("./../../assets/images/head1.png")}
                style={styles.headerImage}
            />
            <Text style={styles.title}>PROFILE</Text>

            {/* User Information */}
            <View style={styles.profileCard}>
                {/* Profile Picture */}
                <TouchableOpacity onPress={handlePhotoUpload}>
                    <Image
                        source={{
                            uri: userPhoto || user?.profileImageUrl || "https://via.placeholder.com/100",
                        }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.uploadText}>
                        {userPhoto ? "Change Photo" : "Upload Photo"}
                    </Text>
                </TouchableOpacity>

                {/* User Details */}
                <Text style={styles.label}>
                    Name: <Text style={styles.info}>{user?.fullName || "N/A"}</Text>
                </Text>
                <Text style={styles.label}>
                    Email: <Text style={styles.info}>{user?.emailAddresses[0]?.emailAddress || "N/A"}</Text>
                </Text>

                {/* Editable Username */}
                <Text style={styles.label}>Username:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            {/* Additional Inputs */}
            <View style={styles.inputCard}>
                <Text style={styles.label}>Phone Number:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                <Text style={styles.label}>Emergency Contact:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter emergency contact"
                    value={emergencyContact}
                    onChangeText={setEmergencyContact}
                />

                <TouchableOpacity style={styles.updateButton} onPress={handleProfileUpdate}>
                    <Text style={styles.updateButtonText}>Update Profile</Text>
                </TouchableOpacity>
            </View>

            {/* Display Saved Phone and Emergency Contact */}
            <View style={styles.profileCard}>
                <Text style={styles.label}>
                    Saved Username: <Text style={styles.info}>{username || "N/A"}</Text>
                </Text>
                <Text style={styles.label}>
                    Saved Phone Number: <Text style={styles.info}>{phoneNumber || "N/A"}</Text>
                </Text>
                <Text style={styles.label}>
                    Emergency Contact: <Text style={styles.info}>{emergencyContact || "N/A"}</Text>
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f9f9f9",
        alignItems: "center",
        paddingBottom: 20,
        fontFamily: "Nebula-Regular",
    },
    headerImage: {
        width: "100%",
        height: "10%",
    },
    title: {
        fontSize: 25,

        color: "red",
        textAlign: "center",
        marginVertical: 10,
        marginTop: 60,
        fontFamily: "Nebula-Regular",

    },
    profileCard: {
        backgroundColor: "#ffe6e1",
        borderRadius: 15,
        margin: 20,
        padding: 20,
        width: "90%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        fontFamily: "Nebula-Regular",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "#ddd",
    },
    uploadText: {
        fontSize: 14,
        color: Colors.PRIMARY,
        textAlign: "center",
        marginTop: 5,
        fontFamily: "Nebula-Regular",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
        fontFamily: "Nebula-Regular",
    },
    info: {
        fontWeight: "normal",
        color: "#000",
        fontFamily: "Nebula-Regular",
    },
    inputCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        margin: 20,
        padding: 20,
        width: "90%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        fontFamily: "Nebula-Regular",
    },
    input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        fontFamily: "Nebula-Regular",
    },
    updateButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        fontFamily: "Nebula-Regular",
    },
    updateButtonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Nebula-Regular",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        fontFamily: "Nebula-Regular",
    },
    errorText: {
        fontSize: 18,
        color: "red",
        textAlign: "center",
        fontFamily: "Nebula-Regular",
    },
});
