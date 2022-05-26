//importing parameters that we're going to need to add the homepage for the activities and link it all together to make the function work properly
import React from "react";
import {ActivityHome} from '../components/ActivityList/';
import {useQuery} from '@apollo/client';
import {QUERY_ACTIVITIES} from '../utils/queries';
import {Wrap} from '@chakra-ui/react';

// creating a function that import the activities from the db
const Home = () => {
    const {loading, data: activityData} = useQuery(QUERY_ACTIVITIES);

    if (loading) {
        return <div>Loading Activities...</div>
    }

    // Returns the template of Activities
    return (
        // <Grid templateColumns='repeat(5, 1fr)' gap{6}>
        <Wrap spacing='5px' justify='center'>
            {activityData.activities.map((activity) => {
                return (
                    <ActivityHome key={activity.title} activity={activity}></ActivityHome>
                );
            })}

        </Wrap>
        // </Grid>
    )
}

