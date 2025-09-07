import { Tabs } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";

import { api } from "@/api/api";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { User } from "@/types/user";
import * as SecureStore from "expo-secure-store";
import AuthenticatedLayout from "../_authenticatedLayout";

type AppContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error("useAppContext must be used within AppContext.Provider");
  return ctx;
}
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);
  const fetchUserDetails = async () => {
    const id = await SecureStore.getItemAsync("id");
    if (!id) return null;
    const response: User = await api.get(`user/${id}`);
    // console.log(JSON.stringify(response));
    setUser(response);
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <AuthenticatedLayout>
      <AppContext.Provider value={{ user, setUser }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: {
              ...Platform.select({
                ios: {
                  position: "absolute",
                },
                default: {},
              }),
              height: 60, // ✅ height inside tabBarStyle
              paddingBottom: 5, // optional, to reduce extra padding
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="house.fill" color={color} />
              ),
            }}
          />
          {/* <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="magnifyingglass" color={color} />
          ),
        }}
      /> */}
          <Tabs.Screen
            name="rating"
            options={{
              title: "My Rating",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="star" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="setting"
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="gear" color={color} />
              ),
            }}
          />
        </Tabs>
      </AppContext.Provider>
    </AuthenticatedLayout>
  );
}
