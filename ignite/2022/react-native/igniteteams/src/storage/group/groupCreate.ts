import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroupName: string) {
  try {
    const storedGroups = await groupsGetAll();

    const groupExists = storedGroups.includes(newGroupName);

    if (groupExists) {
      throw new AppError("Já existe um grupo com esse nome.");
    }

    const newGroupArray = JSON.stringify([...storedGroups, newGroupName]);

    await AsyncStorage.setItem(GROUP_COLLECTION, newGroupArray);
  } catch (error) {
    throw error;
  }
}
