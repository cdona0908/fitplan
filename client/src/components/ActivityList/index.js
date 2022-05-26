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

/*--------------------
-----ACTIVITY HOME---- 
----------------------*/

const ActivityHome = ({activity}) => {
    const {_id, title, image, text} = activity;

    const[state, dispatch] = useStoreContext();

    const toast = useToast();

    const {isOpen, onOpen, onClose} = useDisclosure();

    const initialRef = React.useRef();
    const finalRef = React.useRef();

    const [saveActivity] = useMutation(ADD_ACTIVITY);

    // if user clicks it add the activity to homepage
    const handleHomeClick = async () => {
        //validating user login
        if (!Auth.loggedIn()) {
            toast({
                title: '',
                description: '',
                status: 'error',
                duration: '',
                isClosable: true,
                position: 'top-right'
            });
            return;
        }
    }




}

