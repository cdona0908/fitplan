// importing parameters that we're going to need to do the signup function and link it all together to make function work properly
import  React, {usestate} from 'react';
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';

//setting up the main signup function
function Signup(props) {
    // set the initial form state
    const [formState, setformState] = useState({email: '', password: ''});
    const [addUser] = useMutation(ADD_USER);

    //setting up function that use a preventDefault that prevents an event for happening and also validates what the users is adding on the input field

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                email: formState.email,
                password: formState.password,
                firstName: formState.firstName,
                lastName: formState.lastName
            }
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token)
    };
    //Method that tagets the name and value of the function of the react component and changes the state
    const handleChange = (event) => {
        const {name, value} = event.target;
        setformState({
            ...formState,
            [name]: value,
        })
    }
};