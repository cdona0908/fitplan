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
    };

    // function that renders the template of the loginform

    return (
        <div className= "container my-1">
            <Link to = "/signup">⬅️Go to Signup</Link>
            
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <div className='flex-row space-between my-2'>
                    <label htmlFor='email'>Email:</label>
                    <input 
                      placeholder='youremail@test.com'
                      name='email'
                      type= 'email'
                      id= 'email'
                      onChange= {handleChange}
    
                    />
                 </div> 
                 <div className='flex-row space-between my-2'>
                    <label htmlFor='email'>Password:</label>
                    <input 
                      placeholder='******'
                      name='password'
                      type= 'password'
                      id= 'pwd'
                      onChange= {handleChange}
                    />
                 </div>
                 {error ? (
                    <div>
                        <p className='error-text'>Login Failed!</p>
                    </div>
                ) : null}
                <div className='flex-row flex-end'>
                    <button type= 'submit'>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Login
    



