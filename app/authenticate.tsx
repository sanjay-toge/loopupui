import { api } from "@/api/api";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode"; // ✅
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { JwtPayload } from "@/types/jwtpayload";

export default function AuthenticateScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Login"); // default tab
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password) return;
    try {
      setLoading(true);
      const res = await api.post<{ token?: string }>("auth/login", {
        username: email,
        password,
      });
      // console.log((res as any).token);
      if ((res as any).token) {
        await SecureStore.setItemAsync("jwt", (res as any).token);
        setUserId();
      }
      router.replace("/(tabs)");
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setLoading(false);
    }
  };

  const setUserId = async () => {
    const token = await SecureStore.getItemAsync("jwt");
    if (!token) return null;
    const decoded = jwtDecode<JwtPayload>(token);
    await SecureStore.setItemAsync("id", decoded.id);
  };
  const handleRegister = async () => {
    if (!email.trim() || !password || password !== confirmPassword) return;
    try {
      const data = {
        id: "",
        name: name,
        email: email,
        rating: 0,
        bio: "",
        age: 0,
        image: "",
        username: email,
        password: password,
        createdAt: new Date().toISOString(),
      };
      setLoading(true);
      await api.post("auth/register", data);
      // router.push("/login");
      setActiveTab("Login");
    } catch (err) {
      console.error("Registration failed", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>Lookup</Text>
        {/* <View style={{ width: 24 }} /> */}
      </View>
      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity onPress={() => setActiveTab("Login")}>
          <Text
            style={[
              styles.tabText,
              activeTab === "Login" ? styles.tabActive : styles.tabInactive,
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab("Register")}>
          <Text
            style={[
              styles.tabText,
              activeTab === "Register" ? styles.tabActive : styles.tabInactive,
            ]}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>

      {/* Form based on activeTab */}
      {activeTab === "Login" ? (
        <>
          <View style={styles.formGroup}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#a596c5"
              style={styles.input}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.formGroup}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#a596c5"
              secureTextEntry
              style={styles.input}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.formGroup}>
            <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
              <Text style={styles.primaryBtnText}>Login</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.formGroup}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#a596c5"
              style={styles.input}
              onChangeText={setName}
            />
          </View>

          <View style={styles.formGroup}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#a596c5"
              style={styles.input}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.formGroup}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#a596c5"
              secureTextEntry
              style={styles.input}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.formGroup}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#a596c5"
              secureTextEntry
              style={styles.input}
              onChangeText={setConfirmPassword}
            />
          </View>
          <View style={styles.formGroup}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={handleRegister}
            >
              <Text style={styles.primaryBtnText}>Register</Text>
            </TouchableOpacity>
          </View>
          {/* Divider text */}
          <Text style={styles.orText}>Or register with</Text>
          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>
          {/* Forgot Password */}
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </>
      )}
      {/* Tabs */}
      {/* <View style={styles.tabRow}>
        <Text style={styles.tabInactive}>Login</Text>
        <Text style={styles.tabActive}>Register</Text>
      </View> */}
      {/* Form */}
      {/* <View style={styles.formGroup}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#a596c5"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <TextInput
          placeholder="Phone"
          placeholderTextColor="#a596c5"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#a596c5"
          secureTextEntry
          style={styles.input}
        />
      </View> */}
      {/* Register Button */}
      {/* <View style={styles.formGroup}>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Register</Text>
        </TouchableOpacity>
      </View> */}

      {/* Footer Image */}
      {/* <ImageBackground
        source={require("../assets/dark.png")} // change path to your asset
        style={styles.footerImage}
        resizeMode="cover"
      /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171221",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  tabRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#443663",
    paddingHorizontal: 16,
    gap: 32,
  },
  tabActive: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    paddingBottom: 12,
    borderBottomWidth: 3,
    borderBottomColor: "#7a4ae2",
  },
  tabInactive: {
    color: "#a596c5",
    fontWeight: "bold",
    fontSize: 14,
    paddingBottom: 12,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  formGroup: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    backgroundColor: "#302645",
    color: "#fff",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  primaryBtn: {
    backgroundColor: "#7a4ae2",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    color: "#a596c5",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 8,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  socialBtn: {
    flex: 1,
    backgroundColor: "#302645",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  socialText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  forgotText: {
    color: "#a596c5",
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 12,
  },
  footerImage: {
    width: "100%",
    height: 200,
  },

  tabText: { fontSize: 18, fontWeight: "600" },
});
