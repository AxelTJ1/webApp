import { Tabs, useSegments } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { Font } from 'expo-font';

export default function TabLayout() {
const [fontsLoaded] = useFonts({
    Ionicons: require('./assets/fonts/Ionicons.ttf'),
  });

    const segments = useSegments();
    const hiddenRoutes = ['material1','quiz1', 'material2','quiz2', 'material3','quiz3', 'material4','quiz4', 'complete'];
    const isTabBarHidden = segments.some(segment => hiddenRoutes.includes(segment));

    if (!fontLoaded) {
        return null;
      }

  return (
      <Tabs screenOptions={{
          tabBarActiveTintColor: '#00008b',
          headerStyle: {backgroundColor: '#25292e',},
          headerShadowVisible: false,
          headerTintColor: 'white',
          tabBarStyle: {backgroundColor: '#add8e6', display: isTabBarHidden ? 'none' : 'flex',},
      }}>

        <Tabs.Screen name="index" options={{
            headerTitle: "",
            headerTitleAlign: 'center',
            tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />),
            }}/>

        <Tabs.Screen name="about" options={{
            headerTitle: "",
            headerTitleAlign: 'center',
            tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24}/>),
            }}/>

        <Tabs.Screen name="material1" options={{
                    headerTitle: "",
                    headerTitleAlign: 'center',
                    href: null,
                    }}/>

        <Tabs.Screen name="quiz1" options={{
            headerTitle: "",
            headerTitleAlign: 'center',
            href: null,
            }}/>

        <Tabs.Screen name="material2" options={{
                            headerTitle: "",
                            headerTitleAlign: 'center',
                            href: null,
                            }}/>

                <Tabs.Screen name="quiz2" options={{
                    headerTitle: "",
                    headerTitleAlign: 'center',
                    href: null,
                    }}/>

        <Tabs.Screen name="material3" options={{
                            headerTitle: "",
                            headerTitleAlign: 'center',
                            href: null,
                            }}/>

                <Tabs.Screen name="quiz3" options={{
                    headerTitle: "",
                    headerTitleAlign: 'center',
                    href: null,
                    }}/>

        <Tabs.Screen name="material4" options={{
                            headerTitle: "",
                            headerTitleAlign: 'center',
                            href: null,
                            }}/>

                <Tabs.Screen name="quiz4" options={{
                    headerTitle: "",
                    headerTitleAlign: 'center',
                    href: null,
                    }}/>

                <Tabs.Screen name="complete" options={{
                                    headerTitle: "",
                                    headerTitleAlign: 'center',
                                    href: null,
                                    }}/>

      </Tabs>
      );
}