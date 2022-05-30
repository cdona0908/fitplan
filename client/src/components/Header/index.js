<<<<<<< HEAD
// Import the main parameters that we are going to use to make header work properly
import React from "react";
import {Link} from 'react-router-dom';
import {
    Box,
    Flex,
    Heading,
    Spacer,
    ButtonGroup,
    Image,
    Button,
    useBreakpointValue
} from '@chakra-ui/react';

import { useNavigate } from "react-router-dom";

import LoginForm from './Login';

import SignupForm from './Signup';

import Auth from '../../utils/auth';

// Adding the function Header that connects user to Dashboard 
const Header = () => {
    const navigate = useNavigate();

    const variant = useBreakpointValue({base: 'sm', md: 'big'});
    console.log(variant);

    return (
        <header>
            <div>
                <Flex minWidth ='max-content' alignItems='center' gap='2' bg='#2C7A7B'>
                    <Link to='/'>
                        <Box>
                            <Image
                                ml='2' 
                                width='100px'
                                height='85px'
                                objectFit='cover'
                                src={require('../../assets/logo.png')}
                                alt='fit-plan logo'
                            />
                        </Box>
                    </Link>
                    {variant ==='big' ? (
                        <Link to='/'>
                            <Box>
                                <Heading as='h1' size='4xl' isTruncated color='#FFFFFF'>
                                    Fit Plan

                                </Heading>

                            </Box>
                        </Link>
                    ) : null}
                    <Spacer />
                    {Auth.loggedIn() ? (
                        <>
                            <ButtonGroup gap='2' pr='3'>
                                {window.location.pathname === '/dashboard ' ? (
                                    <>
                                        <Button 
                                            onClick={() => navigate('/')}
                                            color='#FFFFFF'
                                            variant='ghost'
                                            _hover={{bg: 'teal.300'}}>
                                            Homepage {''}
                                        </Button>
                                        <Button
                                            onClick={Auth.logout}
                                            color="#FFFFFF"
                                            variant="ghost"
                                            _hover={{ bg: 'teal.300' }}>
                                            Logout{' '}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            onClick={() => navigate('/dashboard')}
                                            color='#FFFFFF'
                                            variant='ghost'
                                            _hover={{bg: 'teal.300'}}>
                                            My Dashboard
                                        </Button>
                                        <Button
                                            onClick={Auth.logout}
                                            color="#FFFFFF"
                                            variant="ghost"
                                            _hover={{ bg: 'teal.300' }}>
                                            Logout{' '}
                                        </Button>
                                    </>
                                )}
                            </ButtonGroup>
                        </>
                    ) : (
                        <ButtonGroup gap="2" pr="3">
                            <SignupForm>Sign Up</SignupForm>
                            <LoginForm>Login</LoginForm>
                            </ButtonGroup>
                    )}
                </Flex>
            </div>
        </header>
    )

};

export default Header

=======
import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>FitPlan</h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
            <Link to="/profile">My Account</Link>
            <a href="/" onClick={logout}>
              Logout
            </a>
            </>) : (
              <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              </>
            )
          }          
        </nav>
      </div>
    </header>
  );
};

export default Header;
>>>>>>> 73d96e8199d2c7ab24c3c25c92af1e3dfb02480a
