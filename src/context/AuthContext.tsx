import React from 'react';
import moment from 'moment';
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
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyBtvSwOaYtT5jV8bveev-TGc0sUB63pWj4',
  authDomain: 'acalma-sus.firebaseapp.com',
  projectId: 'acalma-sus',
  storageBucket: 'acalma-sus.appspot.com',
  messagingSenderId: '42786548078',
  appId: '1:42786548078:web:5620a45bf35bee80ecb97f',
  measurementId: 'G-FKDN1788XC',
};

interface UserData {
  _redirectEventId?: any;
  apiKey: string;
  appName: string;
  createdAt: any;
  displayName?: any;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: any;
  phoneNumber?: any;
  photoURL?: any;
  providerData: ProviderData[];
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
  tenantId?: any;
  uid: string;
}
interface ProviderData {
  id: string;
  email: string;
}
interface ICredentials {
  email: string;
  password: string;
  name?: string;
}
interface IAuthContext {
  user: any;
  programData: any;
  letterData: any;
  db: any;
  signIn(credentials: ICredentials): void;
  signUp(credentials: ICredentials): void;
  signOutApp(): void;
  forgotPassword(email: any): void;
  getPrograms(programName: string): any;
  getLetters(): any;
  saveProgramSession(programName: string, programDuration: string): any;
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
  const [user, setUser] = useState<UserData>();
  const [programData, setProgramData] = useState<any>(null);
  const [letterData, setLetterData] = useState<any>(null);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const { navigate } = useNavigation<ScreenNavigationProp>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setUser(user.toJSON());
    });
    return () => unsubscribe();
  }, [auth]);

  async function getPrograms(programName: string) {
    console.log('programName', programName);
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

  async function saveProgramSession(
    programName: string,
    programDuration: string,
  ) {
    const now = moment();
    const collectionData = 'sessions';

    if (user) {
      const userData = {
        id: user.uid ? user.uid : '',
        email: user.email ? user.email : '',
        firstAccess: +user.createdAt,
        lastLogin: +user.lastLoginAt,
      };
      await addDoc(collection(db, collectionData), {
        id: userData.id,
        email: userData.email,
        firstAccess: new Date(userData.firstAccess).toISOString(),
        lastLogin: new Date(userData.lastLogin).toISOString(),
        finishedAt: now.toISOString(),
        programName: programName,
        programDuration: programDuration,
      });
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
        setUser(undefined);
        navigate('SignIn');
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
        db,
        signIn,
        signUp,
        signOutApp,
        forgotPassword,
        getPrograms,
        getLetters,
        saveProgramSession,
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
