import React from 'react';
import {
  CardMain,
  CardUserButton,
  CardUserButtonTitle,
  Container,
  Icon,
  UserAvatar,
  UserAvatarButton,
  UserInfoDetail,
  UserName,
} from './styles';

import logoDefault from '../../assets/logo.jpg';
import { useAuth } from '../../context/AuthContext';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Home: React.FunctionComponent = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation<any>();
  const handleLetter = () => {
    navigate('Letter');
  };

  return (
    <Container>
      <ScrollView>
        <CardMain>
          <UserAvatarButton onPress={() => {}}>
            <UserAvatar source={logoDefault} />
          </UserAvatarButton>
          <UserInfoDetail>
            <UserName>Bem-vindo,</UserName>
            <UserName>
              {user.displayName ? user.displayName : user.email}!
            </UserName>
          </UserInfoDetail>
          <CardUserButton onPress={() => handleLetter()}>
            <Icon name="mail" />
            <CardUserButtonTitle>
              Carta do seu profissional de saúde
            </CardUserButtonTitle>
          </CardUserButton>
        </CardMain>
      </ScrollView>
    </Container>
  );
};
