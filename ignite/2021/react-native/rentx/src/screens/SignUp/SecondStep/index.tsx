import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import BackButton from "../../../components/BackButton";
import Bullet from "../../../components/Bullet";

import {
  Container,
  Header,
  BulletsContainer,
  Title,
  Subtitle,
  Form,
  FormTitle
} from "./styles";
import Button from "../../../components/Button";
import PasswordInput from "../../../components/PasswordInput";

import { useTheme } from "styled-components";
import api from "../../../services/api";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

const SecondStep: React.FC = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e sua confirmação.");
    }

    if (password !== passwordConfirm) {
      return Alert.alert("As senhas não são iguais.");
    }

    try {
      await api.post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password
      });

      navigation.navigate("Confirmation", {
        title: "Conta Criada!",
        nextScreenRoute: "SignIn",
        message: "Agora é só fazer login\ne aproveitar"
      });
    } catch (err) {
      console.log(err);
      Alert.alert("Opa", "Não foi possível cadastrar");
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <BulletsContainer>
              <Bullet />
            </BulletsContainer>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <Subtitle>Faça seu cadastro de {"\n"}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            color={theme.colors.success}
            title="Cadastrar"
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SecondStep;
