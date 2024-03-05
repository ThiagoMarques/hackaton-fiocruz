import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
`;

export const Logo = styled.Image`
  width: ${RFValue(240)}px;
  height: ${RFValue(240)}px;
  margin-bottom: ${RFValue(12)}px;
`;

export const SignInButton = styled.TouchableOpacity`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.primary};
`;

export const SignInTitle = styled.Text`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: ${RFValue(12)}px;
  padding: ${RFValue(16)}px;
  border-radius: 8px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

export const CardButton = styled.View`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CreateAccount = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.bg};
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.bg};
  padding: 16px 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};
  margin-left: 16px;
`;
