import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { FlatList, FlatListProps } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export const CardMain = styled.View`
  height: ${RFPercentage(1400)}px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-top: ${RFValue(130)}px;
  margin-bottom: ${RFValue(20)}px;
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
`;

export const CardUser = styled.View`
  height: ${RFPercentage(12)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-top: ${RFValue(14)}px;
  margin-left: ${RFValue(14)}px;
  margin-right: ${RFValue(14)}px;
  /* padding: ${RFValue(28)}px; */
  border-radius: 8px;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(17)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-top: ${RFValue(28)}px;
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserInfoDetail = styled.View`
  display: flex;
  margin-top: ${RFPercentage(8)}px;
  /* margin-left: 20px; */
`;

export const UserAvatarButton = styled.TouchableOpacity`
  position: absolute;
  top: ${RFValue(-30)}px;
`;

export const UserAvatar = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  border-radius: 10px;
`;

export const CardUserButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  height: ${RFPercentage(12)}px;
  width: 80%;
  background-color: ${({ theme }) => theme.colors.bg};
  justify-content: center;
  align-items: center;
  margin-top: ${RFValue(80)}px;
  margin-left: ${RFValue(14)}px;
  margin-right: ${RFValue(14)}px;
  border: 2px solid ${({ theme }) => theme.colors.blue800};
  border-radius: 20px;
`;

export const CardUserButtonTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blue800};
  padding-left: 12px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray800};
  margin-top: ${RFValue(50)}px;
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

// export const UserListEmpty = styled.Text`
//   font-size: ${RFValue(18)}px;
//   font-family: ${({ theme }) => theme.fonts.regular};
//   color: ${({ theme }) => theme.colors.gray500};
// `;

// export const UserListHeader = styled.Text`
//   font-size: ${RFValue(24)}px;
//   font-family: ${({ theme }) => theme.fonts.bold};
//   font-weight: bold;
//   color: ${({ theme }) => theme.colors.primary};
//   margin-bottom: ${RFValue(8)}px;
// `;