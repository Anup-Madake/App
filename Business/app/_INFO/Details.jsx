import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
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
            <Text style={styles.title}>Upload Detail</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Detail"
                value={detail}
                onChangeText={setDetail}
            />
            <View style={styles.buttonContainer}>
                <Button title="Upload" onPress={handleUpload} />
                <View style={styles.buttonSpacer} />
                <Button title="Back" onPress={() => router.back()} />
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
    buttonSpacer: {
        height: 20, // Adjust the gap between buttons

    },
});
