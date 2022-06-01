import {
Box,
Button,
ButtonGroup,
Heading,
useDisclosure,
Divider,
Flex,
useToast,
Text,
Checkbox
} from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import React from 'react';
import { WorkoutForm } from '../WorkoutForm';
import RoutineWorkouts from './workouts';

  
// destructure routines
const RoutineList = ({ routine }) => {
const { _id, routineName, createdAt, workouts } = routine;

// use chakraUI's toast
const toast = useToast();

// set useDisclosure function to custom names
const { isOpen: workoutOpen, onToggle: toggleWorkouts } = useDisclosure();

return (
    <Box margin= '30px'>
    <Box
        border="2px"
        p="3"
        borderRadius="md"
        borderColor="gray.200"
        bgColor="teal.50">
        
        <Heading fontSize="3xl" color="#285E61" ml="5" mt="5">
        {routineName}
        </Heading>
        <Box
        mt="2"
        ml="5"
        mr="5"
        border="2px"
        borderRadius="md"
        borderColor="gray.400"
        minHeight="20"
        boxShadow="lg"
        bgColor="teal.100">
        
        <Flex justifyContent="end">
            <Text m="2">{createdAt}</Text>
        </Flex>
        </Box>
        <Flex
        mt={{ base: '5', md: '10' }}
        height={{ base: '100px', md: '40px' }}
        flexDir={{ base: 'column', md: 'row' }}
        justifyContent="space-evenly"
        alignItems={{ base: 'center', md: 'normal' }}>
        <Box>
            
            <ButtonGroup isAttached mb={{ base: '5', md: '0' }}>
                <Button
                onClick={toggleWorkouts}
                colorScheme="red"
                icon={<ArrowDownIcon />}>
                Workouts
                {workouts.length === 0 ? '' : `(${workouts.length})`}
                </Button>
                <WorkoutForm routineId={_id} />
            </ButtonGroup>
            
        </Box>
        <Divider orientation="vertical" />
        
        </Flex>
    </Box>

    {/* Pop-down for workouts */}
    <RoutineWorkouts
        workoutOpen={workoutOpen}
        workouts={workouts}
        toggleWorkouts={toggleWorkouts}
        routineName={routineName}
    />
    
    </Box>
  );
};
  
export default RoutineList;