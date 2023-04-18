import React from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import {
  Container,
  IconContainer,
  InputText,
  VisibilityButton
} from "./styles";
import { useState } from "react";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

const PasswordInput: React.FC<InputProps> = ({ iconName, value, ...rest }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  const theme = useTheme();

  function handleOnFocus() {
    setFocused(true);
  }

  function handleOnBlur() {
    setFocused(false);
    setFilled(!!value);
  }

  function handlePasswordVisibility() {
    setPasswordVisible((prevState) => !prevState);
  }

  return (
    <Container>
      <IconContainer focused={focused}>
        <Feather
          name={iconName}
          size={24}
          color={
            focused || filled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>

      <InputText
        focused={focused}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        secureTextEntry={!passwordVisible}
        {...rest}
      />

      <VisibilityButton onPress={handlePasswordVisibility}>
        <IconContainer focused={focused}>
          <Feather
            name={passwordVisible ? "eye-off" : "eye"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </VisibilityButton>
    </Container>
  );
};

export default PasswordInput;
