import React from 'react';
import {
  Container,
  ContainerDetail,
  TrainingButton,
  TrainingButtonTitle,
  TrainingDuration,
  TrainingText,
  TrainingTitle,
} from './styles';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigation } from '@react-navigation/native';

interface ScreenNavigationProp {
  navigate: (screen: string) => void;
}

export const TrainingDetail: React.FunctionComponent = () => {
  const authContext = useAuth();
  const { navigate } = useNavigation<ScreenNavigationProp>();

  const handleInstructionView = async () => {
    try {
      navigate('Instructions');
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
        <ContainerDetail>
          <TrainingTitle>
            {authContext.programData?.name ? authContext.programData.name : ''}
          </TrainingTitle>
          <TrainingText>
            {authContext.programData?.description
              ? authContext.programData.description
              : ''}
          </TrainingText>
          <TrainingDuration>Duração: 15 minutos</TrainingDuration>
          <TrainingButton onPress={() => handleInstructionView()}>
            <TrainingButtonTitle>Iniciar treino</TrainingButtonTitle>
          </TrainingButton>
        </ContainerDetail>
      </Container>
    </SafeAreaView>
  );
};
