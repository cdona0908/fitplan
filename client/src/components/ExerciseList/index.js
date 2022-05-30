// Importing the parameters that we are going to used to implement the function
import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    Circle,
    Text,
    WrapItem,
    useToast,
    IconButton,
    flex,
    Collapse,
    Heading
} from '@chakra-ui/react';
import {SmallCloseIcon, ArrowUpIcon} from '@chakra-ui/icons';

import {useMutation} from '@apollo/client';
import {ADD_EXERCISE, REMOVE_EXERCISE} from '../../utils/mutations';

import Auth from '../../utils/auth';

import {useStoreContext} from '../../utils/state/UserContext';
import {ADD_EXERCISES} from '../../utils/state/actions';
import { isRequiredArgument } from 'graphql';



const ExerciseHome = ({exercise}) => {
    const {_id, title, image, text} = exercise;

    const[state, dispatch] = useStoreContext();

    const toast = useToast();

    const {isOpen, onOpen, onClose} = useDisclosure();

    const initialRef = React.useRef();
    const finalRef = React.useRef();

    const [saveExercise] = useMutation(ADD_EXERCISE);

    // if user clicks it add the exercise to homepage
    const handleHomeClick = async () => {
        //validating user login
        if (!Auth.loggedIn()) {
            toast({
                title: '',
                description: '',
                status: 'error',
                duration: '',
                isClosable: true,
                position: 'top-right'
            });
            return;
        }
        // Running the mutation
        try {
            const response = await saveExercise({
                variables: { id: _id }
            });
      
            dispatch({
                type: ADD_EXERCISES,
                exercises: response.data.saveExercise.exercises
            });
      
            toast({
                title: 'Exercise saved!',
                description: 'To view the exercise, go to your dashboard',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
      
            onClose();
          } catch (err) {
            console.log(err);
            toast({
                title: 'Save exercise failed!',
                description: 'We could not save this exercise. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        }

    };

    return (
        <WrapItem p={10}>
            <Circle 
            className=''
            onClick={onOpen}
            borderRadius='full'
            width='300px'
            height='300px'
            bgImg={required(`../../assets/${image}`)}
            cursor='pointer'>
            <Text className='exercise-text' fontSize='2xl'>
                {title}
            </Text>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{text}</ModalBody>
                    <ModalFooter>
                        <Button
                            isDisabled={
                                state.exercises.find((exercise) => {
                                    return exercise._id === _id;
                                })
                                    ? true
                                    : false
                            }
                            colorScheme="teal"
                            variant="outline"
                            onClick={handleHomeClick}>
                            Save Exercise
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Circle>

    </WrapItem>
        
    );
};



const Exercisedash = ({exercise}) => {
    const {_id, title, text} = exercise;

    const {isOpen: exerciseOpen, onToggle: toggleExerciseText} = useDisclosure();

    const toast = useToast();

    const [removeExercise] = useMutation(REMOVE_EXERCISE);

    const removeExerciseHandler = async (event) => {
        //Running the Mutation
        
        
    }
}

