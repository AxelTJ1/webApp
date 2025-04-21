import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';

// The RootLayout sets up the overall layout for the app
export default function RootLayout() {
  return (
      <>
        <StatusBar style='light' />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </>
  );
}
