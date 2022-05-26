// Importing the parameters that we are going to used to implement the function
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
    Box,
    Center,
    Heading,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    ScaleFade,
    Button,
    ButtonGroup,
    Divider,
    Flex
} from '@chakra-ui/react';
import {useMutation, useQuery} from '@apollo/client';
import {QUERY_ME} from '../utils/queries';
import RoutineForm from '../components/RoutineForm';
import {ActivityDash} from '../components/ActivityList';
import RoutineList from '../components/RoutineList';
import {COMPLETE_ROUTINE} from '../utils/mutations';

import {useStoreContext} from '../utils/state/actions';
import {ADD_ROUTINES, ADD_ACTIVITIES} from '../utils/state/actions';

const Dashboard = () => {
    const [state, dispatch] = useStoreContext();

    const[userRoutines, setRoutines] = useState([]);
    const [userActivities, setActivities] = useState([]);

    const navigate = useNavigate();
    //query function
    const {loading, error, data: userData} = useQuery(QUERY_ME);

    // completing the routine mutation
    const [completeRoutine] = useMutation(COMPLETE_ROUTINE);

    //destructuring global variables
    const {routines, activities} = state;

    // using useffect function for routines and activities"
    useEffect(() => {
        if (routines.length) {
            setRoutines(
                routines.filter((routine) => {
                    return !routine.isComplete;
                })
            )
        }
        if (activities) {
            setActivities(activities);
        }
    }, [routines, activities])

    // if not complete global store with user info
    useEffect(() => {
        if(userData) {
            dispatch({
                type: ADD_ROUTINES,
                routines: userData.me.routines
            });
            dispatch({
                type: ADD_ACTIVITIES,
                activities: userData.me.activities
            })
        }
    }, [userData.dispatch]);

    




}