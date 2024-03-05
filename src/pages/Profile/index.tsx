import React from 'react';
import {
  CardMain,
  CardUserButton,
  CardUserButtonTitle,
  Container,
  ContainerInfo,
  UserAvatar,
  UserAvatarButton,
  UserInfoDetail,
  UserName,
} from './styles';

import avatarDefault from '../../assets/avatar02.png';
import { useAuth } from '../../context/AuthContext';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Profile: React.FunctionComponent = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation<any>();
  const handleRegister = () => {
    navigate('Register');
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
