"use client";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const NoSessionsCard = () => {
  return (
    <>
      <Box
        w={["xs", "sm"]}
        boxShadow={'lg'}
        rounded={"16"}
        height={56}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text>No sessions to display</Text>
      </Box>
    </>
  );
};

export default NoSessionsCard;
