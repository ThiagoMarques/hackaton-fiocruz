import React from 'react';
import {
  CardMain,
  CardSecondary,
  CardSecondaryItem,
  CardUser,
  CardUserButton,
  CardUserButtonTitle,
  ContainMain,
  ContainMainText,
  Container,
  ContainerInfo,
  CountDescription,
  CountMinutes,
  CountNumber,
  Header,
  Icon,
  LogoutButton,
  UserAvatar,
  UserAvatarButton,
  UserGreeting,
  UserInfo,
  UserInfoDetail,
  UserName,
  UserTitle,
  UserWrapper,
} from './styles';
import { MaterialIcons } from '@expo/vector-icons';

import avatarDefault from '../../assets/avatar02.png';
import { useAuth } from '../../context/AuthContext';
import { Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '../../routes/app.routes';

export const Conquistas: React.FunctionComponent = () => {
  const { user, signOutApp } = useAuth();
  const { navigate } = useNavigation<any>();
  const handleRegister = () => {
    navigate('Register');
  };

  const handleSignOut = () => {
    Alert.alert('Tem certeza?', 'Deseja sair realmente da aplicação?', [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Sair',
        onPress: () => signOutApp(),
      },
    ]);
  };

  return (
    <Container>
      <ContainerInfo>
        <ScrollView>
          <CardMain>
            <UserAvatarButton onPress={() => {}}>
              <UserAvatar source={avatarDefault} />
            </UserAvatarButton>
            <UserInfoDetail>
              <ContainMain> {'7'} </ContainMain>
              <ContainMainText> {'Dias seguidos'} </ContainMainText>
            </UserInfoDetail>
          </CardMain>
          <CardUserButton onPress={() => handleRegister()}>
            <CardUserButtonTitle>
              <MaterialIcons
                name="favorite"
                size={16}
              ></MaterialIcons>
              Compartilhe suas conquistas
            </CardUserButtonTitle>
          </CardUserButton>
          <CardSecondary>
            <CardSecondaryItem>
              <CountNumber>{'6'}</CountNumber>
              <CountDescription>{'Sessões'}</CountDescription>
            </CardSecondaryItem>
            <CardSecondaryItem>
              <CountNumber>
                {'70'}
                <CountMinutes>{'m'}</CountMinutes>
              </CountNumber>
              <CountDescription>{'Tempo'}</CountDescription>
            </CardSecondaryItem>
            <CardSecondaryItem>
              <CountNumber>{'3'}</CountNumber>
              <CountDescription>{'Recorde'}</CountDescription>
            </CardSecondaryItem>
          </CardSecondary>
        </ScrollView>
      </ContainerInfo>
    </Container>
  );
};
