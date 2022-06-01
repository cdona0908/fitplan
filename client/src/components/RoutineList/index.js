import {
    Box,
    Button,
    ButtonGroup,
    Heading,
    useDisclosure,
    Flex,
    useToast,
    Text,
    Checkbox,
  } from "@chakra-ui/react";
  import { ArrowDownIcon } from "@chakra-ui/icons";
  import React from "react";
  import { WorkoutForm } from "../WorkoutForm";
  import RoutineWorkouts from "./workouts";
  // completed (standing for if we're viewing completed routines) is defaulted to false
  const RoutineList = ({
    routine,
    completeRoutine,
    completed = false,
    reuseRoutine,
  }) => {
    const { _id, name, description, createdAt, workouts } = routine;
    // use chakraUI's toast
    const toast = useToast();
    // set useDisclosure function to custom names
    const { isOpen: workoutOpen, onToggle: toggleWorkouts } = useDisclosure();
    // complete routine was pressed
    const completeRoutineHandler = async () => {
      try {
        await completeRoutine({
          variables: { id: _id },
        });
        toast({
          title: "Congrats on completing your routine!",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      } catch (err) {
        console.log(err);
        toast({
          title: "Error!",
          description: "We were unable to add your routine to completed routine",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    };
    // reuse routine was pressed
    const reuseRoutineHandler = async () => {
      try {
        await reuseRoutine({
          variables: { id: _id },
        });
        toast({
          title: "Routine restored",
          description:
            "You can now view and interact with this routine in the dashboard",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      } catch (err) {
        console.log(err);
        toast({
          title: "Error!",
          description: "We were unable to add this back to your reused routines.",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      }
    };
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
          >
            {completed ? (
              <Button
                onClick={reuseRoutineHandler}
                variant="ghost"
                _hover={{ bg: "teal.200" }}
              >
                Reuse Routine
              </Button>
            ) : (
              <Checkbox
                onChange={completeRoutineHandler}
                size="lg"
                colorScheme="green"
                color="#285E61"
              >
                Routine Complete
              </Checkbox>
            )}
          </Flex>
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
            <Flex justifyContent="end">
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
                  <WorkoutForm workoutId={_id} />
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