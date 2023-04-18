import { TextInput, TextInputProps } from "react-native";
import styles from "./styles";

export function Input(props: TextInputProps) {
  return <TextInput style={styles.input} {...props} />;
}
