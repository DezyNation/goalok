"use client";
import React from "react";
import { Avatar, Box, HStack, Text } from "@chakra-ui/react";

const SentMessage = () => {
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
          <Box
            p={2}
            maxW={"70%"}
            bg={"aqua"}
            rounded={12}
          >
            <Text fontSize={"xs"} color={"#333"}>
              Hare Krishna guru ji 🙏 <br />
              Dandwat pranam 🙇
            </Text>
          </Box>
          <Text p={2} color={"blackAlpha.600"} fontSize={"8"}>
            16:59 &nbsp; | &nbsp; India
          </Text>
        </Box>
        <Avatar size={"sm"} name="Sangam Kumar" />
      </HStack>
    </>
  );
};

export default SentMessage;
