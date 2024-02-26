import React from 'react';
import {
  CardUserButton,
  Container,
  Header,
  Icon,
  ImageHeaderTraining,
  TrainingText,
  TrainingTouchableOpacity,
} from './styles';

import { arrowLeft, arrowRight } from '../../assets/icons/Icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export const Treinos: React.FunctionComponent = () => {
  const authContext = useAuth();
  const defaultProgram = 'ansiedade';

  console.log('INICIOU... &&&&&&&&&&&');
  const handleProgram = async () => {
    try {
      console.log('Clicou');
      await authContext.getPrograms(defaultProgram);
    } catch (error: any) {
      Alert.alert(
        'Erro ao criar usuário',
        'Ocorreu um erro ao criar seu usuário, verifique os dados inseridos.',
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
          <TrainingText>{'Teste'}</TrainingText>
          <TrainingTouchableOpacity>
            <ImageHeaderTraining resizeMode="contain" source={arrowRight} />
          </TrainingTouchableOpacity>
        </Header>
        <View>
          <CardUserButton onPress={() => handleProgram()}>
            <Icon name="mail" />
            {/* <CardUserButtonTitle>Carta do seu profissional de saúde</CardUserButtonTitle> */}
          </CardUserButton>
        </View>
      </Container>
    </SafeAreaView>
  );
};
