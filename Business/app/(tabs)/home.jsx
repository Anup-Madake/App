import { Image, Text, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BluetoothSerial from "react-native-bluetooth-classic";

export default function Home() {
    const [batteryLevel, setBatteryLevel] = useState(null); // Battery level fetched dynamically
    const [bluetoothStatus, setBluetoothStatus] = useState(false); // Bluetooth connection state

    useEffect(() => {
        const fetchDeviceData = async () => {
            try {
                // Check Bluetooth enabled status
                const isEnabled = await BluetoothSerial.isEnabled();
                setBluetoothStatus(isEnabled);

                if (isEnabled) {
                    // Get list of paired devices
                    const devices = await BluetoothSerial.list();
                    if (devices.length > 0) {
                        // Assume the first device for demonstration
                        const connectedDevice = devices[0];

                        // Simulate fetching battery data from device
                        // Replace with actual characteristic read based on device specification
                        const batteryData = Math.floor(Math.random() * 101); // Simulate 0-100% battery level
                        setBatteryLevel(batteryData);
                    } else {
                        setBatteryLevel(null);
                    }
                }
            } catch (error) {
                console.error("Error fetching Bluetooth device data:", error);
            }
        };

        fetchDeviceData();
        const interval = setInterval(fetchDeviceData, 10000); // Poll every 10 seconds

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    const getBatteryIcon = () => {
        if (batteryLevel === null) return <MaterialIcons name="battery-unknown" size={40} color="black" />;
        if (batteryLevel > 75) return <FontAwesome name="battery-full" size={40} color="green" />;
        if (batteryLevel > 50) return <FontAwesome name="battery-half" size={40} color="yellow" />;
        if (batteryLevel > 25) return <MaterialCommunityIcons name="battery-50" size={40} color="orange" />;
        return <FontAwesome name="battery-quarter" size={40} color="red" />;
    };

    return (
        <View>
            {/* Header Image */}
            <View>
                <Image
                    source={require("./../../assets/images/head1.png")}
                    style={{
                        width: "100%",
                        height: "30%",
                    }}
                />
            </View>

            {/* Title */}
            <View style={{ marginTop: -120, marginLeft: 30 }}>
                <Text style={{ fontFamily: "Nebula-Regular", fontSize: 20 }}>DEVICE STATUS</Text>
            </View>

            {/* Status */}
            <View style={styles.statusContainer}>
                <View style={styles.horizontalRow}>
                    <View style={styles.rowContainer}>
                        {getBatteryIcon()}
                        <Text style={styles.batteryText}>
                            {batteryLevel !== null ? `${batteryLevel}%` : "No Data"}
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <MaterialIcons
                            name={bluetoothStatus ? "bluetooth" : "bluetooth-disabled"}
                            size={40}
                            color={bluetoothStatus ? "blue" : "gray"}
                        />
                        <Text style={styles.batteryText}>
                            {bluetoothStatus ? "Connected" : "Disconnected"}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Additional Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={require("./../../assets/images/AR.png")} // Replace with your image path
                    style={{
                        width: "100%",
                        height: 200,
                        resizeMode: "contain",
                        marginTop: 10, // Keeps the aspect ratio
                    }}
                />
            </View>

            {/* Table */}
            <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>MY LAST TRIP</Text>
                <View style={[styles.tableRow, styles.alternateRow]}>
                    <Text style={styles.tableCell}>Distance</Text>
                    <Text style={styles.tableCell}>7.4</Text>
                    <Text style={styles.tableCell}>km</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Avg Speed</Text>
                    <Text style={styles.tableCell}>35</Text>
                    <Text style={styles.tableCell}>km/hr</Text>
                </View>
                <View style={[styles.tableRow, styles.alternateRow]}>
                    <Text style={styles.tableCell}>Elevation</Text>
                    <Text style={styles.tableCell}>1.9</Text>
                    <Text style={styles.tableCell}>m</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Total ODO</Text>
                    <Text style={styles.tableCell}>103890</Text>
                    <Text style={styles.tableCell}>km</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>---</Text>
                    <Text style={styles.tableCell}>--</Text>
                    <Text style={styles.tableCell}>--</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>---</Text>
                    <Text style={styles.tableCell}>--</Text>
                    <Text style={styles.tableCell}>--</Text>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    statusContainer: {
        marginTop: 10,
        marginLeft: 30,
    },
    batteryText: {
        fontSize: 16,
        fontFamily: "Nebula-Regular",
        marginLeft: 10,
        marginTop:10
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginRight: 50,
    },
    horizontalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    imageContainer: {
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
    },
    tableContainer: {
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
    },
    tableTitle: {
        fontSize: 18,
        fontFamily: "Nebula-Regular",
        marginBottom: 10,
        marginTop: 20,
        color: "red",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        marginRight: 10,
        marginTop:5,
        paddingTop: 5,
        backgroundColor: "white",
    },
    alternateRow: {
        backgroundColor: "#f9f9f9",
    },
    tableCell: {
        fontSize: 16,
        fontFamily: "Nebula-Regular",
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
});
