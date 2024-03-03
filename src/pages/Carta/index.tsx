import React, { useEffect } from 'react';
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
import { useAuth } from '../../context/AuthContext';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigation } from '@react-navigation/native';

interface ScreenNavigationProp {
  navigate: (screen: string) => void;
}

export const Carta: React.FunctionComponent = () => {
  const authContext = useAuth();
  const { navigate } = useNavigation<ScreenNavigationProp>();

  useEffect(() => {
    handleLetters();
  }, []);

  const handleLetters = async () => {
    try {
      console.log('Clicou');
      await authContext.getLetters();
      console.log('authContext', authContext.letterData);
    } catch (error: any) {
      Alert.alert(
        'Erro ao carregar dados',
        'Ocorreu um erro ao carregar os dados',
      );
      console.error('Error:', error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ContainerInstructions>
          <InstructionsTitle>
            {authContext.letterData?.body ? authContext.letterData?.body : ''}
          </InstructionsTitle>
        </ContainerInstructions>
      </Container>
    </SafeAreaView>
  );
};
