import React, { useEffect } from 'react';
import { Container, ContainerInstructions, InstructionsTitle } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export const Letter: React.FunctionComponent = () => {
  const authContext = useAuth();

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
