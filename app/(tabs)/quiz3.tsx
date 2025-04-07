import { Modal, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Link, useNavigation, useFocusEffect } from 'expo-router';
import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import * as Progress from 'react-native-progress';
import Animated, {SlideInRight } from "react-native-reanimated";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

import Button from '@/components/Button';

const questions = [
  { id: 1, question: "What is a datapath in a CPU?", options: ["A software program that executes instructions", "A group of hardware components responsible for executing instructions", "A memory management technique", "A type of programming language"], correctAnswer: "A group of hardware components responsible for executing instructions" },
  { id: 2, question: "What is the function of the Program Counter (PC)?", options: ["To store arithmetic and logical results", "To fetch and decode instructions", "To keep track of the next instruction to execute", "To store temporary data during execution"], correctAnswer: "To keep track of the next instruction to execute" },
  { id: 3, question: "What happens to the Program Counter (PC) when a jump instruction is executed?", options: ["It increments by 1", "It resets to 0", "It moves to the destination address specified by the jump", "It continues executing the next sequential instruction"], correctAnswer: "It moves to the destination address specified by the jump" },
  { id: 4, question: "What is the purpose of the ALU in the datapath?", options: ["To control instruction execution", "To perform arithmetic and logical operations", "To store program instructions", "To fetch data from memory"], correctAnswer: "To perform arithmetic and logical operations" },
  { id: 5, question: "How does the register file contribute to instruction execution?", options: ["It controls the flow of instructions in the CPU", "It stores temporary data used during instruction processing", "It directs data flow between different components", "It fetches instructions from memory"], correctAnswer: "It stores temporary data used during instruction processing" },
  { id: 6, question: "What is the role of multiplexers in the datapath?", options: ["To store instructions and data", "To perform logical operations", "To direct data flow by selecting from multiple possible inputs", "To generate control signals"], correctAnswer: "To direct data flow by selecting from multiple possible inputs" },
  { id: 7, question: "What does the control unit do in a datapath?", options: ["It generates control signals based on the instruction's opcode", "It stores temporary data for processing", "It fetches the next instruction from memory", "It performs arithmetic operations"], correctAnswer: "It generates control signals based on the instruction's opcode" },
  { id: 8, question: "Which type of instruction causes the control unit to enable memory read and send the loaded value to the register file?", options: ["R-type instruction", "I-type instruction", "Load word (lw) instruction", "Jump (j) instruction"], correctAnswer: "Load word (lw) instruction" },
  { id: 9, question: "What is one of the major challenges in designing a datapath?", options: ["Deciding how much storage space the ALU should have", "Balancing simplicity with functionality", "Ensuring that all instructions take the same number of cycles", "Removing the need for multiplexers"], correctAnswer: "Balancing simplicity with functionality" },
  { id: 10, question: "What is a control hazard in a datapath?", options: ["When an instruction takes too many cycles to execute", "When two instructions try to access the same memory location", "When a branch or jump instruction causes the wrong instruction to be fetched", "When an instruction executes before the ALU is ready"], correctAnswer: "When a branch or jump instruction causes the wrong instruction to be fetched" },
];

export default function Quiz3() {
const [fontsLoaded] = useFonts({
    Ionicons: require('@/assets/fonts/Ionicons.ttf'),
  });

  if (!fontLoaded) {
          return null;
        }

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
          await AsyncStorage.setItem('quiz3Completed', 'true');
          const score = { correct: correctCount, wrong: wrongCount };
          await AsyncStorage.setItem('quiz3Score', JSON.stringify(score));
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
