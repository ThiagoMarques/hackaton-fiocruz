import { FlatList, FlatListProps } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding-bottom: ${RFValue(20)}px;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export const ContainerDetail = styled.View`
  display: flex;
  padding: ${RFValue(24)}px;
`;

export const TrainingTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blue800};
  padding-bottom: ${RFValue(20)}px;
`;

export const TrainingText = styled.Text`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.blue800};
`;

export const TrainingDuration = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.blue800};
  padding-top: ${RFValue(20)}px;
`;

export const TrainingButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  height: ${RFPercentage(12)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg};
  justify-content: center;
  align-items: center;
  margin-top: ${RFValue(80)}px;
  border: 2px solid ${({ theme }) => theme.colors.blue800};
  border-radius: 20px;
`;

export const TrainingButtonTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
`;
