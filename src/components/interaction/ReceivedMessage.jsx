"use client";
import React from "react";
import { Avatar, Box, HStack, Text } from "@chakra-ui/react";

const ReceivedMessage = () => {
  return (
    <>
      <HStack w={'full'} alignItems={'flex-start'} justifyContent={'flex-start'}>
        <Avatar size={'sm'} name="Gauranga Sundar" />
        <Box
          w={"full"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
        >
          <Box
            p={2}
            maxW={"70%"}
            bg={"aqua"}
            rounded={12}
          >
            <Text fontSize={"xs"} color={"#333"}>
              Hare Krishna
            </Text>
          </Box>
          <Text p={2} color={"blackAlpha.600"} fontSize={"8"}>
            16:59
          </Text>
        </Box>
      </HStack>
    </>
  );
};

export default ReceivedMessage;
