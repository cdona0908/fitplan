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
  Textarea,
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
  const [routineState, setRoutineState] = useState({ routineName: ''});
  // error text state
  const [errorMessage, setError] = useState({ type: '', message: '' });
  // set character lengths
  const [routineNameLength, setRoutineNameLength] = useState(0);
  

  // add Routine mutation setup
  const [addRoutine] = useMutation(ADD_ROUTINE);

  // update routineState when user adds things in input
  const handleChange = (event) => {
    const { routineName, value } = event.target;

    // set progress bar length
    if (routineName === 'routineName') {
      let progressLength = (value.length / 100) * 100;
      setRoutineNameLength(progressLength);
    }

    // add input to setRoutineState
    setRoutineState({
      ...routineState,
      [routineName]: value
    });
  };

  const handleFormSubmit = async () => {
    const { routineName } = routineState;

    // validate routineName
    if (!routineName) {
      setError({ type: 'routineName', message: `Please enter your routine's name` });

      return;
    }
    // validate routineName length
    if (routineName.length > 100) {
      setError({
        type: 'routineName',
        message: 'the name of the routine cannot be more than 100 characters'
      });

      return;
    }
    
   
    // add routineState to mutation
    try {
      const response = await addRoutine({
        variables: {
            routineName: routineName          
        }
      });

      console.log(response);

      // add to global state
      dispatch({
        type: ADD_ROUTINES,
        routines: response.data.addRoutine.routines
      });

      // reset routineState
      setRoutineState({ routineName: ''});
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
        description: 'Routine was not added',
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
            <FormControl isInvalid={errorMessage.type === 'routineName'}>
              <FormLabel>Routine Name:</FormLabel>
              <Input
                name="routineName"
                placeholder="What is the routine name?"
                onChange={handleChange}
                value={routineState.routineName}
              />
              <Progress
                colorScheme={routineNameLength >= 80 ? 'red' : 'green'}
                size="sm"
                value={routineNameLength}
              />
              <FormErrorMessage>{errorMessage.message}</FormErrorMessage>
            </FormControl>
            
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleFormSubmit}
              mr={3}
              colorScheme="teal"
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