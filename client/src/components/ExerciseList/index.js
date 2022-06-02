import React from "react";
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
    Flex,
    Collapse,
    Heading
} from '@chakra-ui/react';
import {SmallCloseIcon, ArrowUpIcon} from '@chakra-ui/icons';
import {useMutation} from '@apollo/client';
import {SAVE_EXERCISE, REMOVE_EXERCISE} from '../../utils/mutations';
import Auth from '../../utils/auth';
import {useStoreContext} from '../../utils/state/UserContext';
import {SAVE_EXERCISES} from '../../utils/state/actions';
// Exercise Component in the Homepage
const ExerciseHome = ({exercise}) => {
    const {_id, exerciseTitle, image, exerciseDescription} = exercise;
    const[state, dispatch] = useStoreContext();
    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const initialRef = React.useRef();
    const finalRef = React.useRef();
    const [saveExercise] = useMutation(SAVE_EXERCISE);
    // if user clicks it, it adds the exercise to homepage
    const handleHomeClick = async () => {
        //validation for the login
        if (!Auth.loggedIn()) {
            toast({
                title: 'Not logged in!',
                description: 'Please log in to save this activity',
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
                type: SAVE_EXERCISES,
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
        }   catch (err) {
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
            className='exercises'
            onClick={onOpen}
            borderRadius='full'
            width='300px'
            height='300px'
            bgImg={require(`../../assets/${image}`)}
            cursor='pointer'>
            <Button className='exercise-description' fontSize='1xl' bg="#FFCC00"_hover={{ bg: 'gray.400' }}>
                {exerciseTitle}
            </Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{exerciseTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{exerciseDescription}</ModalBody>
                    <ModalFooter>
                        <Button
                            isDisabled={
                                state.exercises.find((exercise) => {
                                    return exercise._id === _id;
                                })
                                    ? true
                                    : false
                            }
                            colorScheme="gray.400"
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
//Exercise Component for User Dashboard
const ExerciseDash = ({exercise}) => {
    const {_id, exerciseTitle, exerciseDescription} = exercise;
    const {isOpen: exerciseOpen, onToggle: toggleExerciseDescription} = useDisclosure();
    const toast = useToast();
    const [removeExercise] = useMutation(REMOVE_EXERCISE);
    // if the remove button is clicked
    const removeExerciseHandler = async (event) => {
        //running the mutation
        try {
            await removeExercise({
                variables: {id: _id}
            });
            toast({
                title: 'Exercise removed!',
                description: 'if you want to added it , go to your dashboard',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
            //onClose();
        }   catch (err) {
            console.log(err);
            toast({
                title: 'Save exercise failed!',
                description: 'We could not remove this exercise. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        }
    };
const exerciseClickHandler = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    toggleExerciseDescription()
};
return (
    <Box>
        <Box
            onClick={exerciseClickHandler}
            borderRadius='lg'
            bg='rgb(186 230 253)'
            borderColor='gray.200'
            border='1px'
            maxWidth='100%'
            fontSize='2xl'
            p='28px'
            cursor='pointer'>
            <Flex justifyContent='end' mb='-9'>
                <IconButton
                onClick={removeExerciseHandler}
                variant='outline'
                aria-label='remove exercise'
                colorScheme='red'
                color='red'
                width='10px'
                size='sm'
                icon={<SmallCloseIcon/>}
            />
            </Flex>
            <Heading color='stone.900' size='lg' onClick={exerciseClickHandler}>
                {exerciseTitle}
            </Heading>
        </Box>
        {/* */}
        <Collapse in={exerciseOpen}>
            <Flex
                maxHeight='200px'
                p='30px'
                color='stone.900'
                borderColor='gray.200'
                ml='2'
                mr='2'
                bg='rgb(125 211 252)'
                rounded='md'
                shadow='md'
                justifyContent='center'
                overflow='hidden'>
                <IconButton
                    size='md'
                    mt='-5'
                    ml='-3'
                    onClick={toggleExerciseDescription}
                    icon={<ArrowUpIcon />}
                    variant='ghost'
                    colorScheme='gray.400'
                    borderRadius='full'
                    fontSize='xl'
                    arial-label='Close Reflections'
                    />
                    <Text overflow='auto'>{exerciseDescription}</Text>
                </Flex>
            </Collapse>
        </Box>
    );
};
export {ExerciseHome, ExerciseDash};


    
