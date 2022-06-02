import React from "react";
// imports used from Chakra UI
import { Box, Text, Flex, Center} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex className="wrapper">
      <Center
        className="footer"
        minWidth="max-content"
        alignItems="center"
        gap="2"
        bg="#FFCC00"
      >
        <Box p="5">
          <Text fontSize="lg" color="black">
            &copy;{new Date().getFullYear()} by Ajaypal, Celia and Wilmer
          </Text>
        </Box>
      </Center>
    </Flex>
  );
};

export default Footer;
