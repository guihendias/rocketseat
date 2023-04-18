import { TextInput } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface Props {
  focused?: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ focused, theme }) =>
    focused &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_regular};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;

  ${({ focused, theme }) =>
    focused &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const VisibilityButton = styled(BorderlessButton)``;
