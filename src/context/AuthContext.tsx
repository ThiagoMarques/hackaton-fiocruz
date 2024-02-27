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
import { collection, getDocs, getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyBtvSwOaYtT5jV8bveev-TGc0sUB63pWj4',
  authDomain: 'acalma-sus.firebaseapp.com',
  projectId: 'acalma-sus',
  storageBucket: 'acalma-sus.appspot.com',
  messagingSenderId: '42786548078',
  appId: '1:42786548078:web:5620a45bf35bee80ecb97f',
  measurementId: 'G-FKDN1788XC',
};

interface ICredentials {
  email: string;
  password: string;
  name?: string;
}
interface IAuthContext {
  user: any;
  programData: any;
  letterData: any;
  signIn(credentials: ICredentials): void;
  signUp(credentials: ICredentials): void;
  signOutApp(): void;
  forgotPassword(email: any): void;
  getPrograms(programName: string): any;
  getLetters(): any;
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
  const [programData, setProgramData] = useState<any>(null);
  const [letterData, setLetterData] = useState<any>(null);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const { navigate } = useNavigation<ScreenNavigationProp>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  async function getPrograms(programName: string) {
    try {
      const querySnapshot = await getDocs(collection(db, 'programs'));
      let program = {};

      for (const doc of querySnapshot.docs) {
        const programs = doc.data();
        if (programs.id === programName) {
          program = JSON.parse(JSON.stringify(doc.data()));
        }
      }
      if (program) {
        setProgramData(program);
      }
    } catch (error) {
      console.error('Erro ao buscar programa:', error);
      return null;
    }
  }

  async function getLetters() {
    try {
      const querySnapshot = await getDocs(collection(db, 'letters'));
      let letter = {};

      for (const doc of querySnapshot.docs) {
        const letters = doc.data();
        if (letters) {
          letter = JSON.parse(JSON.stringify(doc.data()));
          console.log("🚀 ~ getLetters ~ letter:", letter)
        }
      }
      if (letter) {
        setLetterData(letter);
      }
    } catch (error) {
      console.error('Erro ao buscar carta:', error);
      return null;
    }
  }

  const signIn = async ({ email, password }: ICredentials) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, verifique as credenciais.',
      );
      console.error('Authentication error:', error.message);
    }
  };

  const signUp = async ({ email, password }: ICredentials) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
    <AuthContext.Provider
      value={{
        user,
        programData,
        letterData,
        signIn,
        signUp,
        signOutApp,
        forgotPassword,
        getPrograms,
        getLetters,
      }}
    >
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
