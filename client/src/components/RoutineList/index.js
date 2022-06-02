import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  useDisclosure,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import React from "react";
import { WorkoutForm } from "../WorkoutForm";
import RoutineWorkouts from "./workouts";

const RoutineList = ({ routine, completed = false, reuseRoutine }) => {
  const { _id, name, description, createdAt, workouts } = routine;

  // sets this function to names that are custom
  const { isOpen: workoutOpen, onToggle: toggleWorkouts } = useDisclosure();

  return (
    <Box margin={completed ? { base: "0", md: "30px" } : "30px"}>
      <Box
        border="2px"
        p="3"
        borderRadius="md"
        borderColor="gray.200"
        bgColor="teal.50"
      >
        <Flex
          justifyContent={{ base: "normal", md: "end" }}
          mb={{ base: "normal", md: "-6" }}
        ></Flex>
        <Heading fontSize="3xl" color="#285E61" ml="5" mt="5">
          {name}
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
          bgColor="teal.100"
        >
          <Text m="2">{description}</Text>
          <Flex justifyContent="center">
            <Text m="2">{createdAt}</Text>
          </Flex>
        </Box>
        <Flex
          mt={{ base: "5", md: "10" }}
          height={{ base: "100px", md: "40px" }}
          flexDir={{ base: "column", md: "row" }}
          justifyContent="space-evenly"
          alignItems={{ base: "center", md: "normal" }}
        >
          <Box>
            {completed ? (
              <Button
                mb={{ base: "5", md: "0" }}
                onClick={toggleWorkouts}
                isDisabled={workouts.length === 0 ? true : false}
                colorScheme="red"
                icon={<ArrowDownIcon />}
              >
                Workouts
                {workouts.length === 0 ? "" : `(${workouts.length})`}
              </Button>
            ) : (
              <ButtonGroup isAttached mb={{ base: "5", md: "0" }}>
                <Button
                  onClick={toggleWorkouts}
                  colorScheme="red"
                  icon={<ArrowDownIcon />}
                >
                  Workouts
                  {workouts.length === 0 ? "" : `(${workouts.length})`}
                </Button>
                <WorkoutForm routineId={_id} />
              </ButtonGroup>
            )}
          </Box>
        </Flex>
      </Box>
      {/* Pop-down for workouts */}
      <RoutineWorkouts
        workoutOpen={workoutOpen}
        workouts={workouts}
        toggleWorkouts={toggleWorkouts}
        name={name}
      />
    </Box>
  );
};
export default RoutineList;
