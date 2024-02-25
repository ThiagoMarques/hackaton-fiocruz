import { FlatList, FlatListProps } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bg};
`;
export const Header = styled.View`
  display: flex;
  width: 100%;
  height: ${RFPercentage(16)}px;

  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const TrainingTouchableOpacity = styled.View`
  padding: ${RFPercentage(1)}px;
`;

export const ImageHeaderTraining = styled.Image`
  height: ${RFPercentage(4)}px;
  width: ${RFPercentage(4)}px;
`;

export const TrainingText = styled.Text`
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;


export const TrainingView = styled.View`
  height: 96;
  padding: 0 24px;
  flex-direction: 'row';
  align-items: 'center';
  background-color: ${({ theme }) => theme.colors.primary};
`;











export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: ${RFValue(52)}px;
  height: ${RFValue(52)}px;
  border-radius: 10px;
`;

export const UserInfoDetail = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray800};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(28)}px;
  color: ${({ theme }) => theme.colors.dark};
`;

export const LogoutButton = styled.TouchableOpacity``;

export const UserList = styled(
  FlatList as new (props: FlatListProps<any>) => FlatList<any>,
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showVerticalScrollIndicator: false,
})``;
