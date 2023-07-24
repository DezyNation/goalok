"use client";
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const Advertisement = () => {
  return (
    <>
      <Box
        flex={1}
        h={"64"}
        bgColor={"#FFF"}
        rounded={4}
        overflow={"hidden"}
        pos={'relative'}
      >
        <Text
        pos={'absolute'}
        top={0} left={0}
          p={2} width={'fit-content'}
          roundedRight={"full"}
          bgColor={"blue.400"}
          color={"white"}
          fontSize={"xs"}
        >Space for advertisement</Text>
        <Image
          objectFit={"cover"}
          w={"full"}
          height={"inherit"}
          src="https://cf.cycle.in/cache/data/Products/ThreeinOne/ThreeinOne-800x800-800x800.jpg"
        />
      </Box>
    </>
  );
};

export default Advertisement;
