// app/profile.tsx
import { api } from "@/api/api";
import { User } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function GuestUserPage() {
  const { userId } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Profile");
  const [user, setUser] = useState<User>();
  const [exisitingRating, setExisitingRating] = useState();
  useEffect(() => {
    fetchUserProfile();
    fetchExistingRating();
  }, []);

  const fetchUserProfile = async () => {
    const response: User = await api.get(`User/${userId}`);
    // console.log("fetchedUserProfile:" + JSON.stringify(response));
    setUser(response);
  };

  const fetchExistingRating = async () => {
    const response: any = await api.get(`Ratings/check/${userId}`);
    // console.log("Data : " + JSON.stringify(response));
    if (response.message === "No rating found") return null;
    setExisitingRating(response);
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{user?.name}</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Avatar + Info */}
        <View style={styles.centered}>
          <ImageBackground
            source={{
              uri: `${user?.image}`,
            }}
            style={styles.avatar}
            imageStyle={{ borderRadius: 64 }}
          />
          <Text style={styles.name}>{user?.name}</Text>
          {/* <Text style={styles.rating}>★ {user?.rating} Rating</Text> */}
          <Text style={styles.description}>{user?.bio}</Text>
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

        {/* Buttons */}
        <View style={styles.buttons}>
          {/* <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryText}>Connect</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => {
              router.navigate({
                pathname: "/rateuser",
                params: {
                  user: JSON.stringify(user),
                  existingRating: JSON.stringify(exisitingRating),
                },
              });
            }}
          >
            <Text style={styles.secondaryText}>
              {exisitingRating ? "Edit Rating" : "Rate as stranger"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Rating */}
        {/* <View style={styles.ratingWrapper}>
          <View>
            <Text style={styles.ratingScore}>4.8</Text>
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
          </View> */}

        {/* Rating Breakdown */}
        {/* <View style={{ flex: 1, marginLeft: 16 }}>
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
        </View> */}

        {/* Tabs */}
        <View style={styles.tabRow}>
          {/* {["Profile", "Activity", "Friends"].map((tab) => ( */}
          {["Profile"].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab ? styles.tabActive : null,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.content}>
          {activeTab === "Profile" && (
            <View>
              {/* <Text style={styles.contentText}>This is the Profile tab</Text> */}

              {/* Stats */}
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Ratings</Text>
                  <Text style={styles.statValue}>2k</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Friends</Text>
                  <Text style={styles.statValue}>1k</Text>
                </View>
              </View>
            </View>
          )}

          {activeTab === "Activity" && (
            <View>
              <Text style={styles.contentText}>This is the Activity tab</Text>
            </View>
          )}

          {activeTab === "Friends" && (
            <View>
              <Text style={styles.contentText}>This is the Friends tab</Text>
            </View>
          )}
        </View>

        {/* <View style={styles.tabRow}>
          <Text style={[styles.tabText, styles.tabActive]}>Profile</Text>
          <Text style={styles.tabText}>Activity</Text>
          <Text style={styles.tabText}>Friends</Text>
        </View> */}

        {/* Stats */}
        {/* <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Ratings</Text>
            <Text style={styles.statValue}>2k</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Friends</Text>
            <Text style={styles.statValue}>1k</Text>
          </View>
        </View> */}
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="#a79fb7" />
          <Text style={styles.navTextInactive}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="star" size={24} color="#a79fb7" />
          <Text style={styles.navTextInactive}>My Ratings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="notifications" size={24} color="#a79fb7" />
          <Text style={styles.navTextInactive}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings" size={24} color="#a79fb7" />
          <Text style={styles.navTextInactive}>Settings</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#131217", paddingTop: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  centered: { alignItems: "center", padding: 20 },
  avatar: { width: 128, height: 128, marginBottom: 16 },
  name: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  rating: { color: "#fff", fontSize: 22, marginTop: 4 },
  subText: { color: "#a79fb7", fontSize: 14, marginTop: 4 },
  description: {
    color: "#a79fb7",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttons: {
    flexDirection: "row", // arrange children side by side
    justifyContent: "space-between", // add spacing between them
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  primaryBtn: {
    flex: 1, // let both buttons share available width
    backgroundColor: "#7b4be2",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 8, // space between buttons
  },
  primaryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: "#2e2a37",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryText: {
    color: "#fff",
    fontWeight: "bold",
  },

  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: "#443d51",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 12,
    color: "#a79fb7",
  },
  tabActive: { color: "#fff", borderBottomColor: "#fff", borderBottomWidth: 2 },
  statsRow: { flexDirection: "row", padding: 16, gap: 12 },
  statBox: {
    flex: 1,
    backgroundColor: "#2e2a37",
    borderRadius: 12,
    padding: 16,
  },
  statLabel: { color: "#fff", fontSize: 14 },
  statValue: { color: "#fff", fontSize: 20, fontWeight: "bold", marginTop: 4 },
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#2e2a37",
    backgroundColor: "#1f1d26",
    paddingVertical: 6,
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: { alignItems: "center", flex: 1 },
  navText: { color: "#fff", fontSize: 12, marginTop: 2 },
  navTextInactive: { color: "#a79fb7", fontSize: 12, marginTop: 2 },
  content: {
    marginTop: 20,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
  },
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
});
