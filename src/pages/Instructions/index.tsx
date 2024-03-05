import React from 'react';
import {
  Container,
  ContainerInstructions,
  InstructionsButton,
  InstructionsButtonTitle,
  InstructionsTitle,
} from './styles';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

interface ScreenNavigationProp {
  navigate: (screen: string) => void;
}

export const Instructions: React.FunctionComponent = () => {
  // const authContext = useAuth();
  const { navigate } = useNavigation<ScreenNavigationProp>();

  const handleStartTraining = async () => {
    try {
      navigate('TrainingPlay');
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
        <ContainerInstructions>
          <InstructionsTitle>
            Opte por headphones para melhor captação do som
          </InstructionsTitle>
        </ContainerInstructions>
        <InstructionsButton onPress={() => handleStartTraining()}>
          <InstructionsButtonTitle>Pular instruções</InstructionsButtonTitle>
        </InstructionsButton>
      </Container>
    </SafeAreaView>
  );
};
