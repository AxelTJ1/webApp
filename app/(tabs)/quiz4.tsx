import { Modal, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Link, useNavigation, useFocusEffect } from 'expo-router';
import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import * as Progress from 'react-native-progress';
import Animated, {SlideInRight } from "react-native-reanimated";
import { Font } from 'expo-font';

import Button from '@/components/Button';

const questions = [
  { id: 1, question: "What is the main advantage of pipelining in a CPU?", options: ["It reduces the execution time of an individual instruction", "It allows multiple instructions to be executed at the same time", "It eliminates all types of hazards", "It reduces the number of instructions needed in a program"], correctAnswer: "It allows multiple instructions to be executed at the same time" },
  { id: 2, question: "Which of the following is NOT a type of pipeline hazard?", options: ["Data hazard", "Structural hazard", "Logical hazard", "Control hazard"], correctAnswer: "Logical hazard" },
  { id: 3, question: "A data hazard occurs when:", options: ["The CPU fetches the wrong instruction due to a branch", "Two instructions need the same hardware resource at the same time", "An instruction depends on the result of a previous instruction that hasn’t finished executing", "The CPU stalls due to an error in the program"], correctAnswer: "An instruction depends on the result of a previous instruction that hasn’t finished executing" },
  { id: 4, question: "How can a CPU resolve a data hazard?", options: ["By using branch prediction", "By implementing forwarding (bypassing)", "By fetching the instruction twice", "By skipping the instruction"], correctAnswer: "By implementing forwarding (bypassing)" },
  { id: 5, question: "What is a control hazard?", options: ["When an instruction needs to access a memory location that is already in use", "When the CPU does not know the outcome of a branch instruction in time", "When multiple instructions require the same hardware at the same time", "When an instruction modifies a register while another instruction is using it"], correctAnswer: "When the CPU does not know the outcome of a branch instruction in time" },
  { id: 6, question: "Why does a single-cycle CPU NOT experience pipeline hazards?", options: ["Because it executes only one instruction at a time", "Because it has advanced hazard detection hardware", "Because it predicts all branches perfectly", "Because it uses multiple execution units"], correctAnswer: "Because it executes only one instruction at a time" },
  { id: 7, question: "In a pipelined CPU, what happens when a structural hazard occurs?", options: ["The CPU executes the wrong instruction due to incorrect branch prediction", "The CPU must stall or delay execution because two instructions need the same resource", "The CPU automatically resolves the issue without any delay", "The CPU skips the instruction causing the hazard"], correctAnswer: "The CPU must stall or delay execution because two instructions need the same resource" },
];

export default function Quiz4() {
const [fontLoaded, setFontLoaded] = useState(false);
const [key, setKey] = useState(0);

useEffect(() => {
               async function loadFonts() {
                     await Font.loadAsync({
                       'Ionicons': require('@/assets/fonts/Ionicons.ttf'),
                     });
                     setFontLoaded(true);
                   }

                   loadFonts();
               }, []);

const navigation = useNavigation();

      useLayoutEffect(() => {
          navigation.setOptions({
              headerLeft: () => (
                  <View style={{ marginLeft: 20 }}>
                  <Button
                  theme='exit'
                  onPress = {() => navigation.navigate('index')}
                  />
                  </View>
                  ),
              });
          }, [navigation]);

const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [isModalVisible, setIsModalVisible] = useState(false);
const [isAnswerCorrect, setIsAnswerCorrect] = useState(true);
const [quizStarted, setQuizStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

useFocusEffect(
    useCallback(() => {
    setIsModalVisible(false);
          setIsAnswerCorrect(true);
      setCurrentQuestionIndex(0);
      setQuizStarted(true);
      setCurrentQuestionIndex(0);
      setCorrectCount(0);
      setWrongCount(0);
            setProgress(0);
            setKey((prevKey) => prevKey + 1);
    }, [])
  );


  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (selectedAnswer: string) => {
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setIsAnswerCorrect(true);
        setCorrectCount((prev) => prev + 1);
      } else {
        setIsAnswerCorrect(false);
        setWrongCount((prev) => prev + 1);
      }
      setIsModalVisible(true);
    };


   const handleNextQuestion = () => {
        setIsModalVisible(false);
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            setProgress(nextIndex / questions.length);
            setKey((prevKey) => prevKey + 1);
          }
        };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <View style={styles.container}>
    <Animated.View
                            key={key}
                            entering={SlideInRight}
                            style={styles.animatedContainer}
                          >
                          <Progress.Bar
                                      progress={progress}
                                      width={Dimensions.get('window').width * 0.7}
                                      height={20}
                                      borderRadius={10}
                                      color="#00FF00"
                                      borderColor="#fff"
                                      style={styles.progressBar}
                                    />
    <View style={styles.questionContainer}>
    <Text style={styles.text}>{currentQuestion.question}</Text>
    </View>
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              theme="next"
              label={option}
              onPress={() => handleAnswer(option)}
            />
          ))}
          </Animated.View>
                        <Modal
                          transparent={true}
                          animationType="slide"
                          visible={isModalVisible}
                          onRequestClose={() => setIsModalVisible(false)}
                        >
                          <View style={styles.modalOverlay}>
                            <View style={styles.modalContainer}>
                              <Text style={styles.modalText}>
                                {isAnswerCorrect
                                  ? `Correct! Well done!`
                                  : `Incorrect! The correct answer is: ${currentQuestion.correctAnswer}`}
                              </Text>
                              {isLastQuestion
                              ? (<Button
                                                                      theme="next"
                                                                      label="Finish"
                                                                      onPress={() => navigation.navigate("complete", { correctCount, wrongCount })}
                                                                    />)

                              : (<Button
                              theme="next"
                              label="next"
                              onPress={handleNextQuestion}
                              />
                              )}
                            </View>
                          </View>
                        </Modal>
                    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  questionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  text: {
      color: '#fff',
      fontSize: 20,
      marginBottom: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        backgroundColor: '#25292e',
        width: '100%',
        padding: 20,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      modalText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
      },
      animatedContainer: {
                            flex: 1,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }
});
