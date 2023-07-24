"use client";
import React, { useState } from "react";
import { Avatar, Box, Button, HStack, Spacer, Text } from "@chakra-ui/react";

const OnlineMembers = () => {
  const [members, setMembers] = useState([1, 1, 1]);
  return (
    <>
      <Box
        flex={1}
        p={4}
        bgColor={"#FFF"}
        rounded={4}
        display={"flex"}
        flexDir={"column"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        gap={6}
      >
        {members?.map((member, key) => (
          <HStack w={'full'} alignItems={"center"} key={key}>
            <Avatar name="Gauranga Sundar Das" boxSize={"10"} />
            <Box>
              <Text fontSize={"sm"}>Gauranga Sundar Das</Text>
              <Text fontSize={8}>ISKCON Inc.</Text>
            </Box>
            <Spacer />
            <Button
              colorScheme="twitter"
              bgColor={"aliceblue"}
              size={"xs"}
              color={"twitter.500"}
              rounded={"full"}
              _hover={{ color: "#FFF", bgColor: "twitter.500" }}
            >
              Message
            </Button>
          </HStack>
        ))}
      </Box>
    </>
  );
};

export default OnlineMembers;
