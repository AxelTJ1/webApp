import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Link, useNavigation, useFocusEffect } from 'expo-router';
import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { useFonts } from 'expo-font';

import Button from '@/components/Button';

const assetId = require('@/assets/video/Pipelining.mp4');

export default function Material4() {
const [fontsLoaded] = useFonts({
    Ionicons: require('./assets/fonts/Ionicons.ttf'),
  });

  if (!fontLoaded) {
          return null;
        }
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
                                            Pipelining is technique used to improve instruction processing speed by breaking down instruction execution into smaller parts and processing them concurrently.
                                            A pipelined CPU applies this technique to improve its instruction processing speed.
                                            This means that a new instruction can start executing at the same time one instruction is executing in the same clock cycle.
                                            There are 3 main point of differences. Those points are instruction execution, clock cycle time, and hazards.
                                            A single-cycle CPUs instruction execution is always done in one clock cycle.
                                            As for pipelined CPU, due to splitting the instruction to multiple parts, instructions can be done in parallel to each other.
                                            A single-cycle CPU's clock cycle lasts as long as the slowest instruction as a result of it executing every instruction in a single clock cycle.
                                            A pipelined CPU's clock cycle lasts as long as the longest pipelining stage due to it having broken down the instructions into smaller parts.
                                            A single-cycle CPU doesn't need to worry about hazards as it processes instructions sequentially. A pipelined CPU needs to be wary of several hazards.
                                            These hazards include structural hazards, data hazards, and control hazards.
                                            Hazards are possible issues that can occur within a CPU that causes the CPU to not execute instruction properly. For a pipelined CPU, the hazards that can occur include structural, data, and control hazards.
                                            Structural hazards are hazards that occur when two instructions require the same hardware resource in the same cycle.
                                            Data hazards are hazards that occur when an instructions depends on the result of a previous instruction that hasn't completed yet.
                                            Control hazards are hazards that occur when the CPU doesn't know the destination of the branch instruction and fetches the incorrect instruction.
                                            A pipelined CPU deals with structural hazards by using separate instruction and data memory or by introducing stall cycles.
                                            It deals with data hazards by either forwarding the result to the next pipeline stage or by stalling the process until the required resource is available.
                                            It deals with control hazards by either predicting the destination of the branch instruction or always executing the next instruction regardless of whether the branch is taken or not. 
                                          </Text>
                                        </ScrollView>
                                      </View>
              <Link href="./quiz4" asChild>
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