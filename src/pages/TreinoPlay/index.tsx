/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, Text, Image, Button, Dimensions, ImageBackground, Pressable, TouchableOpacity, View, Alert, Easing, Vibration } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Container, ContainerInstructions, InstructionsButton, InstructionsButtonTitle, PressableMic } from './styles';3
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { pause, play } from '../../assets/icons/Icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

import alphaSound from '../../assets/alpha.mp3';

interface ScreenNavigationProp {
  navigate: (screen: string) => void;
}

export const TreinoPLay: React.FunctionComponent = () => {
  const authContext = useAuth();

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [animatedSequence, setAnimatedSequence] = useState<Animated.CompositeAnimation | null>(null);
  const { navigate } = useNavigation<ScreenNavigationProp>();

  const [songState, setSongState] = useState('paused');
  const [songCurrentTime, setSongCurrentTime] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const [songDuration, setSongDuration] = useState(0);
  const [playbackStarted, setPlaybackStarted] = useState(false);
  const [playbackEnded, setPlaybackEnded] = useState(false);
  const [value, setValue] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [holdValue, setHoldValue] = useState(0);
  const holdAnimatedValue = useRef(new Animated.Value(0)).current;
  const [stage, setStage] = useState('Inspire');
  const [caches, setCaches] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const outerCircleSize = screenWidth - 48 - 48;
  const innerCircleSize = outerCircleSize * 0.3;

  const innerCircleScaleInterpolationConfig = {
    inputRange: [0, 1],
    outputRange: [0.5, 1.1],
  };
  const innerCircleScaleAnimation = animatedValue.interpolate(
    innerCircleScaleInterpolationConfig,
  );

  const isSongPending = songState === 'pending';
  const isSongPlaying = songState === 'playing';

  function buildAnimation(type: any, duration = 3000) {
    switch (type) {
      case 'inhale':
        return Animated.parallel([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(holdAnimatedValue, {
            toValue: 0,
            useNativeDriver: true,
          }),
        ]);
      case 'exhale':
        return Animated.parallel([
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true
          }),
          Animated.timing(holdAnimatedValue, {
            toValue: 0,
            useNativeDriver: true
          }),
        ]);
      case 'hold':
        return duration > 0
          ? Animated.parallel([
              Animated.delay(duration),
              Animated.timing(holdAnimatedValue, {
                toValue: 1,
                useNativeDriver: true
              }),
            ])
          : Animated.delay(duration);
    }
  }

  function buildCycleAnimations(ratio: any, ratioUnit: any) {
    return [
      buildAnimation('inhale', ratio[0] * ratioUnit),
      buildAnimation('hold', ratio[1] * ratioUnit),
      buildAnimation('exhale', ratio[2] * ratioUnit),
      buildAnimation('hold', ratio[3] * ratioUnit),
    ];
  };

  function buildAnimatedSequence(program: any) {
    const animations = program.cycles.reduce((result: any, cycle: any, index: any, cycles: any) => {
        const ratio = cycle.ratio;
        const ratioUnit = cycle.ratioUnit;
        const cycleDuration = ratio.reduce((duration: any, ratioValue: any) => {
          return duration + ratioValue * ratioUnit;
        }, 0);

        const isLastCycle = index === cycles.length - 1;
        const nextCycle = cycles[index + 1];

        const cycleStart = cycle.start;
        const cycleEnd = isLastCycle ? program.track.duration : nextCycle.start;

        const totalCycleDuration = cycleEnd - cycleStart;
        const totalCycleCount = Math.ceil(totalCycleDuration / cycleDuration);

        const cycleAnimations = buildCycleAnimations(ratio, ratioUnit);

        const totalCycleAnimations = Array.from(
          { length: totalCycleCount },
          () => cycleAnimations,
        ).flat();

        return result.concat(totalCycleAnimations);
      },
      [],
    );

    return Animated.sequence(animations);
  };

  useEffect(() => {
    const sequence: Animated.CompositeAnimation | null = buildAnimatedSequence(authContext.programData);
    if (sequence) {
      setAnimatedSequence(sequence);
    }
  }, [authContext.programData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (sound !== null && songState === 'playing') {
        try {
          const updateSongCurrentTime = async () => {
            const status = await sound.getStatusAsync();
            if (status && status.isLoaded) {
              setSongCurrentTime(status.positionMillis / 1000); // Converta para segundos
            }
          };
          updateSongCurrentTime();
        } catch (error) {
          console.error('Erro ao obter o tempo de reprodução:', error);
        }
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [sound, songState]);

  useEffect(() => {
    animatedValue.addListener(({ value: newValue }) => {
      const newStage = newValue > value ? 'Inspire' : 'Expire';
      setValue(newValue);
      setStage(newStage);
    });

    holdAnimatedValue.addListener(({ value: newHoldValue }) => {
      const newStage = newHoldValue > holdValue ? 'Segure' : stage;
      Vibration.vibrate(500);
      setHoldValue(newHoldValue);
      setStage(newStage);
    });

    const intervalId = setInterval(async () => {
      if (sound && songState === 'playing') {
        try {
          const status = await sound.getStatusAsync();
          if (status.isLoaded && !status.isBuffering) {
            setSongCurrentTime(status.positionMillis / 1000); // Converta para segundos
          }
        } catch (error) {
          console.error('Erro ao obter o tempo de reprodução:', error);
        }
      }
    }, 100);

    const animatedSequence = buildAnimatedSequence(authContext.programData);

    return () => {
      animatedValue.removeAllListeners();
      holdAnimatedValue.removeAllListeners();
      clearInterval(intervalId);
    };
  }, [value, stage, holdValue, songCurrentTime]);

  async function handlePlayingStart() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          alphaSound,
          { shouldPlay: true },
        );
        await sound.playAsync();
        setSound(sound);
        if(animatedSequence !== null) {
          animatedSequence.start();
        }
        setSongState('playing');
        // Reproduzir o áudio


        sound.setOnPlaybackStatusUpdate(status => {
          if (status.isLoaded) {
            const durationMinutes = Math.floor(status.durationMillis / 60000);
            const durationSeconds = Math.floor((status.durationMillis % 60000) / 1000);
            const durationTimeString = `${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
            setDuration(durationTimeString);
            const currentMinutes = Math.floor(status.positionMillis / 60000);
            const currentSeconds = Math.floor((status.positionMillis % 60000) / 1000);
            const currentTimeString = `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`;
            setCurrentTime(currentTimeString);
          }
        });
      } catch (error) {
        console.log('error', error);
      }
  }
  async function handlePause() {
    if (animatedSequence) {
      animatedSequence.stop();
    }
      try {
        if (sound !== null) { // Verifique se sound não é null
          const result = await sound.getStatusAsync();
          if (result.isLoaded && result.isPlaying) {
            await sound.pauseAsync();
            setSound(null);
            setSongState('paused');
          }
        }
      } catch (error) {
        console.error('Ocorreu um erro ao pausar a reprodução:', error);
      }
  }

  const handleFinishedTraining = async () => {
    handlePause();
    try {
      navigate('Tabs');
    } catch (error: any) {
      Alert.alert(
        'Erro ao iniciar treino',
        'Ocorreu um erro ao carregar a tela',
      );
      console.error('Authentication error:', error.message);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <View
          style={{
            flex: 3,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'stretch',
          }}
        >
          <Animated.View
            style={{
              width: outerCircleSize,
              height: outerCircleSize,
              borderRadius: outerCircleSize / 2,
              backgroundColor: '#979DA8',
              opacity: 0.75,
              transform: [{ scale: innerCircleScaleAnimation }],
              position: 'absolute',
            }}
          />
          <Animated.View
            style={{
              width: outerCircleSize,
              height: outerCircleSize,
              borderRadius: outerCircleSize / 2,
              backgroundColor: '#979DA8',
              opacity: 0.2,
              position: 'absolute',
            }}
          />
          <Animated.View
            style={{
              width: innerCircleSize,
              height: innerCircleSize,
              borderRadius: innerCircleSize / 2,
              backgroundColor: '#fff',
              position: 'absolute',
            }}
          />
          <Animated.Text
            style={[
              {
                color: 'black',
                position: 'absolute',
              },
            ]}
          >
            {isSongPending ? stage : ''}
          </Animated.Text>
        </View>
        <ContainerInstructions>
          <TouchableOpacity
            onPress={() => (isSongPlaying ? handlePause() : handlePlayingStart())}
          >
            <Image
              style={{
                width: 25,
                height: 25,
                display: 'flex',
                justifyContent: 'center',
                tintColor: '#000',
                opacity: isSongPending ? 0.5 : 1,
              }}
              resizeMode="contain"
              source={isSongPlaying ? pause : play}
            ></Image>
          </TouchableOpacity>
          <Text
            style={[
              {
                alignSelf: 'center',
                marginBottom: 16,
              },
            ]}
          >
            {currentTime} / {duration}
          </Text>
          <Text
            style={[
              {
                alignSelf: 'center',
                marginBottom: 16,
              },
            ]}
          >
            {isSongPending ? 'Carregando' : ''}
          </Text>
          <InstructionsButton onPress={() => handleFinishedTraining()}>
            <InstructionsButtonTitle>Finalizar treino</InstructionsButtonTitle>
          </InstructionsButton>
        </ContainerInstructions>
      </Container>
    </SafeAreaView>
  );
};

