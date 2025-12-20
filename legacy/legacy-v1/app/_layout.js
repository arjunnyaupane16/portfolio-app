import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // ✅ Hides the entire header including the 'index' title
      }}
    />
  );
}

