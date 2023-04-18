import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";

import { Container, Form, HeaderList, PlayersNumber } from "./styles";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroup } from "@storage/player/playerGetByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
  group: string;
};

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const [team, setTeam] = useState<string>("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const route = useRoute();
  const navigation = useNavigation();

  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    if (newPlayerName.trim() === "") {
      return Alert.alert("Novo jogador", "Informe o nome do jogador");
    }

    const newPlayer = {
      name: newPlayerName,
      team
    };

    try {
      await playerAddByGroup(newPlayer, group);
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo jogador", error.message);
      } else {
        Alert.alert("Novo jogador", "Não foi possível adicionar o jogador");
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Jogadores", error.message);
      } else {
        Alert.alert("Jogadores", "Não foi possível buscar os jogadores");
      }
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Remover jogador", error.message);
      } else {
        Alert.alert("Remover jogador", "Não foi possível remover o jogador");
      }
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      
      navigation.navigate('groups')
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Remover grupo", error.message);
      } else {
        Alert.alert("Remover grupo", "Não foi possível remover o grupo");
      }
    }
  }

  async function handleGroupRemove() {
    Alert.alert("Remover grupo", "Deseja realmente remover o grupo?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress: groupRemove
      }
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          onChangeText={setNewPlayerName}
          autoCorrect={false}
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <Filter title="Time A" />

      <HeaderList>
        <FlatList
          horizontal
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />

        <PlayersNumber>{players.length}</PlayersNumber>
      </HeaderList>

      <FlatList
        data={players}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <ListEmpty message="Nenhum jogador encontrado" />
        )}
      />

      <Button title="Remover turma" type="secondary" />
    </Container>
  );
}
