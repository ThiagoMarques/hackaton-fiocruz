import React, { useState } from 'react';
import {
  CardUserButton,
  CardUserButtonTitle,
  Container,
  Header,
  ImageHeaderTraining,
  TrainingText,
  TrainingTouchableOpacity,
  TrainingView,
} from './styles';

import { arrowLeft, arrowRight } from '../../assets/icons/Icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

interface ScreenNavigationProp {
  navigate: (screen: string) => void;
}

export const Training: React.FunctionComponent = () => {
  const [position, setPosition] = useState(0);
  const authContext = useAuth();
  const programs = ['Ansiedade', 'Enxaqueca', 'Insônia'];
  const { navigate } = useNavigation<ScreenNavigationProp>();

  const handleProgram = async (programName: string) => {
    try {
      await authContext.getPrograms(programName);
      navigate('TrainingDetail');
    } catch (error: any) {
      Alert.alert(
        'Erro ao buscar programas',
        'Ocorreu um erro ao carregar os dados do programa',
      );
      console.error('Authentication error:', error.message);
    }
  };

  function changeTraining(increase: boolean) {
    let newPosition = position;
    const limit = programs.length - 1;
    if (increase) {
      newPosition = newPosition < limit ? newPosition + 1 : 0;
    } else {
      newPosition = newPosition > 0 ? newPosition - 1 : limit;
    }
    setPosition(newPosition);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header>
          <TrainingTouchableOpacity onTouchEnd={() => changeTraining(false)}>
            <ImageHeaderTraining resizeMode="contain" source={arrowLeft} />
          </TrainingTouchableOpacity>
          <TrainingText>{programs[position]}</TrainingText>
          <TrainingTouchableOpacity onTouchEnd={() => changeTraining(true)}>
            <ImageHeaderTraining resizeMode="contain" source={arrowRight} />
          </TrainingTouchableOpacity>
        </Header>
        <TrainingView>
          <CardUserButton onPress={() => handleProgram(programs[position])}>
            <CardUserButtonTitle>{programs[position]}</CardUserButtonTitle>
          </CardUserButton>
        </TrainingView>
      </Container>
    </SafeAreaView>
  );
};
