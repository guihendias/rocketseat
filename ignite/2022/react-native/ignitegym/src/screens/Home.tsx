import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { VStack, Text, HStack, FlatList, Heading } from "native-base";
import { useState } from "react";

export function Home() {
  const [groups, setGroups] = useState([
    "Ombro",
    "Costas",
    "Biceps",
    "Triceps",
    "Pernas",
    "Peito",
    "Abdomen",
    "Cardio",
  ]);
  const [exercises, setExercises] = useState([
    {
      name: "Remada",
      description: "3 séries de 10 repetições",
      image:
        "https://i.pinimg.com/originals/0f/6e/9e/0f6e9e1b2b5b5b0b0b0b0b0b0b0b0b0b.jpg",
    },
  ]);

  const [selectedGroup, setSelectedGroup] = useState("Costas");

  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise");
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={selectedGroup === item}
            onPress={() => setSelectedGroup(item)}
          />
        )}
        _contentContainerStyle={{
          px: 4,
        }}
        my={4}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={4}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
