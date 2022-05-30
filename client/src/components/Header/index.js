// Import the main parameters that we are going to use to make header work properly
import React from "react";
import {Link} from 'react-router-dom';
import {
    Box,
    Flex,
    Heading,
    Spacer,
    ButtonGroup,
    Image,
    Button,
    useBreakpointValue
} from '@chakra-ui/react';

import { useNavigate } from "react-router-dom";

import LoginForm from './Login';

import SignupForm from './Signup';

import Auth from '../../utils/auth';

// Adding the function Header that connects user to Dashboard 

