import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function InsuranceDetails() {
    const router = useRouter();

    const [details, setDetails] = useState({
        provider: "ABC Insurance Co.",
        policyNumber: "ABC123456789",
        coverage: "Comprehensive",
        startDate: "January 1, 2024",
        expiryDate: "December 31, 2024",
        claimHistory: "No claims made",
    });

    const handleInputChange = (field, value) => {
        setDetails({ ...details, [field]: value });
    };

    const handleSave = () => {
        console.log("Saved Details:", details);
        alert("Details saved successfully!");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>INSURANCE</Text>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.label}>Insurance Provider:</Text>
                    <TextInput
                        style={styles.input}
                        value={details.provider}
                        onChangeText={(text) => handleInputChange("provider", text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Policy Number:</Text>
                    <TextInput
                        style={styles.input}
                        value={details.policyNumber}
                        onChangeText={(text) => handleInputChange("policyNumber", text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Type of Coverage:</Text>
                    <TextInput
                        style={styles.input}
                        value={details.coverage}
                        onChangeText={(text) => handleInputChange("coverage", text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Policy Start Date:</Text>
                    <TextInput
                        style={styles.input}
                        value={details.startDate}
                        onChangeText={(text) => handleInputChange("startDate", text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Policy Expiry Date:</Text>
                    <TextInput
                        style={styles.input}
                        value={details.expiryDate}
                        onChangeText={(text) => handleInputChange("expiryDate", text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Previous Claim History:</Text>
                    <TextInput
                        style={styles.input}
                        value={details.claimHistory}
                        onChangeText={(text) => handleInputChange("claimHistory", text)}
                    />
                </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontFamily: "Nebula-Regular",
        color: "red",
        textAlign: "center",
        marginBottom: 20,
        textDecorationLine: "underline",
    },
    card: {
        backgroundColor: "#ffe6e6",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    row: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
       fontFamily: "Nebula-Regular",
        color: "#333",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: "#fff",
        fontFamily: "Nebula-Regular",
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    saveButton: {
        backgroundColor: "red",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginBottom: 10,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Nebula-Regular",
    },
    backButton: {
        backgroundColor: "gray",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
    },
    backButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Nebula-Regular",
    },
});
