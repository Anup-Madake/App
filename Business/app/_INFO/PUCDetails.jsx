import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function PUCDetails() {
    const router = useRouter();

    const [details, setDetails] = useState({
        certificateNumber: "PUC123456",
        issueDate: "June 20, 2024",
        validityPeriod: "June 20, 2024 - June 20, 2025",
        emissionLevels: "Within permissible limits",
        issuedBy: "Authorized PUC Testing Center",
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
            <Text style={styles.title}>PUC</Text>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.label}>PUC Certificate Number:</Text>
                    <TextInput
                        style={styles.input}
                        value={details.certificateNumber}
                        onChangeText={(text) => handleInputChange("certificateNumber", text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Date of Issue:</Text>
                    <TextInput
                        style={styles.input}
                        value={details.issueDate}
                        onChangeText={(text) => handleInputChange("issueDate", text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Validity Period:</Text>
                    <TextInput
                        style={styles.input}
                        value={details.validityPeriod}
                        onChangeText={(text) => handleInputChange("validityPeriod", text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Emission Levels:</Text>
                    <TextInput
                        style={styles.input}
                        value={details.emissionLevels}
                        onChangeText={(text) => handleInputChange("emissionLevels", text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Issued By:</Text>
                    <TextInput
                        style={styles.input}
                        value={details.issuedBy}
                        onChangeText={(text) => handleInputChange("issuedBy", text)}
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
        fontWeight: "bold",
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
