import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Container, IconContainer, InputText } from "./styles";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

const Input: React.FC<InputProps> = ({ iconName, value, ...rest }) => {
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
        {...rest}
      />
    </Container>
  );
};

export default Input;
