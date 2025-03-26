import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function VehicleInfo() {
    const router = useRouter();

    const [details, setDetails] = useState({
        model: "Hero Hunk 150R",
        registration: "HR12AB3456",
        vin: "MH1A1234567890",
        year: "2022",
        engine: "H1234E567890",
        chassis: "H1234C567890",
        odometer: "5,000 km",
        color: "Black",
    });

    const handleInputChange = (field, value) => {
        setDetails({ ...details, [field]: value });
    };

    return (
        <View style={styles.container}>
            {/* Header Image */}
            <View>
                <Image
                    source={require("./../../assets/images/head1.png")}
                    style={styles.headerImage}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>VEHICLE</Text>
                </View>

                {/* Editable Vehicle Details Card */}
                <View style={styles.card}>
                    {Object.entries(details).map(([key, value], index) => (
                        <View key={index} style={styles.detailRow}>
                            <Text style={styles.label}>{key.replace(/^\w/, (c) => c.toUpperCase())}:</Text>
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={(text) => handleInputChange(key, text)}
                                placeholder={`Enter ${key}`}
                            />
                        </View>
                    ))}
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={() => alert("Details saved successfully!")}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>

                {/* Go Back Button */}
                <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
                    <Text style={styles.goBackButtonText}>Go Back</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerImage: {
        width: "100%",
        height: "30%",

    },
    scrollContainer: {
        paddingBottom: 20, // Adds padding at the bottom for scrolling
    },
    titleContainer: {
        marginVertical: 20,
        alignItems: "center",
        marginTop:20
    },
    title: {
        fontFamily: "Nebula-Regular",
        fontSize: 28,
        color: "red",
        textAlign: "center",
        textDecorationLine: "underline",
        marginTop: -30,
        padding:20
    },
    card: {
        backgroundColor: "#ffe6e6",
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    detailRow: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: "red",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignSelf: "center",
    },
    saveButtonText: {
        fontFamily: "Nebula-Regular",
        fontSize: 16,
        color: "#fff",
    },
    goBackButton: {
        marginTop: 10,
        backgroundColor: "grey",
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignSelf: "center",
    },
    goBackButtonText: {
        fontFamily: "Nebula-Regular",
        fontSize: 16,
        color: "#fff",
    },
});
