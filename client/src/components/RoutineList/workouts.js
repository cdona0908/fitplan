import React from 'react';
import {
  Collapse,
  Text,
  List,
  ListItem,
  ListIcon,
  Flex,
  Heading,
  IconButton,
  Center
} from '@chakra-ui/react';
import { InfoIcon, ChevronRightIcon, ArrowUpIcon } from '@chakra-ui/icons';

const RoutineWorkouts = ({
  workoutOpen,
  workouts,
  toggleWorkouts,
  routineName
}) => {
  return (
    <Collapse in={workoutOpen} animateOpacity>
      <Flex
        p="40px"
        color="white"
        ml="2"
        mr="2"
        bg="pink.300"
        rounded="md"
        shadow="md"
        flexDir="column">
        <Flex flexDir="row" justifyContent="space-between" mb="10px">
          <Heading>{routineName} Workouts</Heading>
          <IconButton
            size="md"
            mt="-5"
            onClick={toggleWorkouts}
            icon={<ArrowUpIcon />}
            variant="ghost"
            colorScheme='red'
            borderRadius="full"
            fontSize="xl"
            aria-label="Close Workouts"
          />
        </Flex>
        {!workouts.length ? (
          <Center>
            <Text>
              <InfoIcon mb="1px" mr="5px" />
              You have not added any workouts yet. Please add some
              workouts to this Routine.
            </Text>
          </Center>
        ) : (
          <List>
            {workouts.map((workout) => {
              return (
                <ListItem key={workout._id} mb="5px">
                  <ListIcon as={ChevronRightIcon} mb="1px" mr="5px"></ListIcon>
                  {workout.workoutName}
                </ListItem>
              );
            })}
          </List>
        )}
      </Flex>
    </Collapse>
  );
};

export default RoutineWorkouts;