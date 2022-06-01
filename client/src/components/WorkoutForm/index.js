import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  useDisclosure,
  ModalHeader,
  Textarea,
  Progress,
  FormErrorMessage,
  useToast,
  IconButton
} from '@chakra-ui/react';

import { useMutation } from '@apollo/client';
import { ADD_WORKOUT } from '../../utils/mutations';
import { AddIcon } from '@chakra-ui/icons';

export const WorkoutForm = ({ routineId }) => {
  const [workoutState, setWorkoutState] = useState('');

  const [workoutNameLength, setWorkoutNameLength] = useState(0);
  const [errorText, setErrorText] = useState('');

  const toast = useToast();

  // add workout mutation setup
  const [addWorkout] = useMutation(ADD_WORKOUT);

  // styling components
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  // on form change
  const changeHandler = (event) => {
    const { value } = event.target;

    // update progress bar
    let progressLength = (value.length / 60) * 100;
    setWorkoutNameLength(progressLength);

    // add input to workoutState
    setWorkoutState(value);
  };

  // on form submit
  const submitHandler = async () => {
    // validate workout name
    if (!workoutState) {
      setErrorText('Please asign a name to your workout');
      return;
    }

    // validate length
    if (workoutState.length > 280) {
      setErrorText('The workout name cannot exceed 60 characters');
      return;
    }

    // add workoutState to mutation
    //need to add the weight,sets, reps and time
    try {
      await addWorkout({
        variables: { workoutName: workoutState, routineId: routineId }
      });

      // reset workoutState
      setWorkoutState('');
      // reset errorText
      setErrorText('');

      toast({
        title: 'Workout added!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });

      onClose();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error!',
        description: 'Workout was not added',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  return (
    <>
      <IconButton
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
        icon={<AddIcon />}
        colorScheme="red"></IconButton>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Add Workout</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errorText}>
              <FormLabel>Workout Name:</FormLabel>
              <Textarea
                ref={initialRef}
                name="workouts"
                placeholder="Please add a workout name to this routine"
                resize="none"
                value={workoutState}
                onChange={changeHandler}
              />
              <Progress
                colorScheme={workoutNameLength >= 50 ? 'red' : 'green'}
                size="sm"
                value={workoutNameLength}
              />
              <FormErrorMessage>{errorText}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              colorScheme="teal"
              type="submit"
              onClick={submitHandler}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};