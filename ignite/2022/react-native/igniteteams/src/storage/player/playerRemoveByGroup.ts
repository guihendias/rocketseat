import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playerGetByGroup } from "./playerGetByGroup";

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storedPlayers = await playerGetByGroup(group);

    const playersWithoutSelectedPlayer = storedPlayers.filter(
      (player) => player.name !== playerName
    );

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify(playersWithoutSelectedPlayer)
    );
  } catch (error) {
    throw error;
  }
}
