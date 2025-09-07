// app/(tabs)/rate/index.tsx
import { api } from "@/api/api";
import { Rating } from "@/types/rating";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function RateUser() {
  // const { user, existingRating } = useLocalSearchParams();
  // const ratedUser = user ? JSON.parse(user as string) : null;
  // const existingRatingData = existingRating
  //   ? JSON.parse(existingRating as string)
  //   : null;
  // console.log("existing data : " + JSON.stringify(existingRatingData));
  // console.log("user data : " + user);
  const params = useLocalSearchParams();
  const ratedUser = params.user ? JSON.parse(params.user as string) : null;
  const existingRating = params.existingRating
    ? JSON.parse(params.existingRating as string)
    : null;
  // console.log("user data" + ratedUser);
  console.log("exisignrating :" + JSON.stringify(existingRating));
  const router = useRouter();
  let natureData = "";
  if (!existingRating?.relation) {
    natureData = "stranger";
  } else {
    natureData = "not-a-stranger";
  }
  const [knownFor, setKnownFor] = useState<number | null>(
    existingRating?.knownSince || null
  );
  const [relationship, setRelationship] = useState<string | null>(
    existingRating?.relation || null
  );
  const [nature, setNature] = useState<string | null>(natureData || null);
  const [rating, setRating] = useState<number | null>(
    existingRating?.score || null
  );
  const [feedbackValue, setFeedbackValue] = useState(
    existingRating?.comment || null
  );

  const knownForOptions = [
    { label: "Less than 6 months", value: 6 },
    { label: "6–12 months", value: 12 },
    { label: "1–3 years", value: 36 },
    { label: "3–5 years", value: 60 },
    { label: "5+ years", value: 100 },
  ];

  const relationshipOptions = [
    { label: "Friend", value: "friend" },
    { label: "Colleague", value: "colleague" },
    { label: "Family", value: "family" },
    { label: "Acquaintance", value: "acquaintance" },
    { label: "Classmate", value: "classmate" },
  ];

  const natureOptions = [
    { label: "Casual", value: "casual" },
    { label: "Close", value: "close" },
    { label: "Best friends", value: "best" },
    { label: "Mentor/Mentee", value: "mentor" },
    { label: "On-and-off", value: "onoff" },
  ];

  const feedbackOptions = [
    // ✅ Positive Traits
    { label: "Helpful in teamwork", value: "helpful_teamwork" },
    { label: "Always punctual", value: "always_punctual" },
    { label: "Communicates clearly", value: "communicates_clearly" },
    { label: "Keeps commitments", value: "keeps_commitments" },
    { label: "Shows leadership qualities", value: "leadership" },
    { label: "Supportive and encouraging", value: "supportive" },
    { label: "Shares knowledge willingly", value: "knowledge_sharing" },
    { label: "Brings positive energy to the group", value: "positive_energy" },
    { label: "Honest and transparent", value: "honest_transparent" },
    { label: "Handles conflict gracefully", value: "conflict_resolution" },

    // 🔄 Constructive Feedback
    { label: "Needs to improve punctuality", value: "improve_punctuality" },
    {
      label: "Should work on communication skills",
      value: "improve_communication",
    },
    {
      label: "Could be more proactive in problem-solving",
      value: "proactive_problem_solving",
    },
    { label: "Needs to manage deadlines better", value: "deadline_management" },
    {
      label: "Could improve teamwork participation",
      value: "improve_teamwork",
    },
    { label: "Should work on listening skills", value: "improve_listening" },
    {
      label: "Needs to handle criticism more constructively",
      value: "handle_criticism",
    },
    {
      label: "Should focus on consistency in work",
      value: "improve_consistency",
    },
    { label: "Needs to be more open to feedback", value: "open_to_feedback" },
    { label: "Should work on managing stress", value: "stress_management" },
  ];

  const relationshipTypes = [
    { label: "Yes, I know them", value: "not-a-stranger" },
    { label: "No, they are a stranger", value: "stranger" },
  ];

  const submitRating = async () => {
    const id = await SecureStore.getItemAsync("id");
    if (!id) return null;
    if (!rating) return null;
    // if (!relationship) return null;
    // if (!knownFor) return null;
    if (!feedbackValue) return null;
    const data: Rating = {
      id: "",
      ratedUserId: ratedUser.id,
      raterUserId: id,
      score: rating,
      comment: feedbackValue,
      relation: relationship || "",
      knownSince: knownFor || 0,
      createdAt: new Date().toISOString(), // UTC
      updatedAt: new Date().toISOString(), // UTC
    };
    console.log("dataasasas" + JSON.stringify(data));
    const response = await api.post(`Ratings/request`, data);
    if (!response) return null;
    router.push("/ratingsucess");

    // const response = await api.post(`http://localhost:5261/api/Ratings`);

    // setNearbyUsers(response); // ✅ Save to state
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.iconWrap}
        >
          <Ionicons name="close" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Rate {ratedUser.username}</Text>
        <View style={styles.iconSpacer} />
      </View>
      {/* <View style={styles.content}>
        <View style={styles.stepRow}>
          <Text style={styles.stepText}>
            Step {step} of {totalSteps}
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${(step / totalSteps) * 100}%` }, // dynamic width
            ]}
          />
        </View>
      </View> */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Do you know this person?</Text>
        <View style={styles.ratingRow}>
          {relationshipTypes.map((relationshipType) => (
            <TouchableOpacity
              key={relationshipType.value}
              onPress={() => {
                setRelationship(null);
                setKnownFor(null);
                
                setNature(relationshipType.value);
              }}
              style={[
                styles.ratingButton,
                nature === relationshipType.value &&
                  styles.ratingButtonSelected,
              ]}
            >
              <Text style={styles.ratingText}>{relationshipType.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {nature === "not-a-stranger" && (
          <>
            <Text style={styles.title}>
              How long have you known this person?
            </Text>
            <View style={styles.fieldWrap}>
              <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemContainerStyle={styles.itemContainerStyle}
                itemTextStyle={styles.itemTextStyle}
                activeColor="#5a3ea6"
                data={knownForOptions}
                labelField="label"
                valueField="value"
                placeholder="How long have you known this person?"
                value={knownFor}
                onChange={(item) => setKnownFor(item.value)}
              />
            </View>

            <Text style={styles.title}>
              What is your relationship with this person?
            </Text>
            <View style={styles.fieldWrap}>
              <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemContainerStyle={styles.itemContainerStyle}
                itemTextStyle={styles.itemTextStyle}
                activeColor="#5a3ea6" // highlighted background
                data={relationshipOptions}
                labelField="label"
                valueField="value"
                placeholder="What is your relationship with this person?"
                value={relationship}
                onChange={(item) => setRelationship(item.value)}
              />
            </View>
          </>
        )}
        <Text style={styles.title}>Behaviour feedback?</Text>
        <View style={styles.fieldWrap}>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemTextStyle}
            itemContainerStyle={styles.itemContainerStyle}
            activeColor="#5a3ea6"
            data={feedbackOptions}
            labelField="label"
            valueField="value"
            placeholder="Behaviour feedback?"
            value={feedbackValue}
            onChange={(item) => setFeedbackValue(item.value)}
          />
        </View>
        <Text style={styles.title}>Overall rating</Text>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              onPress={() => setRating(num)}
              style={[
                styles.ratingButton,
                rating === num && styles.ratingButtonSelected,
              ]}
            >
              <Text style={styles.ratingText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dropdown 3 */}

        {/* <View style={styles.fieldWrap}>
            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
              activeColor="#5a3ea6"
              data={natureOptions}
              labelField="label"
              valueField="value"
              placeholder="What type of friendship do you share?"
              value={nature}
              onChange={(item) => setNature(item.value)}
            />
          </View> */}
      </ScrollView>
      {/* {step === 1 && (
        
      )}
      {(step === 2 || step === 1) && (
        <ScrollView contentContainerStyle={styles.content}></ScrollView>
      )} */}
      {/* Footer / Next */}
      {/* <View style={styles.footer}>
        <Pressable
          style={[
            styles.nextBtn,
            !(knownFor && relationship && nature) && { opacity: 0.5 },
          ]}
          disabled={!(knownFor && relationship && nature)}
          onPress={goNext}
        >
          <Text style={styles.nextText}>Next</Text>
        </Pressable>
      </View> */}
      <View style={styles.footer}>
        <Pressable
          style={[
            styles.nextBtn,
            !(rating && feedbackValue && nature) && { opacity: 0.5 },
          ]}
          onPress={() => submitRating()}
          disabled={!(rating && feedbackValue && nature)}
        >
          <Text style={styles.nextText}>Rate</Text>
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
    width: 48,
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
    marginBottom: 8,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 18,
    marginBottom: 8,
  },
  fieldWrap: {
    maxWidth: 480,
    width: "100%",
    marginVertical: 6,
    backgroundColor: "#302645",
    borderRadius: 12,
  },
  dropdown: {
    backgroundColor: "#302645",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 12,
  },
  placeholderStyle: {
    color: "#a596c5",
    fontSize: 14,
  },
  selectedTextStyle: {
    color: "#fff",
    fontSize: 14,
  },
  itemTextStyle: {
    color: "#fff",
    fontSize: 14,
  },
  itemContainerStyle: {
    borderRadius: 14,
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
  backBtn: {
    marginBottom: 20,
    backgroundColor: "#545357ff",
    borderRadius: 12,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.15,
  },
  dropdownContainer: {
    backgroundColor: "#302645",
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingTop: 16,
    paddingBottom: 16,
  },
  ratingButton: {
    borderWidth: 1,
    borderColor: "#443d51",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingButtonSelected: {
    borderWidth: 3,
    borderColor: "#7b4be2",
    paddingHorizontal: 14,
  },
  ratingText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});
