// importing parameters that we're going to need to do the signup function and link it all together to make function work properly
import  React, {usestate} from 'react';
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';

//setting up the initi