"use client";
import { Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const FolderItem = ({ id, location, label, size }) => {
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
        <Image src="/icons/folder.png" boxSize={20} />
        <Text fontSize={"sm"}>Folder</Text>
      </VStack>
    </>
  );
};

export default FolderItem;
