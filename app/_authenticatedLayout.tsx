import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const token = await SecureStore.getItemAsync("jwt");
      if (!token) {
        router.replace("/authenticate");
      } else {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
