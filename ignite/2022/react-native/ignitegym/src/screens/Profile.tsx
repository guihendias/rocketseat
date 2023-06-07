import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const PHOTO_SIZE = 32;

export function Profile() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center mt={6} px={10}>
          {isLoading ? (
            <Skeleton
              height={PHOTO_SIZE}
              width={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="end.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: "https://github.com/guihendias.png" }}
              alt="Imagem de perfil"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg="gray.600" />

          <Input placeholder="E-mail" bg="gray.600" isDisabled />
        </Center>

        <VStack mt={12} mb={12} px={10}>
          <Heading color="gray.100" fontSize="md" mb={2}>
            Alterar senha
          </Heading>

          <Input bg="gray.600" placeholder="Senha atual" secureTextEntry />

          <Input bg="gray.600" placeholder="Nova senha" secureTextEntry />

          <Input bg="gray.600" placeholder="Confirmar senha" secureTextEntry />

          <Button mt={6} onPress={() => {}} title="Atualizar" />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
