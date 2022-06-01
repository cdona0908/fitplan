import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import  App   from '../src/App';
import './index.css';
// import Chakra-ui
import { ChakraProvider } from '@chakra-ui/react';
// import Fonts from './utils/fonts'
import theme from './utils/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);