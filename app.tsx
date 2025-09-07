// app/_app.tsx
import { ExpoRoot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App(props: any) {
  return (
    <SafeAreaProvider>
      <ExpoRoot {...props} />
    </SafeAreaProvider>
  );
}
