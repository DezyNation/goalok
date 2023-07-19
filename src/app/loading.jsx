"use client";
import React from "react";
import Lottie from "lottie-react";
import loading from "../../public/loading.json";
import { Box, Text, VStack } from "@chakra-ui/react";

const Loading = () => {
  return (
    <>
      <VStack
        w={"full"}
        h={"100vh"}
        pos={"fixed"}
        top={0}
        left={0}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box w={48} h={48}>
          <Lottie
            animationData={loading}
            loop
            autoPlay
            width={48}
            height={48}
          />
        </Box>
        <Text fontSize={"sm"}>Loading...</Text>
      </VStack>
    </>
  );
};

export default Loading;
