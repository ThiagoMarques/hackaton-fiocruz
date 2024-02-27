import React from 'react';
import {
  CardUserButton,
  CardUserButtonTitle,
  Container,
  Header,
  Icon,
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

export const Treinos: React.FunctionComponent = () => {
  const authContext = useAuth();
  const defaultProgram = 'ansiedade';
  const { navigate } = useNavigation<ScreenNavigationProp>();

  const handleProgram = async () => {
    try {
      console.log('Clicou');
      await authContext.getPrograms(defaultProgram);
      console.log('authContext', authContext.programData);
      navigate('TreinoDetalhado');
    } catch (error: any) {
      Alert.alert(
        'Erro ao buscar programas',
        'Ocorreu um erro ao carregar os dados do programa',
      );
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header>
          <TrainingTouchableOpacity>
            <ImageHeaderTraining resizeMode="contain" source={arrowLeft} />
          </TrainingTouchableOpacity>
          <TrainingText>{'Ansiedade'}</TrainingText>
          <TrainingTouchableOpacity>
            <ImageHeaderTraining resizeMode="contain" source={arrowRight} />
          </TrainingTouchableOpacity>
        </Header>
        <TrainingView>
          <CardUserButton onPress={() => handleProgram()}>
            <CardUserButtonTitle>Ansiedade</CardUserButtonTitle>
          </CardUserButton>
        </TrainingView>
      </Container>
    </SafeAreaView>
  );
};
