import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/App";
import "./index.css";

// imports from Chakra
import { ChakraProvider } from "@chakra-ui/react";

// import Fonts from './utils/fonts'
import theme from "./utils/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
