import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingScreen() {
  const router = useRouter();
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("jwt");
    router.replace("/authenticate");
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Your other content goes here */}
        <View style={{ flex: 1 }} />

        {/* Logout button at the bottom */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleLogout}>
            <Text style={styles.primaryBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171221",
    paddingTop: 40,
    marginBottom: 60
  },
  logoutContainer: {
    padding: 20, // optional, space from bottom
    alignItems: "center",
  },

   primaryBtn: {
    backgroundColor: "#7b4be2",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
