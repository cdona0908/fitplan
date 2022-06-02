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
  Progress,
  ModalCloseButton
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';

const RoutineForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  // use toast from Chakra UI
  const toast = useToast();

  // global state declaration (only using reducer)
  const [, dispatch] = useStoreContext();

  // state of routine Form
  const [routineState, setRoutineState] = useState({ name: '' });
  // error text state
  const [errorMessage, setError] = useState({ type: '', message: '' });
  // set character lengths
  const [nameLength, setNameLength] = useState(0);
  const [descriptionLength, setDescriptionLength] = useState(0);

  // add routine mutation setup
  const [addRoutine] = useMutation(ADD_ROUTINE);

  // update routineState when user adds things in input
  const handleChange = (event) => {
    const { name, value } = event.target;

    // set progress bar length
    if (name === 'name') {
      let progressLength = (value.length / 280) * 100;
      setNameLength(progressLength);
    } else {
      let progressLength = (value.length / 280) * 100;
      setDescriptionLength(progressLength);
    }

    // add input to setRoutineState
    setRoutineState({
      ...routineState,
      [name]: value
    });
  };

  const handleFormSubmit = async () => {
    const { name } = routineState;

    // validate name
    if (!name) {
      setError({ type: 'name', message: `Please enter your routine name` });

      return;
    }
    // validate name length
    if (name.length > 280) {
      setError({
        type: 'name',
        message: 'Name cannot be more than 280 characters'
      });

      return;
    }

    // add routineState to mutation
    try {
      const response = await addRoutine({
        variables: {
          name: name,
        }
      });

      console.log(response);

      // add to global state
      dispatch({
        type: ADD_ROUTINES,
        routines: response.data.addRoutine.routines
      });

      // reset  routine State
      setRoutineState({ name: '' });
      // reset errorMessage
      setError({ type: '', message: '' });

      // success toast
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
        colorScheme="red">
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
              <Progress
                colorScheme={nameLength >= 100 ? 'red' : 'green'}
                size="sm"
                value={nameLength}
              />
              <FormErrorMessage>{errorMessage.message}</FormErrorMessage>
              <Progress
                colorScheme={descriptionLength >= 100 ? 'red' : 'green'}
                size="sm"
                value={descriptionLength}
              />
              <FormErrorMessage>{errorMessage.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleFormSubmit}
              mr={3}
              colorScheme="blue"
              // isLoading={props.isSubmitting}
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
