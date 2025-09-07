import { Ionicons } from "@expo/vector-icons"; // for icons
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppContext } from "./_layout";

const reviews = [
  {
    id: "1",
    name: "Liam Harper",
    time: "2 months ago",
    rating: 4,
    text: "Sophia is an amazing friend, always supportive and kind!",
    avatar: "https://picsum.photos/100?1",
  },
  {
    id: "2",
    name: "Olivia Johnson",
    time: "1 month ago",
    rating: 5,
    text: "She always brings positive energy and makes everyone smile.",
    avatar: "https://picsum.photos/100?2",
  },
  {
    id: "3",
    name: "Ethan Williams",
    time: "3 weeks ago",
    rating: 3,
    text: "Great to hang out with, but sometimes busy with work.",
    avatar: "https://picsum.photos/100?3",
  },
  {
    id: "4",
    name: "Ethan Williams",
    time: "3 weeks ago",
    rating: 3,
    text: "Great to hang out with, but sometimes busy with work.",
    avatar: "https://picsum.photos/100?3",
  },
  {
    id: "5",
    name: "Ethan Williams",
    time: "3 weeks ago",
    rating: 3,
    text: "Great to hang out with, but sometimes busy with work.",
    avatar: "https://picsum.photos/100?3",
  },
  {
    id: "6",
    name: "Ethan Williams",
    time: "3 weeks ago",
    rating: 3,
    text: "Great to hang out with, but sometimes busy with work.",
    avatar: "https://picsum.photos/100?3",
  },
];

export default function RatingScreen() {
  const { user } = useAppContext();

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        {/* <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View> */}

        {/* Profile Info */}
        <View style={styles.profileWrapper}>
          <Image source={{ uri: `${user?.image}` }} style={styles.avatar} />
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.subText}>Joined Since 2021</Text>
        </View>

        {/* Rating */}
        <View style={styles.ratingWrapper}>
          <View>
            <Text style={styles.ratingScore}>{user?.rating}</Text>
            <View style={{ flexDirection: "row" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons
                  key={i}
                  name={i <= 4 ? "star" : "star-outline"}
                  size={18}
                  color="#7B4AE2"
                />
              ))}
            </View>
            <Text style={styles.subText}>120 reviews</Text>
          </View>

          {/* Rating Breakdown */}
          <View style={{ flex: 1, marginLeft: 16 }}>
            {[
              { star: "5", percent: 70 },
              { star: "4", percent: 20 },
              { star: "3", percent: 5 },
              { star: "2", percent: 3 },
              { star: "1", percent: 2 },
            ].map((item, i) => (
              <View key={i} style={styles.progressRow}>
                <Text style={styles.progressLabel}>{item.star}</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressFill, { width: `${item.percent}%` }]}
                  />
                </View>
                <Text style={styles.progressPercent}>{item.percent}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Friendship Details */}
        <Text style={styles.sectionTitle}>Friendship Details</Text>
        <View style={styles.detailsWrapper}>
          <View style={styles.detailCard}>
            <Ionicons name="time" size={22} color="white" />
            <Text style={styles.detailText}>150 Friends</Text>
          </View>
          <View style={styles.detailCard}>
            <Ionicons name="heart" size={22} color="white" />
            <Text style={styles.detailText}>Supportive</Text>
          </View>
          <View style={styles.detailCard}>
            <Ionicons name="happy" size={22} color="white" />
            <Text style={styles.detailText}>Positive</Text>
          </View>
          <View style={styles.detailCard}>
            <Ionicons name="star" size={22} color="white" />
            <Text style={styles.detailText}>Kind</Text>
          </View>
        </View>

        {/* Reviews */}
        <Text style={styles.sectionTitle}>Reviews</Text>
        {reviews.map((item) => (
          <View style={{ padding: 16 }} key={item.id}>
            <View key={item.id} style={styles.reviewCard}>
              <Image
                source={{ uri: item.avatar }}
                style={styles.reviewAvatar}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.reviewName}>{item.name}</Text>
                <Text style={styles.subText}>{item.time}</Text>

                <View style={{ flexDirection: "row", marginTop: 4 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Ionicons
                      key={i}
                      name={i <= item.rating ? "star" : "star-outline"}
                      size={20}
                      color="#7B4AE2"
                    />
                  ))}
                </View>

                <Text style={styles.reviewText}>{item.text}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171221",
    paddingTop: 40,
    marginBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  profileWrapper: { alignItems: "center", marginVertical: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 12 },
  name: { color: "white", fontSize: 22, fontWeight: "bold" },
  subText: { color: "#a596c5", fontSize: 14 },
  ratingWrapper: { flexDirection: "row", padding: 16 },
  ratingScore: { color: "white", fontSize: 36, fontWeight: "bold" },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  progressLabel: { color: "white", width: 16 },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#443663",
    borderRadius: 3,
    marginHorizontal: 6,
  },
  progressFill: {
    height: 6,
    backgroundColor: "#7B4AE2",
    borderRadius: 3,
  },
  progressPercent: {
    color: "#a596c5",
    width: 40,
    textAlign: "right",
    fontSize: 12,
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  detailsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
  detailCard: {
    backgroundColor: "#221b31",
    borderColor: "#443663",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    margin: 6,
  },
  detailText: { color: "white", marginLeft: 8, fontWeight: "bold" },
  reviewCard: { flexDirection: "row", gap: 12 },
  reviewAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  reviewName: { color: "white", fontWeight: "600", fontSize: 16 },
  reviewText: { color: "white", fontSize: 14, marginTop: 6 },
});
