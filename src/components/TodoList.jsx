import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useToast,
  Flex,
  Heading,
} from '@chakra-ui/react';
import supabase from '../../supabase';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from('tasks').select('*');

      if (error) {
        console.error(error);
        return;
      }

      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleCheckboxChange = async (id, completed) => {
    await supabase.from('tasks').update({ completed: !completed }).eq('id', id);

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !completed } : task
      )
    );
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) {
      toast({
        title: 'Task cannot be empty',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const { data, error } = await supabase.from('tasks').insert({ task: newTask });

    if (error) {
      console.error(error);
      return;
    }

    if (data && data.length > 0) {
      setTasks((prevTasks) => [...prevTasks, data[0]]);
    }

    setNewTask('');
    onClose();
  };

  return (
    <Box p={4} h="100%" display="flex" flexDirection="column" alignItems="center" w="200vh">
    <Flex mb={4}>
      <Heading>My To-do list App</Heading>
    </Flex>
    <Button colorScheme="blue" onClick={onOpen} mb={4}>
        Add Task
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Enter task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddTask}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box w="200vh" justifyContent="flex-end">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>Task</Th>
              <Th>Status</Th>
              <Th>Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map((task, index) => (
              <Tr key={task.id}>
                <Td>{index + 1}</Td>
                <Td>{task.task}</Td>
                <Td>
                  <Checkbox
                    isChecked={task.completed}
                    onChange={() => handleCheckboxChange(task.id, task.completed)}
                  >
                    {task.completed ? 'Completed' : 'Pending'}
                  </Checkbox>
                </Td>
                <Td>{new Date(task.created_at).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TodoList;
