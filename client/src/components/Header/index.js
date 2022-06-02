import React from 'react';
import { Link } from 'react-router-dom';
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

// redirects user to dashboard if logged in
import { useNavigate } from 'react-router-dom';

// imports the login form from Login.js
import LoginForm from './Login';

// imports the signup form from Signup.js
import SignupForm from './Signup';

// import from Auth.js
import Auth from '../../utils/auth';

const Header = () => {
  // redirects user to dashboard
  const navigate = useNavigate();

  const variant = useBreakpointValue({ base: 'sm', md: 'big' });
  console.log(variant);

  return (
    <header>
      <div>
        <Flex minWidth="max-content" alignItems="center" gap="2" bg="#FFCC00">
          <Link to="/">
            <Box>
            <Image
                ml="2"
                width="100px"
                height="85px"
                objectFit="cover"
                src={require('../../assets/logo.png')}
                alt="fitplan logo"
              />
            </Box>
          </Link>
          {variant === 'big' ? (
            <Link to="/">
              <Box>
                <Heading as="h1" size="4xl" isTruncated color="#000000">
                  FitPlan
                </Heading>
              </Box>
            </Link>
          ) : null}
          <Spacer />
          {Auth.loggedIn() ? (
            <>
              <ButtonGroup gap="2" pr="3">
                {window.location.pathname === '/dashboard' ? (
                  <>
                    <Button
                      onClick={() => navigate('/')}
                      color="#000000"
                      variant="ghost"
                      _hover={{ bg: 'teal.300' }}>
                      Homepage
                    </Button>
                    <Button
                      onClick={Auth.logout}
                      color="#000000"
                      variant="ghost"
                      _hover={{ bg: 'teal.300' }}>
                      Logout{' '}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => navigate('/dashboard')}
                      color="#000000"
                      variant="ghost"
                      _hover={{ bg: 'teal.300' }}>
                      My Dashboard
                    </Button>
                    <Button
                      onClick={Auth.logout}
                      color="#000000"
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
  );
};

export default Header;