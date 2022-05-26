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
}