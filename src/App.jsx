import React from 'react';
import { ChakraProvider, Container, Flex } from '@chakra-ui/react';
import TodoList from './components/TodoList'; // Import the TodoList component

function App() {
  return (
    <ChakraProvider>
      <Flex justifyContent="center" mr={4} alignItems="center" h="100vh">
        <Container maxW="container.md">
          <TodoList />
        </Container>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
