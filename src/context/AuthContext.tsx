import React from 'react';
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from '@firebase/auth';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const firebaseConfig = {
  apiKey: 'AIzaSyBqMRR_AJj0HjOpf57wCNLaCcdIH7I3z7k',
  authDomain: 'regularium-app.firebaseapp.com',
  projectId: 'regularium-app',
  storageBucket: 'regularium-app.appspot.com',
  messagingSenderId: '131805928281',
  appId: '1:131805928281:web:bdeb188c92c8cc84578a48',
  measurementId: 'G-73X8CQH64S',
};

interface ICredentials {
  email: string;
  password: string;
}
interface IAuthContext {
  user: any;
  signIn(credentials: ICredentials): void;
  signOutApp(): void;
  forgotPassword(email: any): void;
}

interface ScreenNavigationProp {
  navigate: (screen: string) => void;
}

interface IProps {
  children: React.ReactElement;
}

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext,
);

export const AuthProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const { navigate } = useNavigation<ScreenNavigationProp>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const signIn = async ({ email, password }: ICredentials) => {
    try {
      console.log('User logged in!');
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, verifique as credenciais.',
      );
      console.error('Authentication error:', error.message);
    }
  };

  const signOutApp = async () => {
    try {
      if (user) {
        console.log('User logged out successfully!');
        await signOut(auth);
      }
    } catch (error: any) {
      Alert.alert(
        'Erro ao fazer logoff',
        'Ocorreu um erro ao fazer logoff, tente novamente.',
      );
      console.error('Authentication error:', error.message);
    }
  };

  const forgotPassword = async ({ email }: any) => {
    try {
      await sendPasswordResetEmail(auth, email).then(() => {
        Alert.alert('Sucesso!', 'Verifique sua caixa de entrada!');
        navigate('SignIn');
      });
    } catch (error: any) {
      Alert.alert('Erro ao enviar e-mail', 'Verifique o e-mail digitado.');
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOutApp, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado em AuthProvider');
  }

  return context;
};
