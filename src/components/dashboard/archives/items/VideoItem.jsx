"use client";
import { Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const VideoItem = ({ id, location, label, size }) => {
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
        <Image src="/icons/video.png" boxSize={20} />
        <Text fontSize={"sm"}>video.mp4</Text>
      </VStack>
    </>
  );
};

export default VideoItem;
