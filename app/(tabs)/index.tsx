// LookupScreen.js
import { api } from "@/api/api";
import { RecentRating } from "@/types/recentrating";
import { User } from "@/types/user";
import { formatDistanceToNow } from "date-fns";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "./_layout";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [nearbyUsers, setNearbyUsers] = useState<User[]>([]); // ✅ state for API data
  const [recentRatedUsers, setRecentRatedUsers] = useState<RecentRating[]>([]); // ✅ state for API data
  const [peopleIRated, setPeopleIRated] = useState<number>(0);
  const [peopleRatedMe, setPeopleRatedMe] = useState<number>(0);
  // const [me, setMe] = useState<User>();
  const { user } = useAppContext();

  // const allUsers = [];
  const allUsers = [
    {
      name: "Sophia",
      desc: "Rated 2 days ago",
      img: "https://picsum.photos/200?random=1",
    },
    {
      name: "Ethan",
      desc: "Rated 3 days ago",
      img: "https://picsum.photos/200?random=2",
    },
    {
      name: "Olivia",
      desc: "Rated 4 days ago",
      img: "https://picsum.photos/200?random=3",
    },
    {
      name: "Liam",
      desc: "Rated 5 days ago",
      img: "https://picsum.photos/200?random=4",
    },
    {
      name: "Noah",
      desc: "1 mutual friend",
      img: "https://picsum.photos/200?random=5",
    },
    {
      name: "Ava",
      desc: "2 mutual friends",
      img: "https://picsum.photos/200?random=6",
    },
    {
      name: "Jackson",
      desc: "3 mutual friends",
      img: "https://picsum.photos/200?random=7",
    },
    {
      name: "Isabella",
      desc: "4 mutual friends",
      img: "https://picsum.photos/200?random=8",
    },
  ];
  const fetchSuggestedProfiles = async () => {
    // console.log("fetching suggested profiles");
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // console.log("📍 Current Location:", latitude, longitude);

      const response: User[] = await api.get(
        `location/nearby?latitude=${latitude}&longitude=${longitude}&radiusKm=5000`
      );

      // console.log("Nearby users:", response);
      setNearbyUsers(response); // ✅ Save to state
    } catch (error) {
      console.error("Error getting suggested profiles:", error);
    }
  };

  const fetchRecentRatedProfiles = async () => {
    try {
      const response: RecentRating[] = await api.get(
        `Ratings/recent-given?limit=10`
      );
      setRecentRatedUsers(response);
      // console.log(recentRatedUsers);
    } catch (error) {
      console.error("Error getting suggested profiles:", error);
    }
  };

  // const fetchUserDetails = async () => {
  //   const id = await SecureStore.getItemAsync("id");
  //   if (!id) return null;
  //   const response: User = await api.get(`user/${id}`);
  //   // setMe(response);
  // };

  const fetchCount = async () => {
    fetchPeopleIRated();
    fetchPeopleRatedMe();
  };

  const fetchPeopleRatedMe = async () => {
    const response: any = await api.get("Ratings/unique-raters-count");
    setPeopleRatedMe(response?.count);
  };
  const fetchPeopleIRated = async () => {
    const response: any = await api.get("Ratings/count");
    setPeopleIRated(response?.count);
  };

  // ✅ Fetch on screen load
  useEffect(() => {
    fetchSuggestedProfiles();
    fetchRecentRatedProfiles();
    // fetchUserDetails();
    fetchCount();
  }, []);
  // ✅ derive filtered nearby users
  const filteredNearbyUsers = useMemo(() => {
    const ratedUserIds = new Set(recentRatedUsers.map((r) => r.ratedUserId));
    return nearbyUsers.filter((user) => !ratedUserIds.has(user.id));
  }, [nearbyUsers, recentRatedUsers]);
  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lookup</Text>
        <TouchableOpacity>
          <Text style={styles.icon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Search people..."
          placeholderTextColor="#a596c5"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* If searching, show results */}
      {searchText.length > 0 ? (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.searchResultRow}>
              <Image source={{ uri: item.img }} style={styles.searchAvatar} />
              <View>
                <Text style={styles.searchName}>{item.name}</Text>
                <Text style={styles.searchDesc}>{item.desc}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Stats */}
          <View style={styles.statsWrapper}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{user?.rating}</Text>
              <Text style={styles.statLabel}>My Rating Score</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{peopleRatedMe}</Text>
              <Text style={styles.statLabel}>People Rated Me</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{peopleIRated}</Text>
              <Text style={styles.statLabel}>People I Rated</Text>
            </View>
          </View>

          {/* Recent Ratings */}
          <Text style={styles.sectionTitle}>Recent Ratings</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentRatedUsers.map((data, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  router.navigate(`/guest-user?userId=${data.ratedUserId}`);
                }}
              >
                <View style={styles.profileCard} key={i}>
                  <Image
                    style={styles.profileImage}
                    source={{
                      uri: data.image,
                    }}
                  />
                  <Text style={styles.profileName}>{data.name}</Text>
                  <Text style={styles.profileSub}>
                    Rated{" "}
                    {formatDistanceToNow(new Date(data.createdAt), {
                      addSuffix: true,
                    })}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Suggested Profiles */}
          <Text style={styles.sectionTitle}>Suggested Profiles</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredNearbyUsers.map((user, i) => (
              <TouchableOpacity
                onPress={() =>
                  router.navigate({
                    pathname: "/rateuser",
                    params: { user: JSON.stringify(user) },
                  })
                }
                key={user.id || i}
              >
                <View style={styles.profileCard}>
                  <Image
                    style={styles.profileImage}
                    source={{
                      uri: user.image,
                    }}
                  />
                  <Text style={styles.profileName}>{user.name}</Text>
                  <Text style={styles.profileSub}>
                    {user.rating} mutual rating
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Qualities */}
          <Text style={styles.sectionTitle}>
            Most Appreciated Qualities This Week
          </Text>
          <View style={styles.qualitiesWrapper}>
            {[
              "Kindness",
              "Honesty",
              "Reliability",
              "Humor",
              "Supportiveness",
            ].map((q, i) => (
              <View style={styles.qualityTag} key={i}>
                <Text style={styles.qualityText}>{q}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#171221", paddingTop: 40 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  icon: { color: "#FFFFFF", fontSize: 20 },
  searchWrapper: { paddingHorizontal: 16, marginBottom: 12 },
  searchInput: {
    backgroundColor: "#302645",
    color: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  // Search result styling
  searchResultRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#302645",
  },
  searchAvatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  searchName: { color: "white", fontSize: 16, fontWeight: "600" },
  searchDesc: { color: "#a596c5", fontSize: 14 },
  // Rest of your styles stay same...
  statsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#221b31",
    borderWidth: 1,
    borderColor: "#443663",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statNumber: { color: "white", fontSize: 20, fontWeight: "bold" },
  statLabel: { color: "#a596c5", fontSize: 12 },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  profileCard: { marginRight: 12, width: 100, alignItems: "center" },
  profileImage: { width: 100, height: 100, borderRadius: 12, marginBottom: 8 },
  profileName: { color: "white", fontSize: 14, fontWeight: "500" },
  profileSub: { color: "#a596c5", fontSize: 12 },
  qualitiesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  qualityTag: {
    backgroundColor: "#302645",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  qualityText: { color: "white", fontSize: 12 },
});
