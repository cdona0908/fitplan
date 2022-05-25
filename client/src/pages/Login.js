// importing parameters that we're going to need to do the login function and link it all together to make function work properly
import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {Link} from 'react-router-dom';
import {LOGIN} from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
    const [formState, setformState] = useState({email: '', password: ''});
    const [login, {error}] = useMutation(LOGIN);
}
