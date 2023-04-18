import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ClipboardText , PlusCircle, Trash } from "phosphor-react-native";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import Check from "../../assets/checkbox.svg";

import styles from "./styles";

const TODO_LIST = [
  {
    id: 1,
    title: "Fazer café",
    isCompleted: false
  },
  {
    id: 2,
    title: "Estudar React",
    isCompleted: false
  },
  {
    id: 3,
    title: "Estudar Next",
    isCompleted: false
  }
];

export function Todolist() {
  const [todos, setTodos] = useState(TODO_LIST);
  const [inputValue, setInputValue] = useState("");

  function handleTodoClick(todoId: number) {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        };
      }

      return todo;
    });

    setTodos(newTodos);
  }

  function handleDeleteTodo(todoId: number) {
    const newTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(newTodos);
  }

  function handleSubmit() {
    const newTodo = {
      id: Math.random(),
      title: inputValue,
      isCompleted: false
    };

    setInputValue("");
    setTodos((state) => [...state, newTodo]);
  }

  const isCompletedCount = todos.filter((todo) => todo.isCompleted).length;
  const todosCount = todos.length;

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <View style={styles.form} >
          <Input
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Adicione uma nova tarefa"
            placeholderTextColor="#808080"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <PlusCircle size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.todoListContainer}>
          <View style={styles.todoListHeader}>
            <View style={styles.headerTextContainer}>
                <Text style={[styles.headerText, styles.blueText]}>
                    Tarefas criadas 
                </Text>
                <View style={styles.badgeContainer}>
                    <Text style={styles.badge}>{todosCount}</Text>
                </View>
            </View>

            <View style={styles.headerTextContainer}>
                <Text style={[styles.headerText, styles.purpleText]}>
                    Concluídas 
                </Text>
                <View style={styles.badgeContainer}>
                    <Text style={styles.badge}>{isCompletedCount}</Text>
                </View>
            </View>
          </View>
          
          {todosCount === 0 ? 
            <View style={styles.emptyTodoList}>
                <ClipboardText size={64} color="#333" />
                <Text style={[styles.emptyTodoListText]}>Você ainda não tem tarefas cadastradas</Text>
                <Text style={styles.descriptionText}>Crie tarefas e organize seus itens a fazer</Text>
            </View> 
           : <ScrollView contentContainerStyle={styles.todoList}>
             {todos.map((todo) => (
               <View key={todo.id} style={styles.todoItem}>

                 <TouchableOpacity onPress={() => handleTodoClick(todo.id)} style={{ flex: 1, flexDirection: 'row' }}>

                   <View style={todo.isCompleted ? styles.todoItemIconCompleted : styles.todoItemIcon}>
                        {todo.isCompleted && <Check />}
                    </View>
                   <Text style={todo.isCompleted ? styles.todoCompletedText : styles.todoItemText}>{todo.title}</Text>
                 </TouchableOpacity>
                 <TouchableOpacity
                    onPress={() => handleDeleteTodo(todo.id)} 
                >
                    <Trash size={18} color="#808080" />
                </TouchableOpacity>
               </View>
             ))}
           </ScrollView>}
        </View>
      </View>
    </View>
  );
}
