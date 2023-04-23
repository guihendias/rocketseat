import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {};

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/0f/6e/9e/0f6e9e1b2b5b5b0b0b0b0b0b0b0b0b0b.jpg",
          }}
          alt="Exercício"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="center"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white">
            Remada
          </Heading>

          <Text color="gray.200" fontSize="sm" mt={1} numberOfLines={2}>
            3 séries de 10 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" ml="auto" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
