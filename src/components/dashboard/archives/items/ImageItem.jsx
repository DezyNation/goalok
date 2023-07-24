"use client";
import { Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const ImageItem = ({ id, location, label, size }) => {
  return (
    <>
      <VStack
        boxSize={36}
        rounded={4}
        justifyContent={"center"}
        bgColor={"#FFF"}
        _hover={{ bg: "gray.50" }}
        cursor={"pointer"}
      >
        <Image src="/icons/photo.png" boxSize={20} />
        <Text fontSize={"sm"}>photo.png</Text>
      </VStack>
    </>
  );
};

export default ImageItem;
