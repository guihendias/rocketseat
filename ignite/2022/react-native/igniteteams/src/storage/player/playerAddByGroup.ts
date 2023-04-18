import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { PLAYER_COLLECTION } from "@storage/storageConfig";

import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playerGetByGroup } from "./playerGetByGroup";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playerGetByGroup(group);

    const playerExists = storedPlayers.some(
        (player) => player.name === newPlayer.name
    );

    if (playerExists) {
        throw new AppError("Esse jogador já está em um time");
    }

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify([...storedPlayers, newPlayer])
    );
  } catch (error) {
    throw error;
  }
}
