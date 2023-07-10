import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

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
  useToast,
} from "native-base";

const PHOTO_SIZE = 32;

export function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/guihendias.png"
  );

  const toast = useToast();

  async function handleUserPhotoSelection() {
    setIsLoading(true);

    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (selectedPhoto.canceled) {
        return;
      }

      const photoUri = selectedPhoto.assets[0].uri;

      if (photoUri) {
        const photoInfo = await FileSystem.getInfoAsync(photoUri);

        const photoSizeInMB = photoInfo.size / 1024 / 1024;

        if (photoInfo.size && photoSizeInMB >= 3) {
          return toast.show({
            title: "A imagem deve ter no máximo 3MB",
            placement: "top",
            bgColor: "red.500",
          });
        }

        setUserPhoto(photoUri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

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
              source={{ uri: userPhoto }}
              alt="Imagem de perfil"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelection}>
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
