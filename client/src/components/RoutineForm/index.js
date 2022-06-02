import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_ROUTINE } from '../../utils/mutations';

import { useStoreContext } from '../../utils/state/UserContext';
import { ADD_ROUTINES } from '../../utils/state/actions';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  FormErrorMessage,
  useToast,

  ModalCloseButton
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';

const RoutineForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  // used from Chakra
  const toast = useToast();

  // a global state which only uses reducer
  const [, dispatch] = useStoreContext();

  // state for routine form
  const [routineState, setRoutineState] = useState({ name: '' });

  // error for text
  const [errorMessage, setError] = useState({ type: '', message: '' });

  // routine mutation
  const [addRoutine] = useMutation(ADD_ROUTINE);

  // updates routineState when user enters input data
  const handleChange = (event) => {
    const { name, value } = event.target;

    // add input to setRoutineState
    setRoutineState({
      ...routineState,
      [name]: value
    });
  };

  const handleFormSubmit = async () => {
    const { name } = routineState;

    // validates name
    if (!name) {
      setError({ type: 'name', message: `Please enter your routine name` });

      return;
    }
    // validates name length
    if (name.length > 280) {
      setError({
        type: 'name',
        message: 'Name cannot be more than 280 characters'
      });

      return;
    }

    // routineState added to mutation
    try {
      const response = await addRoutine({
        variables: {
          name: name,
        }
      });

      console.log(response);

      // this is now added to the global state
      dispatch({
        type: ADD_ROUTINES,
        routines: response.data.addRoutine.routines
      });

      // reset
      setRoutineState({ name: '' });

      // reset 
      setError({ type: '', message: '' });

      // success message
      toast({
        title: 'Routine added!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });

      // close modal
      onClose();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error!',
        description: 'Routine not added',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );

  const [overlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Button
        leftIcon={<SmallAddIcon />}
        onClick={onOpen}
        size="md"
        colorScheme="teal">
        Add Routine
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Create a Routine</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errorMessage.type === 'name'}>
              <FormLabel>Name:</FormLabel>
              <Input
                name="name"
                placeholder="What is the routine name?"
                onChange={handleChange}
                value={routineState.name}
              />
              <FormErrorMessage>{errorMessage.message}</FormErrorMessage>
              <FormErrorMessage>{errorMessage.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleFormSubmit}
              mr={3}
              colorScheme="teal"
              type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RoutineForm;
