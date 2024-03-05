import React, { useEffect, useState } from 'react';
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
  ContainerButtons,
  ContainerInfo,
  ContainerUserLogged,
  ContainerUserLoggedText,
  CountDescription,
  CountMinutes,
  CountNumber,
  Header,
  Icon,
  LogoutButton,
  ProfileButton,
  ProfileButtonTitle,
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
import { collection, getDocs, query, where } from 'firebase/firestore';

export const Conquistas: React.FunctionComponent = () => {
  const authContext = useAuth();
  console.log('>>>', authContext.db);
  const { user, signOutApp } = useAuth();
  const { navigate } = useNavigation<any>();
  const handleRegister = () => {
    navigate('Register');
  };

  async function getProgramsSessions() {
    console.log('Iniciando...');
    const sessionRef = collection(authContext.db, 'sessions');

    // Create a query against the collection.
    const q = query(
      sessionRef,
      where('email', '==', 'thiagossmarques@gmail.com'),
    );
    getDocs(q)
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, ' => ', doc.data());
        });
      })
      .catch(error => {
        console.log('Erro ao buscar documentos:', error);
      });
  }

  getProgramsSessions();

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
          <ContainerButtons>
            <ProfileButton onPress={() => getProgramsSessions()}>
              <ProfileButtonTitle>Atualizar dados</ProfileButtonTitle>
            </ProfileButton>
            <ProfileButton onPress={() => handleRegister()}>
              <ProfileButtonTitle>Editar perfil</ProfileButtonTitle>
            </ProfileButton>
            <ProfileButton onPress={() => handleSignOut()}>
              <ProfileButtonTitle>Sair</ProfileButtonTitle>
            </ProfileButton>
          </ContainerButtons>
          <ContainerUserLogged>
            <ContainerUserLoggedText>thiagossmarques@gmail.com</ContainerUserLoggedText>
          </ContainerUserLogged>
        </ScrollView>
      </ContainerInfo>
    </Container>
  );
};
