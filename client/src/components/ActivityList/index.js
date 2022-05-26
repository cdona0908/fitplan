// Importing the parameters that we are going to used to implement the function
import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    Modalheader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    Circle,
    Text,
    WrapItem,
    useToast,
    IconButton,
    flex,
    Collapse,
    Heading
} from '@chakra-ui/react';
import {SmallCloseIcon, ArrowUpIcon} from '@chakra-ui/icons';

import {useMutation} from '@apollo/client';
import {ADD_ACTIVITY, REMOVE_ACTIVITY} from '../../utils/mutations';

import Auth from '../../utils/auth';

import {useStoreContext} from '../../utils/state/UserContext';
import {ADD_ACTIVITIES} from '../../utils/state/actions';

