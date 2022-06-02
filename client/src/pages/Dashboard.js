// Importing the parameters that we are going to used to implement the function
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Center,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  ScaleFade,
  ButtonGroup,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import RoutineForm from "../components/RoutineForm";
import { ExerciseDash } from "../components/ExerciseList";
import RoutineList from "../components/RoutineList";
import { useStoreContext } from "../utils/state/UserContext";
import { ADD_ROUTINES, SAVE_EXERCISES } from "../utils/state/actions";
const Dashboard = () => {
  const [state, dispatch] = useStoreContext();
  const [userRoutines, setRoutines] = useState([]);
  const [userExercises, setExercises] = useState([]);
  //query function
  const { loading, error, data: userData } = useQuery(QUERY_ME);
  //destructuring global variables

  const { routines, exercises } = state;
  // using useffect function for routines and exercises"
  useEffect(() => {
    if (routines.length) {
      setRoutines(
        routines.filter((routine) => {
          return !routine.isComplete;
        })
      );
    }
    if (exercises) {
      setExercises(exercises);
    }
  }, [routines, exercises]);
  // if not complete global store with user info
  useEffect(() => {
    if (userData) {
      dispatch({
        type: ADD_ROUTINES,
        routines: userData.me.routines,
      });
      dispatch({
        type: SAVE_EXERCISES,
        exercises: userData.me.exercises,
      });
    }
  }, [userData, dispatch]);
  if (error) {
    let errorMessage = error.graphQLErrors[0].message;
    return (
      <ScaleFade>
        <Box pl="15px" pr="15px" pt="150px" pb="300px">
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="300px"
            borderRadius="md"
          >
            <AlertIcon boxSize="50px" />
            <AlertTitle mt="20px" mb="35px" fontSize="5xl">
              {errorMessage}!
            </AlertTitle>
            <AlertDescription fontSize="large">
              {errorMessage === "Not logged in"
                ? `You are not logged in. Please log in to view your dashboard!`
                : null}
            </AlertDescription>
          </Alert>
        </Box>
      </ScaleFade>
    );
  }
  if (loading) {
    return <div>Loading your Dashboard</div>;
  }
  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      alignItems={{ base: "center", md: "normal" }}
    >
      <Box w={{ base: "80%", md: "50%" }} minHeight="100%" bg="#FFFFFF">
        <Heading
          className="center-text"
          fontSize="3xl"
          color="#2C7A7B"
          mt="20px"
        >
          My Exercises
        </Heading>
        {userExercises.length === 0 ? (
          <ScaleFade in>
            <Box m="30px">
              <Alert
                status="info"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                borderRadius="md"
                height="200px"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  No exercises!
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  Go to the{" "}
                  <i>
                    <Link to="/">homepage</Link>
                  </i>{" "}
                  to view and save exercises.
                </AlertDescription>
              </Alert>
            </Box>
          </ScaleFade>
        ) : (
          <Box>
            {userExercises.map((exercise) => {
              return (
                <ExerciseDash
                  key={exercise._id}
                  exercise={exercise}
                ></ExerciseDash>
              );
            })}
          </Box>
        )}
      </Box>
      <Center>
        <Divider
          orientation="vertical"
          width="1px"
          minHeight="100%"
          variant="solid"
          bg="#234E52"
        />
      </Center>
      <Box w={{ base: "80%", md: "50%" }} minHeight="84.7vh">
        <Heading
          className="center-text"
          fontSize="4xl"
          color="#285E61"
          mt="20px"
        >
          <Center>My routines</Center>
        </Heading>
        <Center>
          <ButtonGroup isAttached mt="3">
            <RoutineForm />
          </ButtonGroup>
        </Center>
        {userRoutines.length === 0 ? (
          <ScaleFade in>
            <Box m="30px">
              <Alert
                status="info"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
                borderRadius="md"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  No Routines!
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  Click Add Routine to create a routine.
                </AlertDescription>
              </Alert>
            </Box>
          </ScaleFade>
        ) : (
          userRoutines.map((routine) => {
            return <RoutineList key={routine.id} routine={routine} />;
          })
        )}
      </Box>
    </Flex>
  );
};
export default Dashboard;
