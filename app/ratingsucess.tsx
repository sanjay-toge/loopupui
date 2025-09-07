import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RatingSuccess() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header with close button */}
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <Path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
          </Svg>
        </TouchableOpacity> */}
      </View>

      {/* Message */}
      <View style={styles.messageContainer}>
        <Text style={styles.title}>Thank you for your rating!</Text>
        <Text style={styles.subtitle}>
          Your input helps us improve the experience for everyone.
        </Text>
      </View>

      {/* Footer with button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => router.push("/(tabs)")} // 👈 Change to wherever you want to redirect
        >
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171221",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    paddingBottom: 8,
  },
  closeButton: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  messageContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  doneButton: {
    backgroundColor: "#7b4be2",
    borderRadius: 12,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  doneText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
