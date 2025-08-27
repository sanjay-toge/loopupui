// app/(tabs)/rate/index.tsx
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RateUser() {
  const router = useRouter();

  const [knownFor, setKnownFor] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("");
  const [nature, setNature] = useState<string>("");

  const goNext = () => {
    // you can pass the selections along if you want:
    // router.push({
    //   pathname: "/rateuser/2",
    //   params: { knownFor, relationship, nature },
    // });
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.iconWrap}>
          <Ionicons name="close" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Rate</Text>
        <View style={styles.iconSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Step + Progress */}
        <View style={styles.stepRow}>
          <Text style={styles.stepText}>Step 1 of 3</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>

        <Text style={styles.sectionTitle}>Friendship Details</Text>

        {/* Select 1 */}
        <View style={styles.fieldWrap}>
          <View style={styles.selectBox}>
            <Picker
              selectedValue={knownFor}
              onValueChange={(v) => setKnownFor(v)}
              dropdownIconColor="#a596c5"
              style={styles.picker}
            >
              <Picker.Item label="How long have you known this person?" value="" color="#a596c5" />
              <Picker.Item label="Less than 6 months" value="lt6m" />
              <Picker.Item label="6–12 months" value="6to12" />
              <Picker.Item label="1–3 years" value="1to3" />
              <Picker.Item label="3–5 years" value="3to5" />
              <Picker.Item label="5+ years" value="5plus" />
            </Picker>
          </View>
        </View>

        {/* Select 2 */}
        <View style={styles.fieldWrap}>
          <View style={styles.selectBox}>
            <Picker
              selectedValue={relationship}
              onValueChange={(v) => setRelationship(v)}
              dropdownIconColor="#a596c5"
              style={styles.picker}
            >
              <Picker.Item label="What is your relationship with this person?" value="" color="#a596c5" />
              <Picker.Item label="Friend" value="friend" />
              <Picker.Item label="Colleague" value="colleague" />
              <Picker.Item label="Family" value="family" />
              <Picker.Item label="Acquaintance" value="acquaintance" />
              <Picker.Item label="Classmate" value="classmate" />
            </Picker>
          </View>
        </View>

        {/* Select 3 */}
        <View style={styles.fieldWrap}>
          <View style={styles.selectBox}>
            <Picker
              selectedValue={nature}
              onValueChange={(v) => setNature(v)}
              dropdownIconColor="#a596c5"
            >
              <Picker.Item label="What is the nature of your friendship?" value="" color="#a596c5" />
              <Picker.Item label="Casual" value="casual" />
              <Picker.Item label="Close" value="close" />
              <Picker.Item label="Best friends" value="best" />
              <Picker.Item label="Mentor/Mentee" value="mentor" />
              <Picker.Item label="On-and-off" value="onoff" />
            </Picker>
          </View>
        </View>
      </ScrollView>

      {/* Footer / Next */}
      <View style={styles.footer}>
        <Pressable style={styles.nextBtn} onPress={goNext}>
          <Text style={styles.nextText}>Next</Text>
        </Pressable>
      </View>
      <View style={{ height: 20, backgroundColor: "#171221" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#171221",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#171221",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    justifyContent: "space-between",
  },
  iconWrap: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSpacer: {
    width: 48, // keeps title centered
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  stepText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  progressTrack: {
    backgroundColor: "#443663",
    borderRadius: 8,
    height: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  progressFill: {
    height: "100%",
    width: "33%",
    backgroundColor: "#7a4ae2",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 12,
    marginBottom: 8,
  },
  fieldWrap: {
    maxWidth: 480,
    width: "100%",
    marginVertical: 6,
  },
  selectBox: {
    backgroundColor: "#302645",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  picker: {
    color: "#fff",
    width: "100%",
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  nextBtn: {
    backgroundColor: "#7a4ae2",
    borderRadius: 12,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  nextText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.15,
  },
});
