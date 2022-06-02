import React, { useState } from "react";
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
  FormErrorMessage,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { ADD_WORKOUT } from "../../utils/mutations";
import { AddIcon } from "@chakra-ui/icons";
export const WorkoutForm = ({ routineId }) => {
  const [workoutState, setWorkoutState] = useState("");
  const [errorText, setErrorText] = useState("");
  const toast = useToast();
  // add workout mutation
  const [addWorkout] = useMutation(ADD_WORKOUT);
  // style componenets
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  // form change handler on form change
  const changeHandler = (event) => {
    const { name, value } = event.target;

    // add input to workoutState
    setWorkoutState({
      ...workoutState,
      [name]: value,
    });
  };

  // form submitHandler
  const submitHandler = async () => {
    // validation
    if (!workoutState) {
      setErrorText("Please describe your workout");
      return;
    }
    // validation for the length
    if (workoutState.length > 280) {
      setErrorText("The description cannot be over 280 characters");
      return;
    }
    // helps add workoutState to the mutation
    try {
      await addWorkout({
        variables: {
          workoutName: workoutState.workoutName,
          routineId: routineId,
          weight: parseInt(workoutState.weight),
          sets: parseInt(workoutState.sets),
          reps: parseInt(workoutState.reps),
          time: parseInt(workoutState.time),
        },
      });
      // resets workoutState
      setWorkoutState("");
      // resets errorText
      setErrorText("");
      toast({
        title: "Workout added!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
    } catch (err) {
      console.log(err);
      toast({
        title: "Error!",
        description: "Workout was not added",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
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
        colorScheme="red"
      ></IconButton>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        {overlay}
        <ModalContent>
          <ModalHeader>Add Workout</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errorText}>
              <FormLabel>Name:</FormLabel>
              <Textarea
                ref={initialRef}
                name="workoutName"
                resize="none"
                value={workoutState.workoutName}
                onChange={changeHandler}
              />
              <FormErrorMessage>{errorText}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errorText}>
              <FormLabel>Weight:</FormLabel>
              <Textarea
                ref={initialRef}
                name="weight"
                resize="none"
                value={workoutState.weight}
                onChange={changeHandler}
              />
              <FormErrorMessage>{errorText}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errorText}>
              <FormLabel>Sets:</FormLabel>
              <Textarea
                ref={initialRef}
                name="sets"
                resize="none"
                value={workoutState.sets}
                onChange={changeHandler}
              />
              <FormErrorMessage>{errorText}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errorText}>
              <FormLabel>Reps:</FormLabel>
              <Textarea
                ref={initialRef}
                name="reps"
                resize="none"
                value={workoutState.reps}
                onChange={changeHandler}
              />
              <FormErrorMessage>{errorText}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errorText}>
              <FormLabel>Time:</FormLabel>
              <Textarea
                ref={initialRef}
                name="time"
                resize="none"
                value={workoutState.time}
                onChange={changeHandler}
              />

              <FormErrorMessage>{errorText}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              colorScheme="blue"
              type="submit"
              onClick={submitHandler}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
