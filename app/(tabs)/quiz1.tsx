import { Modal, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Link, useNavigation, useFocusEffect } from 'expo-router';
import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import * as Progress from 'react-native-progress';
import Animated, {SlideInRight } from "react-native-reanimated";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '@/components/Button';

const questions = [
  { id: 1, question: "What is the main function of a CPU?", options: ["Displaying images on a screen", "Storing files permanently", "Executing instructions and managing data flow", "Controlling network connections"], correctAnswer: "Executing instructions and managing data flow" },
  { id: 2, question: "What are the key components of a MIPS CPU?", options: ["Hard drive, monitor, keyboard", "Register file, memory, ALU, control unit", "Cache memory, GPU, power supply", "RAM, ROM, SSD"], correctAnswer: "Register file, memory, ALU, control unit" },
  { id: 3, question: "How many registers are in the MIPS register file?", options: ["8", "16", "32", "64"], correctAnswer: "32" },
  { id: 4, question: "What does the ALU in a MIPS CPU do?", options: ["Fetches instructions from memory", "Performs arithmetic and logical operations", "Controls the execution of instructions", "Stores program code and data"], correctAnswer: "Performs arithmetic and logical operations" },
  { id: 5, question: "What is the purpose of the instruction memory in a MIPS CPU?", options: ["To store temporary computation results", "To hold the program code to be executed", "To execute logical operations", "To manage input and output devices"], correctAnswer: "To hold the program code to be executed" },
  { id: 6, question: "What is the correct sequence of instruction execution in a MIPS CPU?", options: ["Execute → Fetch → Decode → Write Back → Memory Access", "Fetch → Decode → Execute → Memory Access → Write Back", "Decode → Fetch → Execute → Write Back → Memory Access", "Memory Access → Execute → Fetch → Decode → Write Back"], correctAnswer: "Fetch → Decode → Execute → Memory Access → Write Back" },
  { id: 7, question: "What is the key characteristic of a single-cycle MIPS CPU?", options: ["Every instruction is completed in multiple clock cycles", "Instructions are executed in parallel", "Each instruction is completed in one clock cycle", "Only arithmetic operations are performed"], correctAnswer: "Each instruction is completed in one clock cycle" },
  { id: 8, question: "How does a multi-cycle CPU improve performance compared to a single-cycle CPU?", options: ["By executing all instructions at the same time", "By breaking instructions into smaller steps executed in separate clock cycles", "By using multiple CPUs to execute different instructions simultaneously", "By eliminating the need for memory access"], correctAnswer: "By breaking instructions into smaller steps executed in separate clock cycles" },
  { id: 9, question: "What is the main advantage of a pipelined CPU?", options: ["Each instruction is executed one after another", "Different instruction stages are handled in parallel", "Instructions skip unnecessary steps", "Each instruction takes longer to complete"], correctAnswer: "Different instruction stages are handled in parallel" },
  { id: 10, question: "Why is a single-cycle CPU useful for learning about instruction execution?", options: ["It is the fastest type of CPU", "It is easy to debug since all instructions complete in one cycle", "It uses advanced parallel processing", "It does not require a control unit"], correctAnswer: "It is easy to debug since all instructions complete in one cycle" },
];

export default function Quiz1() {
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
      await AsyncStorage.setItem('quiz1Completed', 'true');
      const score = { correct: correctCount, wrong: wrongCount };
      await AsyncStorage.setItem('quiz1Score', JSON.stringify(score));
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
                                     onPress={() => {
                                         setIsModalVisible(false);

                                         requestAnimationFrame(() => {

                                           setTimeout(() => {

                                             handleFinishQuiz();
                                           }, 100);
                                         });
                                       }}
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
