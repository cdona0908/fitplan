// Importing the parameters that we are going to used to implement the function
import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import {QUERY_ME} from '../utils/queries';
import {REUSE_ROUTINE} from '../utils/mutations';
import RoutineList from '../components/RoutineList';
import {
    Box,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Heading,
    Center,
    Button,
    ScaleFade
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import {ArrowBackIcon} from '@chakra-ui/icons';
const CompletedRoutines = () => {
    const [reuseRoutine]= useMutation(REUSE_ROUTINE);

    const {data: userData, loading} = useQuery(QUERY_ME);

    const allRoutines = userData?.me.routines;

    if (loading) {
        return <div>Loading your Routines...</div>
    }

    let completedRoutines;
    if(allRoutines) {
        completedRoutines = allRoutines.filter((routine) => {
            return routine.isComplete === true;
        })
    }
    // Function that returns the routines template and when the routines are incompleted its takes back to dashboard to create new routines

    return (
        <Box minHeight='83.3vh'>
            <Heading className='center-text' fontSize='3xl' color ='2C7A7B' mt ='20px'>
                Completed Routines
            </Heading>
            <Center>
                <Link to='/dashboard'>
                    <Button leftIcon={<ArrowBackIcon />} variant ='ghost'>
                        Back to dashboard
                    </Button>
                </Link>
            </Center>
            {!completedRoutines.length ? (
                <ScaleFade in>
                    <Box>
                        <Alert 
                            status='info' 
                            variant='subtle' 
                            flexDirection='column'
                            alignItems
                            justifyContent='center'
                            textAlign='center'
                            height='200px'
                            borderRadius='md'>
                            <AlertIcon boxSize='40px' mr={0} />
                            <AlertTitle mt={4} mb={1} fontSize='lg'>
                                No Routines!
                            </AlertTitle>
                            <AlertDescription maxWidth='sm'>
                                Go back to the dashboard to create new routines.
                            </AlertDescription>
                        </Alert>
                    </Box>
                </ScaleFade>
            ) : (
                completedRoutines.map((routine) => {
                    return (
                        <Box key={routine._id} ml='20' mr='20' mb='15'>
                            <RoutineList 
                            routine={routine}
                            completed={true}
                            reuseRoutine={reuseRoutine}></RoutineList>
                        </Box>
                    );
                })
                
            )}
        </Box>
    )
}

export default CompletedRoutines;