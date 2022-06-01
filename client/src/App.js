import React from 'react';
import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import components
import Header from './components/Header';
import Footer from './components/Footer';

//import pages
//import Dashboard from '../src/pages/Dashboard';
import Home from './pages/Home';
import { StoreProvider } from './utils/state/UserContext';
//chakta imports
import { Center, Text } from '@chakra-ui/react';

//function from Apollo Client that will retrieve the token from localStorage
import { setContext } from '@apollo/client/link/context';

// function to retrieve the token from localStorage and set the HTTP request headers of every request to include the token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <Header />
           <Routes> 
            <Route path="/" element={<Home />}></Route> 
            {/* <Route path="dashboard" element={<Dashboard />}></Route>             */}
            {/* catch any routes that are not listed above and return this */}
            {/* <Route
              path="*"
              element={
                <section>
                  <Center height="88.6vh">
                    <Text fontSize="5xl">There's nothing here!</Text>
                  </Center>
                </section>
              }
            />*/}
          </Routes> 
          <Footer />
        </StoreProvider>
      </Router>
    </ApolloProvider> 
  );
}

export default App;
