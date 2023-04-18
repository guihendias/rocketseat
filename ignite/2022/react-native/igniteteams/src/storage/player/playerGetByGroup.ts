import AsyncStorage from "@react-native-async-storage/async-storage";

import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYER_COLLECTION } from "@storage/storageConfig";

export async function playerGetByGroup(group: string) {
  try {
    const storedPlayers =
      (await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)) || "[]";

    const players: PlayerStorageDTO[] = JSON.parse(storedPlayers);

    return players;
  } catch (error) {
    throw error;
  }
}
