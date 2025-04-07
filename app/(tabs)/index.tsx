import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import React, { useState, useCallback } from 'react';
import { Link, useFocusEffect } from 'expo-router';
import Animated, {SlideInRight } from "react-native-reanimated";

import Button from '@/components/Button';

export default function Index() {
const [key, setKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setKey((prevKey) => prevKey + 1);
    }, [])
    );
  return (
    <View style={styles.container}>
    <Animated.View
            key={key}
            entering={SlideInRight}
            style={styles.animatedContainer}
          >
    <Link href="/material1" asChild>
    <Button theme="level" label="MIPS CPU Design"/>
    </Link>
    <Link href="/material2" asChild>
        <Button theme="level" label="MIPS Instruction Set"/>
        </Link>
    <Link href="/material3" asChild>
        <Button theme="level" label="Datapath"/>
        </Link>
    <Link href="/material4" asChild>
        <Button theme="level" label="Extra Material"/>
        </Link>
    </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25292e',
        },
        animatedContainer: {
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }
    });

