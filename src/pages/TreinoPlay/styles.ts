import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding-bottom: ${RFValue(20)}px;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export const ContainerInstructions = styled.View`
  flex: 2;
  justify-content: center;
  padding: ${RFValue(24)}px;
`;

export const InstructionsTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blue800};
  padding-bottom: ${RFValue(20)}px;
`;

export const InstructionsText = styled.Text`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.blue800};
`;

export const InstructionsButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  height: ${RFPercentage(12)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg};
  justify-content: center;
  align-items: center;
  margin-top: ${RFValue(80)}px;
`;

export const InstructionsButtonTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
`;
