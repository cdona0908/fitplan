import React from "react";
import {
  Collapse,
  Text,
  List,
  ListItem,
  ListIcon,
  Flex,
  Heading,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { InfoIcon, ChevronRightIcon, ArrowUpIcon } from "@chakra-ui/icons";
const RoutineWorkouts = ({ workoutOpen, workouts, toggleWorkouts, name }) => {
  return (
    <Collapse in={workoutOpen} animateOpacity>
      <Flex
        p="20px"
        color="stone.900"
        ml="0"
        mr="12"
        bg="gray.400"
        rounded="md"
        shadow="md"
        flexDir="column"
      >
        <Flex flexDir="row" justifyContent="space-between" mb="20px">
          <Heading> {name} Workouts</Heading>
          <IconButton
            size="md"
            mt="-5"
            onClick={toggleWorkouts}
            icon={<ArrowUpIcon />}
            variant="ghost"
            colorScheme="red"
            borderRadius="full"
            fontSize="xl"
            aria-label="Close Workouts"
          />
        </Flex>
        {!workouts.length ? (
          <Center>
            <Text>
              <InfoIcon mb="1px" mr="5px" />
              You have not written any workouts yet. Please write some workouts
              you found with this routine.
            </Text>
          </Center>
        ) : (
          <List>
            {workouts.map((workout) => {
              return (
                <ListItem key={workout._id} mb="10px">
                  <ListIcon as={ChevronRightIcon} mb="1px" mr="5px"></ListIcon>
                  Workout Name: {workout.workoutName} Weight: {workout.weight}{" "}
                  Sets: {workout.sets} Reps: {workout.reps} Time: {workout.time}
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
