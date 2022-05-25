// importing parameters that we're going to need to do the login function and link it all together to make function work properly
import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {Link} from 'react-router-dom';
import {LOGIN} from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
    // set the initial form state
    const [formState, setformState] = useState({email: '', password: ''});
    const [login, {error}] = useMutation(LOGIN);

    //setting up function that use a preventDefault that prevents an event for happening and also validates what the users is adding on the input field
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: {email: formState.email, password: formState.password},
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e)
        }
    };

    // Method that targets the name and value of the function of the react component and change the state
    const handleChange = (event) => {
        const {name, value} = event.target;
        setformState({
            ...formState,
            [name]: value,
        })
    },


}

