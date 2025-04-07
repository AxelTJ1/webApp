import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Link, useNavigation, useFocusEffect } from 'expo-router';
import React, { useLayoutEffect, useState, useCallback, useRef, useEffect } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { Font } from 'expo-font';

import Button from '@/components/Button';

const assetId = require('@/assets/video/CPU_Design.mp4');

export default function Material1() {
const [fontLoaded, setFontLoaded] = useState(false);
  const { width, height } = Dimensions.get('window');

  const videoWidth = width * 0.9;
  const videoHeight = height * 0.25;
  const scrollBoxHeight = height * 0.4;

    const player = useVideoPlayer(assetId, (player) => {
        player.loop = true;
      });

      const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

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

          const [key, setKey] = useState(0);

            useFocusEffect(
              useCallback(() => {
                setKey((prevKey) => prevKey + 1);

                return () => {
                      player.pause();
                    };
              }, [])
              );

              useEffect(() => {
              async function loadFonts() {
                    await Font.loadAsync({
                      'Ionicons': require('./assets/fonts/Ionicons.ttf'),
                    });
                    setFontLoaded(true);
                  }

                  loadFonts();
                if (player) {
                  player.play();
                }
              }, [player]);

  return (
    <View style={styles.container}>
    <View key={key} style={styles.animatedContainer}>
      <View style={styles.contentContainer}>
            <VideoView
                        style={{ width: videoWidth, height: videoHeight }}
                        player={player}
                        allowsFullscreen
                        allowsPictureInPicture
                      />
                      <View style={styles.controlsContainer}>
              <Button
                title={isPlaying ? 'Pause' : 'Play'}
                onPress={() => {
                  if (isPlaying) {
                    player.pause();
                  } else {
                    player.play();
                  }
                }}
              />
            </View>
          </View>
          <View style={[styles.scrollableBox, { height: scrollBoxHeight }]}>
                    <ScrollView style={styles.scrollContent}>
                      <Text style={styles.textContent}>
                        A MIPS CPU is a simplified version of a CPU that is known for its simplicity and efficiency. A CPU is a component of a computer that is responsible for executing instructions. It performs arithmetic and logical operations, manages data flow, and controls other hardware components. It has several key components, mainly the register file, memory, Arithmetic Logic Unit or ALU for short, and control unit. The register file consists of 32 registers that hold data temporarily during computation. The memory consists of an instruction and data memory, where the instruction memory stores the program code and the data memory stores the variables. The ALU is responsible for performing all the logical and arithmetic operations within the CPU. The control unit is responsible for coordinating the operations within a CPU.
                        There are 3 types of MIPS CPU, single-cycle CPU, multi-cycle CPU, and pipelined CPU. The differences between them are on how they execute an instruction. Within a CPU, an instruction is completed in 5 steps, instruction fetch, instruction decode, execution, memory access, and write back. Instruction fetch is when an instruction is retrieved from the instruction memory.
                        Instruction decode is when the fetched instruction is decoded to identify the type of instruction.
                        Execute is when the ALU executes the instruction.
                        Memory access is only done when the instruction requires a reading or writing from the memory.
                        Write back is when the result of the instruction is written back to the appropriate destination, usually a register.
                        A single-cycle CPU completes every instruction in one clock cycle. This means that every instruction is executed in the same amount of time regardless of their complexity.
                        In a multi-cycle CPU, every instruction is broken down into smaller parts to be done in separate clock cycles. This improves the speed at which instruction is completed as the instruction that takes a long time to complete are completed in separate clock cycles.
                        In a pipelined CPU, every stage of the instruction completion is handled by different parts of the CPU in parallel.
                        We need single-cycle CPU to study how an instruction is completed. Due to having each instruction being completed in one clock cycle, it is also easy to debug as each instruction is being completed one after the other. This can also help in learning how to use more complex systems in the future.
                      </Text>
                    </ScrollView>
                  </View>
              <Link href="./quiz1" asChild>
              <Button theme="next" label="Continue"/>
              </Link>
              </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  scrollableBox: {
    width: '90%',
    height: 350,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  scrollContent: {
    flex: 1,
  },
  textContent: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  controlsContainer: {
    padding: 10,
  },
  animatedContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});