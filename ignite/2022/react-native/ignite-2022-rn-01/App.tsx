import { StatusBar } from "react-native";
import { Todolist } from "./src/screens/Todolist";

function App() {
 return (
  <>
    <Todolist />
    <StatusBar barStyle="light-content" />
  </>
 )
}

export default App;
