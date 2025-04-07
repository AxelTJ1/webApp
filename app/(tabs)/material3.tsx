import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Link, useNavigation, useFocusEffect } from 'expo-router';
import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { Font } from 'expo-font';

import Button from '@/components/Button';

const assetId = require('@/assets/video/Datapath.mp4');

export default function Material3() {
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
                                                        'custom-font': require('./assets/fonts/Ionicons.ttf'),
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
                                            A datapath is a group of hardware elements that are responsible for executing instructions. These include the program counter (PC), ALU, instruction and data memory, register file, and multiplexers.
                                            The Program Counter (PC) keeps track of which instruction should the CPU execute next. Usually, it increments to the next address, but when a jump instruction is processed, it goes to the destination address instead.
                                            The ALU performs arithmetic and logical operations.
                                            Instruction memory stores the programs instructions while the data memory is used for store and load instructions.
                                            The register file stores temporary data used during instruction procession.
                                            Multiplexers directs dataflow by selecting one of multiple possible inputs. For example, the ALU needs to chose between a register value or an immediate value depending on the instruction type. The PC also uses the multiplexer to decide to move to the next instruction or to move to a new address.
                                            To build a datapath, a data flow should be defined for how data should flow through each of the components for different instructions. For example, for R-type instructions like add add $t0, $t1, $t2, data flows from the instruction memory to the register file to the ALU and back to the register file.
                                            To coordinate the procession of the instructions, the control unit generates control signals based on the instructions optcode. These signals can indicate whether the ALU should perform arithmetic or logical operations, data should come from the memory or register, and where the results should be stored. For example, when executing lw $t0, 0($t1), the control unit activates signals that direct the ALU to calculate the memory address, enable memory read, and send the loaded value to the register file. Without a control unit, the datapath wouldn't know how to process an instruction properly.
                                            When designing a datapath, there are 2 major challenges. The first one is balancing simplicity with functionality. Making a simple datapath would make it easy to understand but may not be able to support more complex programs. But making it more complex to accommodate more instructions would require more control logic.
                                            The other one is hazards. Data hazards are caused when an instruction depends on the result of the previous instruction. Control hazards are caused by branches and jumps, possibly leading to incorrect process if the wrong instruction is fetched.
                                            </Text>
                                        </ScrollView>
                                      </View>
              <Link href="./quiz3" asChild>
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