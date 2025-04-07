import { Modal, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Link, useNavigation, useFocusEffect } from 'expo-router';
import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import * as Progress from 'react-native-progress';
import Animated, {SlideInRight } from "react-native-reanimated";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '@/components/Button';

const questions = [
  { id: 1, question: "What is the MIPS instruction set?", options: ["A set of rules for designing CPUs", "A list of instructions a MIPS processor can execute", "A programming language used for MIPS", "A type of hardware component"], correctAnswer: "A list of instructions a MIPS processor can execute" },
  { id: 2, question: "What is a key feature of the MIPS instruction set?", options: ["Variable instruction lengths", "Direct execution of operations on memory", "Load/store architecture", "Only two operands per instruction"], correctAnswer: "Load/store architecture" },
  { id: 3, question: "What does load/store architecture mean?", options: ["The CPU can perform operations directly on memory", "The CPU only operates on registers, requiring special instructions to access memory", "Every instruction in MIPS loads and stores data automatically", "Instructions can be of any length"], correctAnswer: "The CPU only operates on registers, requiring special instructions to access memory" },
  { id: 4, question: "What is the length of every MIPS instruction?", options: ["2 bytes", "4 bytes", "8 bytes", "Variable length"], correctAnswer: "4 bytes" },
  { id: 5, question: "How many operands does a typical MIPS instruction use?", options: ["1", "2", "3", "4"], correctAnswer: "3" },
  { id: 6, question: "Why is the MIPS instruction set considered pipelined-friendly?", options: ["It allows multiple instructions to be processed at the same time", "It requires fewer clock cycles to execute instructions", "It eliminates the need for memory access", "It executes all instructions in one cycle"], correctAnswer: "It allows multiple instructions to be processed at the same time" },
  { id: 7, question: "What are the three main types of MIPS instructions?", options: ["A-type, B-type, and C-type", "Load, Store, and Execute", "R-type, I-type, and J-type", "Register, Memory, and Jump"], correctAnswer: "R-type, I-type, and J-type" },
  { id: 8, question: "Which type of MIPS instruction works only with register values?", options: ["I-type", "J-type", "R-type", "Load/Store type"], correctAnswer: "R-type" },
  { id: 9, question: "Which instruction type is used for memory access or immediate values?", options: ["R-type", "I-type", "J-type", "M-type"], correctAnswer: "I-type" },
  { id: 10, question: "What is the main purpose of J-type instructions?", options: ["Performing arithmetic operations", "Loading and storing data from memory", "Changing the program counter to redirect execution", "Comparing two register values"], correctAnswer: "Changing the program counter to redirect execution" },
];

export default function Quiz2() {
const [key, setKey] = useState(0);

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

  const handleFinishQuiz = async () => {
      try {
        await AsyncStorage.setItem('quiz2Completed', 'true');
        const score = { correct: correctCount, wrong: wrongCount };
        await AsyncStorage.setItem('quiz2Score', JSON.stringify(score));
        navigation.navigate("complete", { correctCount, wrongCount });
      } catch (error) {
        console.error("Failed to save quiz completion:", error);
      }
    };

  return (
    <View style={styles.container}>
                  <Progress.Bar
                              progress={progress}
                              width={Dimensions.get('window').width * 0.7}
                              height={20}
                              borderRadius={10}
                              color="#00FF00"
                              borderColor="#fff"
                              style={styles.progressBar}
                            />
    <Animated.View
                        key={key}
                        entering={SlideInRight}
                        style={styles.animatedContainer}
                      >
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
                                                                      onPress={handleFinishQuiz}
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
