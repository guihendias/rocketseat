import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

const Button: React.FC<Props> = ({
  title,
  color,
  loading = false,
  light = false,
  enabled,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Container
      {...rest}
      color={color ? color : theme.colors.main}
      style={{ opacity: !enabled || loading ? 0.5 : 1 }}
      enabled={enabled && !loading}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
};

export default Button;
