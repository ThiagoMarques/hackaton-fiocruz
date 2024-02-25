import React from 'react';
import {
  Container,
  Header,
  Icon,
  ImageHeaderTraining,
  LogoutButton,
  TrainingText,
  TrainingTouchableOpacity,
  TrainingView,
  UserAvatar,
  UserAvatarButton,
  UserGreeting,
  UserInfo,
  UserInfoDetail,
  UserName,
  UserWrapper,
} from './styles';

import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { arrowLeft, arrowRight } from '../../assets/icons/Icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Treinos: React.FunctionComponent = () => {
  const { user, signOutApp } = useAuth();
  const { navigate } = useNavigation<any>();

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
      </Container>
    </SafeAreaView>

  );
};
