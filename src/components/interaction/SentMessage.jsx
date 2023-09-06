"use client";
import React from "react";
import { Avatar, Box, HStack, Icon, Text } from "@chakra-ui/react";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";

const SentMessage = ({
  message,
  name,
  avatar,
  timestamp,
  blueTick,
  greenTick,
}) => {
  return (
    <>
      <HStack w={"full"} alignItems={"flex-start"} justifyContent={"flex-end"}>
        <Box
          w={"full"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-end"}
          justifyContent={"flex-start"}
        >
          <Box p={2} maxW={"70%"} bg={"#333"} rounded={12}>
            <Text fontSize={"xs"} color={"#FFF"}>
              {message}
            </Text>
          </Box>
          <HStack>
            <Text p={2} color={"blackAlpha.600"} fontSize={"8"}>
              {new Date(timestamp).toLocaleString()}{" "}
            </Text>
            {greenTick ? (
              <Icon
                color={"whatsapp.500"}
                as={BsCheckCircleFill}
                fontSize={"12px"}
              />
            ) : blueTick ? (
              <Icon
                color={"twitter.500"}
                fontSize={"12px"}
                as={BsCheckCircle}
              />
            ) : null}
          </HStack>
        </Box>
        <Avatar size={"sm"} name={name} src={avatar} />
      </HStack>
    </>
  );
};

export default SentMessage;
