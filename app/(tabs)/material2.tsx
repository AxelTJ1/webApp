import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Link, useNavigation, useFocusEffect } from 'expo-router';
import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { Font } from 'expo-font';

import Button from '@/components/Button';

const assetId = require('@/assets/video/MIPS_Instruction_Set_Architecture.mp4');

export default function Material2() {
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
                                              'Ionicons': require('@/assets/fonts/Ionicons.ttf'),
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
                                  The MIPS instruction set is list of instructions that a processor can execute. This is used to help people learn computer architecture concepts. It has a few features that simplifies execution. These features include load/store architecture, fixed instruction length, a three-operand design, and a pipelined-friendly structure.
                                  Load/store architecture means that the CPU only performs operations on registers, not directly on memory. If it needs to work with memory, the processor needs to use specific instructions like load and store.
                                  Fixed instruction length means that every instruction is always 4 bytes long. This consistency helps the CPU fetch and decode instructions efficiently because it knows the exact size of each instruction.
                                  Three-operand design means that most of the instruction within the MIPS instruction set has 3 inputs, which are 2 source operands and 1 destination operand.
                                  Pipelined-friendly design means that MIPS instruction set was designed with pipelining in mind, which means that multiple instruction can be processed at the same time.
                                  MIPS instructions is usually categorized into 3 categories, R-type, I-type, and J-type.
                                  R-type instructions are instructions that only work for register values, such as add, sub, and and.
                                  I-type instructions are instructions that use immediate values or memory access, such as lw (load word), sw (store word), and addi (add immediate).
                                  J-type instructions are instructions that are used to change the program counter value to redirect execution.
                                  </Text>
                              </ScrollView>
                            </View>
              <Link href="./quiz2" asChild>
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