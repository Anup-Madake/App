import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function Explore() {
    const router = useRouter();
    const [expandedOption, setExpandedOption] = useState(null);

    // Sample saved data for dropdown details
    const [savedDetails, setSavedDetails] = useState({
        Insurance: {
            provider: "ABC Insurance Co.",
            policyNumber: "ABC123456789",
        },
        Challan: {
            status: "No pending challans",
        },
        PUC: {
            certificateNumber: "PUC123456",
            validity: "June 20, 2024 - June 20, 2025",
        },
    });

    const toggleDropdown = (option) => {
        setExpandedOption(expandedOption === option ? null : option);
    };

    const handleNavigation = (option) => {
        router.push({
            pathname: `/_INFO/${option}Details`,
            params: { onSave: (data) => setSavedDetails({ ...savedDetails, [option]: data }) },
        });
    };

    return (
        <View style={styles.container}>
            {/* Header Image */}
            <View>
                <Image
                    source={require("./../../assets/images/head1.png")}
                    style={{
                        width: "100%",
                        height: "40%",
                    }}
                />
            </View>

            {/* Title */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>MY VEHICLE</Text>
            </View>

            {/* Card */}
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require("./../../assets/images/Scooter.png")}
                        style={styles.vehicleImage}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push("/_INFO/VehicleInfo")}
                    >
                        <Text style={styles.buttonText}>Vehicle Info</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.vehicleName}>Hero Hunk 150R</Text>
                    <Text style={styles.vehicleNumber}>MH12 GH 3456</Text>
                </View>

                {["Insurance", "Challan", "PUC"].map((option, index) => (
                    <View key={index} style={styles.option}>
                        <TouchableOpacity
                            style={styles.optionHeader}
                            onPress={() => toggleDropdown(option)}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                            <Text style={styles.optionIcon}>
                                {expandedOption === option ? "⌃" : "⌄"}
                            </Text>
                        </TouchableOpacity>
                        {expandedOption === option && (
                            <View style={styles.dropdownContent}>
                                <Text style={styles.dropdownText}>Details for {option}:</Text>
                                {Object.entries(savedDetails[option] || {}).map(
                                    ([key, value], idx) => (
                                        <Text key={idx} style={styles.dropdownDetail}>
                                            <Text style={styles.bold}>{key}:</Text> {value}
                                        </Text>
                                    )
                                )}
                                <TouchableOpacity
                                    style={styles.uploadButton}
                                    onPress={() => handleNavigation(option)}
                                >
                                    <Text style={styles.uploadButtonText}>
                                        Edit Details
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    titleContainer: {
        marginTop: -70,
        padding: 5,
    },
    title: {
        fontFamily: "Nebula-Regular",
        fontSize: 30,
        color: "red",
        textAlign: "center",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        marginHorizontal: 20,
        marginTop: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    vehicleImage: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    button: {
        backgroundColor: "red",
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 12,
        fontFamily: "Nebula-Regular",
    },
    infoContainer: {
        marginTop: 10,
        alignItems: "center",
    },
    vehicleName: {
        fontSize: 18,
        fontFamily: "Nebula-Regular",
        color: "gray",
    },
    vehicleNumber: {
        fontSize: 14,
        fontFamily: "Nebula-Regular",
        color: "gray",
    },
    option: {
        borderTopWidth: 1,
        borderColor: "#ddd",
        marginTop: 5,
    },
    optionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
    },
    optionText: {
        fontSize: 16,
        fontFamily: "Nebula-Regular",
        color: "gray",
    },
    optionIcon: {
        fontSize: 18,
        fontFamily: "Nebula-Regular",
        color: "gray",
    },
    dropdownContent: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#f9f9f9",
    },
    dropdownText: {
        fontSize: 14,
        fontFamily: "Nebula-Regular",
        color: "gray",
    },
    dropdownDetail: {
        fontSize: 14,
        color: "black",
        marginVertical: 3,
    },
    bold: {
        fontWeight: "bold",
    },
    uploadButton: {
        marginTop: 10,
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        fontFamily: "Nebula-Regular",
    },
    uploadButtonText: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center",
        fontFamily: "Nebula-Regular",
    },
});
