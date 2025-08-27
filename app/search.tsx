// SearchScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";

const profiles = [
  {
    name: "Ethan Carter",
    desc: "Known for honesty",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwPMUDYVbZNE7izNV3cCW5W19YgdxdONEsbTzPyyxX3WEpUEaHq9YcumRxbCg2zcKy3Y0v9-Q351BzQg8NlI3xfjfR6CTrR6I4Vp15h7s7MhtKfnLRWGFZf6XyXXryKG1n-Ai6Sh2qn9k-GPqyoPDKhNIoTLSA01KuE-nZ_90F8WQXKm4UJTy1r_74uLa9cQF3tdWv0nfhs-uI2i-Bv_vMXxUl5oSbOK4FONcqDKVEJGbHSDmxhKFN0BMMPgR-wOR5PyoODahZq9U",
  },
  {
    name: "Sophia Bennett",
    desc: "Always reliable",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQyb0Zgn2y47R5cuH-5MhGwnljPet-Bhk4dv0XhztS2DcaJED46_F-1fqW4aCNPnzPtbmpSDfmb5Yx8eIT1g5Wh5_kvE8vbHPY3sDY91jCC92S0nHRnbffyG7TmCxAHmuPEFMPbcPqZxkGFMgJ1pZnK4L8i5dTREcYY3QoACjeq4kFygIlL7b69hCuVVfyKiNsvNR7W4sktPNSri6033ZVMrJlT0w4Y3RoKOfR6cUJ1Ud0mLe9_JkWWK8miFdoIL0_DizvpeiALak",
  },
  {
    name: "Liam Harper",
    desc: "Great sense of humor",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfiUl67tJzbDz4Yopm5ptLMrSmTBqscKp4SFfueMFyegHwld12I660_X811fOp-brvylp7qDqCTn9HiN8mivyJP_Hc1d8KO6-n4Xwh3GPWnPeQAIi45WZVqu-jz3JE89YJh9vEx6tmVUofh73DgtY3BxJJcGFce7sI4i2aFquxxok_rNWS5ET8jYTOcAuAMBG-mgHL-MQxqwOWZUAVS86ycexYdSxOdNTWEGA1UTs8tpPsyACXKIPI1MeedGLNLF8TstmB1-pOnAA",
  },
  {
    name: "Olivia Hayes",
    desc: "Incredibly supportive",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdaAtj0_-7EquLD5jn3rs6eT5XWa6Gi6RRdpQwYjJ1mlPEXsUBSi-dGequ5IdEHNMvARSEBEcQRMZYm80v76-Yv8qbMyX8E_AJAqW58oJ2t_fnzewL_uJYTmkUmlfJfscyTryEDOeswCvfKNLtSYFZzvwboF1yWeHes9r5ZI2lHdtdlXssajAHrqPZTlSq6-siQ1xUCoNIBJeQR0pOn-p4w7UEGrID6R5NdIZW2pK6jxqdZ6oCxpGNrKK6y1eV7GNK2lCGklsx9XY",
  },
  // ... add rest of profiles here
];

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Search</Text>
        <View style={{ width: 24 }} /> {/* spacer */}
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="People"
          placeholderTextColor="#a596c5"
          style={styles.searchInput}
        />
        <TouchableOpacity>
          <Text style={styles.clearBtn}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Profiles List */}
      <ScrollView>
        {profiles.map((p, i) => (
          <View key={i} style={styles.profileRow}>
            <View style={styles.profileInfo}>
              <Image source={{ uri: p.img }} style={styles.avatar} />
              <View>
                <Text style={styles.name}>{p.name}</Text>
                <Text style={styles.desc}>{p.desc}</Text>
              </View>
            </View>
            <View style={styles.statusDot} />
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconInactive}>🏠</Text>
          <Text style={styles.navTextInactive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>🔍</Text>
          <Text style={styles.navTextActive}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconInactive}>⭐</Text>
          <Text style={styles.navTextInactive}>My Ratings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconInactive}>🔔</Text>
          <Text style={styles.navTextInactive}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconInactive}>⚙️</Text>
          <Text style={styles.navTextInactive}>Settings</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#171221", paddingTop: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  icon: { color: "white", fontSize: 20 },
  title: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 24,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#302645",
    borderRadius: 12,
    margin: 16,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  searchInput: { flex: 1, color: "white", fontSize: 16 },
  clearBtn: { color: "#a596c5", fontSize: 20, paddingHorizontal: 6 },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#302645",
  },
  profileInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
  name: { color: "white", fontSize: 16, fontWeight: "600" },
  desc: { color: "#a596c5", fontSize: 14 },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0bda6f",
    marginRight: 8,
  },
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#302645",
    backgroundColor: "#221b31",
    paddingVertical: 8,
    justifyContent: "space-around",
  },
  navItem: { alignItems: "center" },
  navIconActive: { color: "white", fontSize: 20 },
  navIconInactive: { color: "#a596c5", fontSize: 20 },
  navTextActive: { color: "white", fontSize: 12 },
  navTextInactive: { color: "#a596c5", fontSize: 12 },
});
