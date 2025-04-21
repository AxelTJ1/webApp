import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import Animated, { SlideInRight } from "react-native-reanimated";

// Custom button component
import Button from '@/components/Button';

// The About screen displays user progress, references, and CC license
export default function About() {
// State variables to track completion and scores for quizzes
  const [key, setKey] = useState(0);
  const [quiz1Completed, setQuiz1Completed] = useState(false);
  const [quiz2Completed, setQuiz2Completed] = useState(false);
  const [quiz3Completed, setQuiz3Completed] = useState(false);
  const [score1, setScore1] = useState({ correct: 0, wrong: 0 });
  const [score2, setScore2] = useState({ correct: 0, wrong: 0 });
  const [score3, setScore3] = useState({ correct: 0, wrong: 0 });

// useFocusEffect runs the effect when the screen is opened
  useFocusEffect(
      useCallback(() => {
      // Check completion and scores for Quiz 1
        const checkQuiz1Completion = async () => {
          const completed1 = await AsyncStorage.getItem('quiz1Completed');
          setQuiz1Completed(completed1 === 'true');

          const savedScore1 = await AsyncStorage.getItem('quiz1Score');
          if (savedScore1) {
            setScore1(JSON.parse(savedScore1));
          }
        };

        // Check completion and scores for Quiz 2
        const checkQuiz2Completion = async () => {
                  const completed2 = await AsyncStorage.getItem('quiz2Completed');
                  setQuiz2Completed(completed2 === 'true');

                  const savedScore2 = await AsyncStorage.getItem('quiz2Score');
                  if (savedScore2) {
                    setScore2(JSON.parse(savedScore2));
                  }
                };

        // Check completion and scores for Quiz 3
        const checkQuiz3Completion = async () => {
                          const completed3 = await AsyncStorage.getItem('quiz3Completed');
                          setQuiz3Completed(completed3 === 'true');

                          const savedScore3 = await AsyncStorage.getItem('quiz3Score');
                          if (savedScore3) {
                            setScore3(JSON.parse(savedScore3));
                          }
                        };

        checkQuiz1Completion();
        checkQuiz2Completion();
        checkQuiz3Completion();
        setKey((prevKey) => prevKey + 1);
      }, [])
    );

  return (
      <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Animated.View key={key} entering={SlideInRight} style={styles.animatedContainer}>
          <Text style={styles.title}>Current Progress</Text>

          <View style={styles.progressContainer}>
            <Text style={styles.text}>MIPS CPU Design:</Text>
            <Text style={styles.progressText}>
              {quiz1Completed ? '✅ Done' : '❌ Not completed'}
            </Text>

            <Text style={styles.text}>Score:</Text>
            <Text style={styles.scoreText}>
              Correct: {score1.correct} | Mistakes: {score1.wrong}
            </Text>

            <Text></Text>
            <Text style={styles.text}>MIPS Instruction Set:</Text>
                        <Text style={styles.progressText}>
                          {quiz2Completed ? '✅ Done' : '❌ Not completed'}
                        </Text>

                        <Text style={styles.text}>Score:</Text>
                        <Text style={styles.scoreText}>
                          Correct: {score2.correct} | Mistakes: {score2.wrong}
                        </Text>

            <Text></Text>
            <Text style={styles.text}>Datapath:</Text>
                        <Text style={styles.progressText}>
                          {quiz3Completed ? '✅ Done' : '❌ Not completed'}
                        </Text>

                        <Text style={styles.text}>Score:</Text>
                        <Text style={styles.scoreText}>
                          Correct: {score3.correct} | Mistakes: {score3.wrong}
                        </Text>
            <Text></Text>
            <Text style={styles.referenceTitle}>References:</Text>
                        <View style={styles.referenceList}>
                          {[
                            "Chen, Z., Zhang, X., Qian, Y., & Cai, S. (2024). Datapath Combinational Equivalence Checking With Hybrid Sweeping Engines and Parallelization. arXiv preprint arXiv:2501.14740.",
                            "Dogga1, K. S. H., Shaik, C. B., & Muddusetty, S. (2021). Design of instruction set architecture based 16 bit MIPS architecture with pipeline stages. IRJET.",
                            "Efil, M. (2021). Design of a 32-bit single-cycle MIPS RISC processor.",
                            "Hataba, M. (2020). Pipelining in modern processors.",
                            "He, Y., Wan, H., Jiang, B., & Gao, X. (2017). A method to detect hazards in pipeline processor.",
                            "Hennessy, J. L., & Patterson, D. A. (2017). Computer Architecture: A Quantitative Approach (6th ed.).",
                            "Jeong, G. et al. (2021). Rasa: Efficient register-aware systolic array matrix engine for CPU.",
                            "Khairullah, S. S. (2022). Realization of a 16-bit MIPS RISC pipeline processor.",
                            "Lei, T. et al. (2024). Enhanced learning method for datapath design. ASEE Conference.",
                            "Najjar, H., Bourguiba, R., & Mouine, J. (2018). Pipeline hazards resolution in RISC processors.",
                            "Paliwal, M., & Tripathy, S. (2020). Difference between single-cycle and multi-cycle processor.",
                            "Patel, R., & Kumar, S. (2018). Techniques to deal with pipeline hazards.",
                            "Solanki, M. S., & Sharma, A. (2021). Single-cycle vs. multi-cycle processor review. https://doi.org/10.55524/"
                          ].map((ref, index) => (
                            <Text key={index} style={styles.referenceItem}>• {ref}</Text>
                          ))}
                        </View>
            <Text style={styles.licenseTitle}>Creative Commons License:</Text>
                        <Text style={styles.licenseText}>
                          FYP_OER © 2025 by Axel Tan Jaya is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0/
                        </Text>
          </View>
        </Animated.View>
        </ScrollView>
      </View>
  );
}

// StyleSheet for UI layout and styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
  },
  scrollContainer: {
      padding: 20,
    },
  animatedContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  progressContainer: {
    marginTop: 20,
    paddingLeft: 10,
  },
  progressText: {
    color: 'lightgreen',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreText: {
    color: 'white',
    fontSize: 18,
    marginTop: 5,
  },
  referenceTitle: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 30,
      marginBottom: 10,
    },
    referenceList: {
      marginBottom: 20,
    },
    referenceItem: {
      color: '#fff',
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 6,
    },
    licenseTitle: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 10,
    },
    licenseText: {
      color: '#ccc',
      fontSize: 16,
      lineHeight: 22,
    },
});
