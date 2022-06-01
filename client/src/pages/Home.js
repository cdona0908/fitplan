//importing parameters that we're going to need to add the homepage for the activities and link it all together to make the function work properly
import React from "react";
import {ExerciseHome} from '../components/ExerciseList/';
import {useQuery} from '@apollo/client';
import {QUERY_EXERCISES} from '../utils/queries';
import {Wrap} from '@chakra-ui/react';

// creating a function that import the activities from the db
const Home = () => {
    const {loading, data: exerciseData} = useQuery(QUERY_EXERCISES);

    if (loading) {
        return <div>Loading Exercises...</div>
    }

    // Returns the template of Activities
    return (
        // <Grid templateColumns='repeat(5, 1fr)' gap{6}>
        <Wrap spacing='5px' justify='center'>
            {exerciseData.exercises.map((exercise) => {
                return (
                    <ExerciseHome key={exercise.exerciseTitle} exercise={exercise}></ExerciseHome>
                );
            })}

        </Wrap>
        // </Grid>
    )
}

export default Home

