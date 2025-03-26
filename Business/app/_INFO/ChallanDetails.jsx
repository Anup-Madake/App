import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function UploadDetails() {
    const router = useRouter();
    const [detail, setDetail] = useState("");

    const handleUpload = () => {
        console.log("Uploaded Detail:", detail);
        alert("Details uploaded successfully!");
        router.back(); // Go back to the previous page
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Challan</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Detail"
                value={detail}
                onChangeText={setDetail}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleUpload}>
                    <Text style={styles.buttonText}>Upload</Text>
                </TouchableOpacity>
                <View style={styles.buttonSpacer} />
                <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 30,
        backgroundColor: "#fff",
        fontFamily: "Nebula-Regular",
    },
    title: {
        fontSize: 24,
        fontFamily: "Nebula-Regular",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        fontFamily: "Nebula-Regular",
    },
    buttonContainer: {
        marginTop: 10,
    },
    button: {
        backgroundColor: "red", // Change this color as needed
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    backButton: {
        backgroundColor: "gray", // Change this color as needed
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Nebula-Regular", // Custom font
    },
    buttonSpacer: {
        height: 20, // Adjust the gap between buttons
    },
});
