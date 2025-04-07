import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Link, useLocalSearchParams, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import Animated, { SlideInRight } from 'react-native-reanimated';

import Button from '@/components/Button';

export default function Complete() {
  const { correctCount, wrongCount } = useLocalSearchParams();

  const [key, setKey] = useState(0);

              useFocusEffect(
                useCallback(() => {
                  setKey((prevKey) => prevKey + 1);
                }, [])
                );

  return (
    <View style={styles.container}>
      <Animated.View key={key} entering={SlideInRight} style={styles.animatedContainer}>
        <Text style={styles.title}>🎉 Well Done! 🎉</Text>
        <Text style={styles.resultText}>✅ Correct: {correctCount}</Text>
        <Text style={styles.resultText}>❌ Mistakes: {wrongCount}</Text>

        <Link href="./" asChild>
          <Button theme="next" label="Continue"/>
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
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
});