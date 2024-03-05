import React from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Form/Button';
import {
  CardButton,
  Container,
  Content,
  CreateAccount,
  CreateAccountTitle,
  Icon,
  Logo,
  SignInButton,
  SignInTitle,
  Title,
} from './styles';
import logo from '../../assets/logo.jpg';
import { InputControl } from '../../components/Form/InputControl';
import { useAuth } from '../../context/AuthContext';

interface ScreenNavigationProp {
  navigate: (screen: string) => void;
  goBack: () => void;
}

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  email: yup.string().email('Email inválido.').required('Informe o email.'),
});

export const ForgotPassword: React.FunctionComponent = () => {
  const authContext = useAuth();
  const { navigate } = useNavigation<ScreenNavigationProp>();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(formSchema),
  });

  const handleForgotPassword = async (form: IFormInputs) => {
    const data = {
      email: form.email,
    };
    try {
      authContext.forgotPassword(data);
    } catch (error: any) {
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, verifique as credenciais.',
      );
      navigate('SignIn');
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Content>
            <Logo source={logo} />
            <View>
              <Title>Recupere sua senha</Title>
            </View>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              error={errors.email && errors.email.message}
            />
            <CardButton>
              <SignInButton onPress={handleSubmit(handleForgotPassword)}>
                <SignInTitle>Criar conta</SignInTitle>
              </SignInButton>
            </CardButton>
          </Content>
        </Container>
      </ScrollView>
      <CreateAccount
        onPress={() => {
          navigate('SignIn');
        }}
      >
        <Icon name="arrow-left" />
        <CreateAccountTitle>Voltar para login</CreateAccountTitle>
      </CreateAccount>
    </KeyboardAvoidingView>
  );
};
