import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';

// Imported from Chakra
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  FormErrorMessage
} from '@chakra-ui/react';

function SignupForm() {
  // Imports for the modal from Chakra UI
  const { isOpen, onOpen, onClose } = useDisclosure();

  // redirects after signing up to the dashboard
  const navigate = useNavigate();

  // Utilized for success messaging
  const toast = useToast();

  // initialRef loads cursor when the modal opens
  const initialRef = React.useRef();

  // finalRef is the final input for  the user before submittion 
  const finalRef = React.useRef();

  // Setting form state by using state for already registered users with username email and password fields.
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errorMessage, setError] = useState({ type: '', message: '' });

  // mutation for addUser to get fields from handleFormSubmit()
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = formState;

    // input validations
    if (!username) {
      setError({ type: 'username', message: 'Username is required' });
      return;
    }
    if (!email) {
      setError({ type: 'email', message: 'Email is required' });
      return;
    }
    if (!password) {
      setError({ type: 'password', message: 'Password is required' });
      return;
    }
    if (password.length < 6) {
      setError({
        type: 'password',
        message: 'Password must be at least 5 characters'
      });
      return;
    }

    // error testing
    try {
      const mutationResponse = await addUser({
        variables: {
          username: username,
          email: email,
          password: password
        }
      });
      // users credentials are verified with JWT in auth.js
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);

      //  this resets the Signup Form
      setFormState({ email: '', password: '' });

      // success message
      toast({
        title: 'Account created.',
        position: 'top-right',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true
      });

      // Closes the modal
      onClose();

      // directs the user to the dahsboard
      navigate('/dashboard', { replace: true });
    } catch (e) {
      // show errors on the console
      console.log(e);

      // creates error messages
      let errorMessage = 'We could not create an account for you.';
      if (e.message.includes('username')) {
        errorMessage = 'That username is already being used.';
      }
      if (e.message.includes('duplicate key' && 'email')) {
        errorMessage = 'That email already belongs to a user.';
      }
      if (e.message.includes('email' && 'match')) {
        errorMessage = 'Not a valid email address.';
      }
      // error message display
      toast({
        title: 'Error!',
        position: 'top-right',
        description: errorMessage,
        status: 'error',
        duration: 9000,
        isClosable: true
      });

      // close modal
      onClose();
    }
  };

  // Any time form input has been added it registers on the page as users type, generating and returning updated form state.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  // can show and hide the password
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );

  const [overlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Button
        color="#000000"
        variant="ghost"
        _hover={{ bg: 'gray.400' }}
        onClick={onOpen}>
        Sign Up
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errorMessage.type === 'username'}>
              <FormLabel>Username</FormLabel>
              <Input
                ref={initialRef}
                name="username"
                value={formState.username}
                className="username-input"
                placeholder="username"
                onChange={handleChange}
              />
              <FormErrorMessage>{errorMessage.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errorMessage.type === 'email'}>
              <FormLabel>Email Address</FormLabel>
              <Input
                name="email"
                value={formState.email}
                className="email-input"
                placeholder="email"
                onChange={handleChange}
              />
              <FormErrorMessage>{errorMessage.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errorMessage.type === 'password'}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  className="password-input"
                  placeholder="******"
                  name="password"
                  type={show ? 'text' : 'password'}
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <InputRightElement width="4.5rem">
                  <Button  h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errorMessage.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleFormSubmit} bg="#FFCC00"  _hover={{ bg: 'gray.400' }} mr={3}>
              Save
            </Button>
            <Button onClick={onClose} bg='red'  _hover={{ bg: 'gray.400' }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignupForm;
