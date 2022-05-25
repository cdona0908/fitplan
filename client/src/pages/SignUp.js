// importing parameters that we're going to need to do the signup function and link it all together to make function work properly
import  React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';
import {ADD_USER} from '../utils/mutations'
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
                username: formState.username,
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


    // function that renders the template for the Signup form
return (
    <div className= "container my-1">
        <Link to = "/login">⬅️Go to login</Link>
        
        <h2>Signup</h2>
        <form onSubmit={handleFormSubmit}>
            <div className='flex-row space-between my-2'>
                <label htmlFor='username'>username:</label>
                <input 
                  placeholder='username'
                  name='username'
                  type= 'username'
                  id= 'username'
                  onChange= {handleChange}

                />
             </div> 
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
             <div className='flex-row flex-end'>
                 <button type= 'submit'>Submit</button>
             </div>
        </form>
    </div>
    );
}

