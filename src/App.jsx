// src/components/TodoList.js
import React, { useState, useEffect } from "react";
import { Box, Button, Checkbox, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./Firebase/firebase";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const allTasks = collection(db, "tasks");

  useEffect(() => {
    const fetchTasks = async () => {
      const getTasks = await getDocs(allTasks);
      const tasksList = getTasks.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksList);
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    await addDoc(allTasks, {
      text: newTask,
      completed: false,
    });
    setNewTask("");
    const getTasks = await getDocs(allTasks);
    const tasksList = getTasks.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(tasksList);
  };

  const completeTask = async (task) => {
    const taskDoc = doc(db, "tasks", task.id);
    await updateDoc(taskDoc, {
      completed: !task.completed,
    });
    // Re-fetch tasks to update the list
    const getTasks = await getDocs(allTasks);
    const tasksList = getTasks.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(tasksList);
  };

  const deleteTask = async (task) => {
    const taskDoc = doc(db, "tasks", task.id);
    await deleteDoc(taskDoc);
    const getTasks = await getDocs(allTasks);
    const tasksList = getTasks.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(tasksList);
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <Heading mb="6" textAlign="center">
        Todo List
      </Heading>
      <Flex mb="4">
        <Input placeholder="Add a new task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <Button ml="2" onClick={addTask} colorScheme="teal">
          Add
        </Button>
      </Flex>
      <Stack spacing="3">
        {tasks.map((task) => (
          <Flex key={task.id} p="2" bg={task.completed ? "green.100" : "gray.100"} borderRadius="md" align="center" justify="space-between">
            <Checkbox isChecked={task.completed} onChange={() => completeTask(task)}>
              <Text as={task.completed ? "del" : ""}>{task.text}</Text>
            </Checkbox>
            <Button ml="4" size="sm" colorScheme="red" onClick={() => deleteTask(task)}>
              Delete
            </Button>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default App;
