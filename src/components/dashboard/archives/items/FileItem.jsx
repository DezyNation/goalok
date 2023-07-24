"use client";
import { Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const FileItem = ({ id, location, label, size, type }) => {
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
        <Image
          src={type == "pdf" ? "/icons/pdf.png" : "/icons/file.png"}
          boxSize={20}
        />
        <Text fontSize={"sm"}>lottie.json</Text>
      </VStack>
    </>
  );
};

export default FileItem;
