import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";

import { groupsGetAll } from "./groupsGetAll";

export const groupRemoveByName = async (groupToDelete: string) => {
  try {
    const storedGroups = await groupsGetAll();

    const newGroups = storedGroups.filter((group) => group !== groupToDelete);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(newGroups));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupToDelete}`);
  } catch (error) {
    throw error;
  }
};
