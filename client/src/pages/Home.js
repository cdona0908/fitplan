//importing parameters that we're going to need to add the homepage for the activities and link it all together to make the function work properly
import React from "react";
import {ActivityHome} from '../components/ActivityList/';
import {useQuery} from '@apollo/client';
import {Query_Activities} from '../utils/queries';
import {Wrap} from '@chakra-ui/react';

