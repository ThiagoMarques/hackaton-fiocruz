import React from 'react';
import {
  CardButton,
  Container,
  ContainerRegister,
  Content,
  Header,
  Icon,
  LogoutButton,
  SignInButton,
  SignInTitle,
  Title,
  UserInfo,
  UserWrapper,
} from './styles';

import { useAuth } from '../../context/AuthContext';
import { Alert, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InputControl } from '../../components/Form/InputControl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { updateProfile } from 'firebase/auth';
import { Logo } from '../SignIn/styles';
import logo from '../../assets/logo.jpg';

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  name: yup.string().required('Informe o nome completo.'),
});

export const Register: React.FunctionComponent = () => {
  const { user } = useAuth();
  const { goBack } = useNavigation<any>();
  const handleGoBack = () => {
    goBack();
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(formSchema),
  });

  const updateUserProfile = async (form: IFormInputs) => {
    const data = {
      name: form.name,
    };
    try {
      await updateProfile(user, { displayName: data.name });
      Alert.alert(
        'Cadastro atualizado com sucesso!',
        'Faça o logout da aplicação para aplicar as mudanças.',
      );
      goBack();
    } catch (error: any) {
      Alert.alert(
        'Erro ao atualizar cadastro',
        'Ocorreu um erro ao criar seu usuário, verifique os dados inseridos.',
      );
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <LogoutButton onPress={handleGoBack}>
              <Icon name="arrow-left" />
            </LogoutButton>
          </UserInfo>
        </UserWrapper>
      </Header>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <ContainerRegister>
          <Content>
            <Logo source={logo} />
            <View></View>
            <Title>Edite os dados da sua conta</Title>
            <InputControl
              autoCorrect={false}
              control={control}
              name="name"
              placeholder="Nome Completo"
              error={errors.name && errors.name.message}
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              error={errors.name && errors.name.message}
            />
            <CardButton>
              <SignInButton onPress={handleSubmit(updateUserProfile)}>
                <SignInTitle>Entrar</SignInTitle>
              </SignInButton>
            </CardButton>
          </Content>
        </ContainerRegister>
      </ScrollView>
    </Container>
  );
};
