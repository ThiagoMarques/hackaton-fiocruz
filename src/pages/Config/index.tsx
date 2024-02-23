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

import avatarDefault from '../../assets/avatar02.png';
import { useAuth } from '../../context/AuthContext';
import { Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '../../routes/app.routes';

export const Config: React.FunctionComponent = () => {
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
              <UserName>
                {user.displayName ? user.displayName : user.email}
              </UserName>
            </UserInfoDetail>
          </CardMain>
          <CardUserButton onPress={() => handleRegister()}>
            <CardUserButtonTitle>Editar cadastro</CardUserButtonTitle>
          </CardUserButton>
          <CardUserButton onPress={() => {}}>
            <CardUserButtonTitle>Trocar senha</CardUserButtonTitle>
          </CardUserButton>
          <CardUserButton onPress={() => {}}>
            <CardUserButtonTitle>Sair</CardUserButtonTitle>
          </CardUserButton>
        </ScrollView>
      </ContainerInfo>
    </Container>
  );
};
