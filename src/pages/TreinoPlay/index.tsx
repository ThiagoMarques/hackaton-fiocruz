import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, Text, Image, Button, Dimensions, ImageBackground, Pressable, TouchableOpacity, View, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Container, ContainerInstructions, InstructionsButton, InstructionsButtonTitle, PressableMic } from './styles';3
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { pause, play } from '../../assets/icons/Icons';
import { useNavigation } from '@react-navigation/native';

interface ScreenNavigationProp {
  navigate: (screen: string) => void;
}

export const TreinoPLay: React.FunctionComponent = () => {
  const [sound, setSound] = useState();
  const { navigate } = useNavigation<ScreenNavigationProp>();

  // const statusBarHeight = isAndroid ? StatusBar.currentHeight : 0;

  // const program = this.props.navigation.getParam('program', null);
  // const {
  //   songState,
  //   songCurrentTime,
  //   songDuration,
  //   playbackStarted,
  //   animatedValue,
  //   stage,
  // } = this.state;

  // const songUrl = program.track.url;
  // const isSongPending = songState === 'pending';
  // const isSongPlaying = songState === 'playing';

  // const formattedSongCurrentTime = this.formatAudioTimeString(songCurrentTime);
  // const formattedSongDuration = this.formatAudioTimeString(songDuration);

  // const animatedSequence = this.buildAnimatedSequence(program);

  const screenWidth = Dimensions.get('window').width;
  const outerCircleSize = screenWidth - 48 - 48;
  const innerCircleSize = outerCircleSize * 0.3;

  const innerCircleScaleInterpolationConfig = {
    inputRange: [0, 1],
    outputRange: [0.25, 1.1],
  };
  const innerCircleScaleAnimation = new Animated.Value(1.0).interpolate(
    innerCircleScaleInterpolationConfig,
  );

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function handlePlayingStart() {
    const { granted } = await Audio.getPermissionsAsync();
    if(granted) {
      try {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
          require('../../assets/alpha.mp3'),

          { shouldPlay: true },
        );
        setSound(sound);
        await sound.playAsync();
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
    }
  }
  async function handlePause() {
    const { granted } = await Audio.getPermissionsAsync();
    if (granted) {
      try {
        const result = await sound.current.getStatusAsync();
        if (result.isLoaded) {
          if (result.isPlaying === true) {
            sound.current.pauseAsync();
          }
        }
      } catch (error) {
        // An error occurred!
      }
    }
  }

  const handleFinishedTraining = async () => {
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
                color: 'white',
                position: 'absolute',
              },
            ]}
          >
            {'Teste'}
          </Animated.Text>
        </View>
        <ContainerInstructions>
          <TouchableOpacity
            onPress={() => (sound ? handlePlayingStart() : handlePause())}
          >
            <Image
              style={{
                width: 25,
                height: 25,
                display: 'flex',
                justifyContent: 'center',
                tintColor: '#000',
                opacity: sound ? 0.5 : 1,
              }}
              resizeMode="contain"
              source={sound ? pause : play}
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
            {'00:00:00'} / {'00:00:00'}
          </Text>
          <Text
            style={[
              {
                alignSelf: 'center',
                marginBottom: 16,
              },
            ]}
          >
            {sound ? 'Carregando' : ''}
          </Text>
          <InstructionsButton onPress={() => handleFinishedTraining()}>
            <InstructionsButtonTitle>Finalizar treino</InstructionsButtonTitle>
          </InstructionsButton>
        </ContainerInstructions>
      </Container>
    </SafeAreaView>
  );
};
