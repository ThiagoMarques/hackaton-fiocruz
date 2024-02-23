import React from 'react';
import {
  BackToolSignIn,
  BackToolSignInTitle,
  Container,
  Content,
  Icon,
  Title,
} from './styles';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Form/Button';

import logo from '../../assets/logo.jpg';
import { Logo } from '../SignIn/styles';
import { InputControl } from '../../components/Form/InputControl';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from '@firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBqMRR_AJj0HjOpf57wCNLaCcdIH7I3z7k',
  authDomain: 'regularium-app.firebaseapp.com',
  projectId: 'regularium-app',
  storageBucket: 'regularium-app.appspot.com',
  messagingSenderId: '131805928281',
  appId: '1:131805928281:web:bdeb188c92c8cc84578a48',
  measurementId: 'G-73X8CQH64S',
};

interface ScreenNavigationProp {
  navigate: (screen: string) => void;
}
interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  name: yup.string().required('Informe o nome completo.'),
  email: yup.string().email('Email inválido.').required('Informe o email.'),
  password: yup.string().required('Informe a senha.'),
});

export const SignUp: React.FunctionComponent = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [user, setUser] = useState(null); // Track user authentication state
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSignUp = async (form: IFormInputs) => {
    const data = {
      name: form.name,
      email: form.email,
      password: form.password,
    };
    console.log('data', data);
    try {
      if (user) {
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password,
        ).then(userCred => {
          updateProfile(userCred.user, { displayName: data.name });
        });
        await signOut(auth);
      }
    } catch (error: any) {
      Alert.alert(
        'Erro ao criar usuário',
        'Ocorreu um erro ao criar seu usuário, verifique os dados inseridos.',
      );
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
            <View></View>
            <Title>Crie sua conta</Title>
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
              error={errors.email && errors.email.message}
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              control={control}
              name="password"
              placeholder="Senha"
              error={errors.password && errors.password.message}
            />
            <Button title="Criar conta" onPress={handleSubmit(handleSignUp)} />
          </Content>
        </Container>
      </ScrollView>
      <BackToolSignIn
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      >
        <Icon name="arrow-left" />
        <BackToolSignInTitle>Voltar para login</BackToolSignInTitle>
      </BackToolSignIn>
    </KeyboardAvoidingView>
  );
};
