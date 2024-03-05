import React from 'react';
import {
  CardMain,
  CardUser,
  CardUserButton,
  CardUserButtonTitle,
  Container,
  ContainerInfo,
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

import logoDefault from '../../assets/logo.jpg';
import { useAuth } from '../../context/AuthContext';
import { Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '../../routes/app.routes';
import { LinearGradient } from 'expo-linear-gradient';

export const Home: React.FunctionComponent = () => {
  const { user, signOutApp } = useAuth();
  const { navigate } = useNavigation<any>();
  const authContext = useAuth();
  authContext.test();
  const handleLetter = () => {
    navigate('Carta');
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
      <ScrollView>
        <CardMain>
          <UserAvatarButton onPress={() => {}}>
            <UserAvatar source={logoDefault} />
          </UserAvatarButton>
          <UserInfoDetail>
            <UserName>
              Bem-vindo, {user.displayName ? user.displayName : user.email}!
            </UserName>
          </UserInfoDetail>
          <CardUserButton onPress={() => handleLetter()}>
            <Icon name="mail" />
            <CardUserButtonTitle>Carta do seu profissional de saúde</CardUserButtonTitle>
          </CardUserButton>
        </CardMain>
      </ScrollView>
    </Container>
  );
};
