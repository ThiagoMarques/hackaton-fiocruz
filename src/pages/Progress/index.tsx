import React, { useEffect, useState } from 'react';
import {
  CardMain,
  CardSecondary,
  CardSecondaryItem,
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
  ProfileButton,
  ProfileButtonTitle,
  UserAvatar,
  UserAvatarButton,
  UserInfoDetail,
} from './styles';
import avatarDefault from '../../assets/avatar02.png';
import { useAuth } from '../../context/AuthContext';
import { Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface Log {
  email: string;
  finishedAt: string;
  firstAccess: string;
  id: string;
  lastLogin: string;
  programDuration: string;
  programName: string;
}

export const Progress: React.FunctionComponent = () => {
  const [record, setRecord] = useState(0);
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  const [spentTime, setSpentTime] = useState(0);
  const authContext = useAuth();
  const { navigate } = useNavigation<any>();
  const [loading, setLoading] = React.useState(false);
  const handleRegister = () => {
    navigate('Register');
  };

  useEffect(() => {
    getProgramsSessions();
  }, []);

  const calculateConsecutiveDays = (logs: any) => {
    logs.sort(
      (a: Log, b: Log) =>
        new Date(a.finishedAt).getTime() - new Date(b.finishedAt).getTime(),
    );

    let consecutiveDays = 0;

    for (let i = 0; i < logs.length - 1; i++) {
      const currentDay = new Date(logs[i].finishedAt).getDate();
      const nextDay = new Date(logs[i + 1].finishedAt).getDate();

      if (nextDay - currentDay === 1) {
        consecutiveDays++;
      } else {
        break; // Interromper a iteração se não houver dias consecutivos
      }
    }

    return consecutiveDays;
  };

  const calculateTotalDuration = (logs: any) => {
    let totalDurationInSeconds = 0;

    logs.forEach((log: any) => {
      const durationParts = log.programDuration.split(':').map(Number);
      if (durationParts.every((part: any) => !isNaN(part))) {
        const [minutes, seconds] = durationParts;
        const calcMinutes = minutes ? minutes : 0;
        const calcSeconds = seconds ? seconds : 0;
        totalDurationInSeconds += calcMinutes * 60 + calcSeconds;
      } else {
        console.log('Formato de duração inválido para:', log.programDuration);
      }
    });
    const totalDurationInMinutes = totalDurationInSeconds / 60;
    const roundedTotalDurationInMinutes = Math.floor(totalDurationInMinutes);
    return roundedTotalDurationInMinutes;
  };

  async function getProgramsSessions() {
    setLoading(true);
    const arrayPrograms: any[] = [];
    const sessionRef = collection(authContext.db, 'sessions');
    const qData = query(
      sessionRef,
      where('email', '==', authContext.user.email),
    );
    getDocs(qData)
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          arrayPrograms.push(doc.data());
        });
        setRecord(arrayPrograms.length);
        const consecutiveDays = calculateConsecutiveDays(arrayPrograms);
        setConsecutiveDays(consecutiveDays);
        const totalDurationInMinutes = calculateTotalDuration(arrayPrograms);
        setSpentTime(totalDurationInMinutes);
        setLoading(false);
      })
      .catch(error => {
        console.log('Erro ao buscar documentos:', error);
      });
  }



  const handleSignOut = () => {
    Alert.alert('Tem certeza?', 'Deseja sair realmente da aplicação?', [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Sair',
        onPress: () => authContext.signOutApp(),
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
              <ContainMain> {consecutiveDays} </ContainMain>
              <ContainMainText>
                {' '}
                {consecutiveDays === 1 ? 'Dia seguido' : 'Dias seguidos'}{' '}
              </ContainMainText>
            </UserInfoDetail>
          </CardMain>
          <CardSecondary>
            <CardSecondaryItem>
              <CountNumber>{record}</CountNumber>
              <CountDescription>{'Sessões'}</CountDescription>
            </CardSecondaryItem>
            <CardSecondaryItem>
              <CountNumber>
                {spentTime}
                <CountMinutes>{'m'}</CountMinutes>
              </CountNumber>
              <CountDescription>{'Tempo'}</CountDescription>
            </CardSecondaryItem>
            <CardSecondaryItem>
              <CountNumber>{record}</CountNumber>
              <CountDescription>{'Recorde'}</CountDescription>
            </CardSecondaryItem>
          </CardSecondary>
          <ContainerButtons>
            <ProfileButton onPress={() => getProgramsSessions()}>
              <ProfileButtonTitle>
                {loading ? 'Carregando...' : 'Atualizar progresso'}
              </ProfileButtonTitle>
            </ProfileButton>
            <ProfileButton onPress={() => handleRegister()}>
              <ProfileButtonTitle>Editar Perfil</ProfileButtonTitle>
            </ProfileButton>
            <ProfileButton onPress={() => handleSignOut()}>
              <ProfileButtonTitle>Sair</ProfileButtonTitle>
            </ProfileButton>
          </ContainerButtons>
          <ContainerUserLogged>
            <ContainerUserLoggedText>
              {authContext.user.email}
            </ContainerUserLoggedText>
          </ContainerUserLogged>
        </ScrollView>
      </ContainerInfo>
    </Container>
  );
};
