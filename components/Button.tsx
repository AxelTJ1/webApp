import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
};

const screenHeight = Dimensions.get('window').height;

const Button = React.forwardRef<View, Props>(({ label, theme, onPress }, ref) => {
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.primary,
          { borderWidth: 4, borderColor: '#07080d', borderRadius: 18 },
        ]}
        ref={ref}
      >
        <Pressable style={[styles.button, { backgroundColor: '#add8e6' }]} onPress={onPress}>
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  if (theme === 'level') {
    return (
      <View
        style={[
          styles.level,
          { borderWidth: 4, borderColor: '#07080d', borderRadius: 18 },
        ]}
        ref={ref}
      >
        <Pressable style={[styles.button, { backgroundColor: '#add8e6' }]} onPress={onPress}>
          <Text style={[styles.levelLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  if (theme === 'next') {
      return (
        <View
          style={[
            styles.next,
            { borderWidth: 4, borderColor: '#07080d', borderRadius: 18 },
          ]}
          ref={ref}
        >
          <Pressable style={[styles.button, { backgroundColor: '#add8e6' }]} onPress={onPress}>
            <Text style={[styles.nextLabel, { color: '#25292e' }]}>{label}</Text>
          </Pressable>
        </View>
      );
    }

  if (theme === 'exit') {
      return (
          <View style={styles.exit}>
            <Pressable style={styles.button} onPress={onPress}>
              <Ionicons name="close-outline" size={24} color="white" />
            </Pressable>
          </View>
        );
    }

  return (
    <View style={styles.primary}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
});

export default Button;

const styles = StyleSheet.create({
  button: {
      borderRadius: 10,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  primary: {
    width: 200,
    height: 40,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  level: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '95%',
      minHeight: screenHeight * 0.05,
      maxHeight: 80,
      alignSelf: 'center',
      marginBottom: '15',
    },
  exit: {
    width: 40,
    height: 40,
    },
  next: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    minHeight: screenHeight * 0.05,
    maxHeight: 80,
    alignSelf: 'center',
    marginBottom: '15',
  },
  buttonIcon: {
      paddingRight: 8,
    },
  buttonLabel: {
    color: 'white',
    fontSize: 25,
  },
  nextLabel: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    levelLabel: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        },
});