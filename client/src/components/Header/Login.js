import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

// Chakra UI imports for styling
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react';

function LoginForm() {
    // Imports from Chakra UI
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    // redirects user to the dashboard
    const navigate = useNavigate();
  
    // initialRef is when the cursor loadsModal opens 
    const initialRef = React.useRef();

    // this is the last input for the user before submition
    const finalRef = React.useRef();
  
    // used from Chakra for success message
    const toast = useToast();

  
    // Sets initial form state by utilizing the state for users who are already registered
    const [formState, setFormState] = useState({ username: '', password: '' });
  
    // error message for formState
    const [errorMessage, setError] = useState({ type: '', message: '' });
  
    // login for the user utilizing the mutation
    const [login] = useMutation(LOGIN_USER);
  
    
  
    // generates updated formState
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value
      });
    };
  
    const handleFormSubmit = async () => {
      const { username, password } = formState;
  
      // validation
      if (!username) {
        setError({ type: 'username', message: 'Username is required.' });
        return;
      }
      if (!password) {
        setError({ type: 'password', message: 'Password is required.' });
        return;
      }
  
      // login data added utilizing the mutations
      try {
        const mutationResponse = await login({
          variables: {
            username: username,
            password: password
          }
        });
        const token = mutationResponse.data.login.token;
        // verified with JWT from login credentials
        Auth.login(token);
  
        // successful login display message
        toast({
          title: 'Success!',
          position: 'top-right',
          description: 'You are now logged in!',
          status: 'success',
          duration: 3000,
          isClosable: true
        });
  
        // resets the username and password fields
        setFormState({ username: '', password: '' });
  
        // Closes the modal
        onClose();
  
        // directs user to the dashboard
        navigate('/dashboard', { replace: true });
      } catch (e) {
        console.log(e);
        // shows error message
        toast({
          title: 'We could not validate your account.',
          position: 'top-right',
          description:
            'Please re-enter your credentials, or sign up to create a new account.',
          status: 'error',
          duration: 3000,
          isClosable: true
        });
      }
    };
  
    // password data input that lets you show or hide your password
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
  
    const OverlayOne = () => (
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
    );
  
    const [overlay] = React.useState(<OverlayOne />);
  
    // following modal shows from the login function
    return (
      <>
        <Button
          color="#000000"
          variant="ghost"
          _hover={{ bg: 'gray.400' }}
          onClick={onOpen}>
          Login
        </Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}>
          {overlay}
          <ModalContent>
            <ModalHeader>Welcome Back!</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={errorMessage.type === 'username'}>
                <FormLabel>Username</FormLabel>
                <Input
                  ref={initialRef}
                  name="username"
                  className="username-input"
                  placeholder="username"
                  value={formState.username}
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
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errorMessage.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={handleFormSubmit} bg="#FFCC00"  _hover={{ bg: 'gray.400' }} mr={3}>
                Enter
              </Button>
              <Button onClick={onClose} bg='red'  _hover={{ bg: 'gray.400' }}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  export default LoginForm;
