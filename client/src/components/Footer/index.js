import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";
const Footer = () => {
  return (
    <div className="wrapper">
      <Center
        className="footer"
        minWidth="max-content"
        alignItems="center"
        gap="2"
        bg="#FFFFFF"
      >
        <Box p="5">
          <Text fontSize="lg" color="black">
            &copy;{new Date().getFullYear()} by Ajaypal, Celia and Wilmer
          </Text>
        </Box>
      </Center>
    </div>
  );
};
export default Footer;