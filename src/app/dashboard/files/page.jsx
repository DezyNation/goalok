"use client";
import ArchiveItem from "@/components/dashboard/files/ArchiveItem";
import {
  Button,
  FormControl,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsInfo, BsInfoCircleFill, BsPlus } from "react-icons/bs";
import { FcFile, FcFolder } from "react-icons/fc";

const page = () => {
  const [browseArchiveType, setBrowseArchiveType] = useState("public");

  const files = [
    { type: "folder", isShared: true },
    { type: "pdf", isShared: false },
    { type: "audio", isShared: false },
    { type: "video", isShared: true },
    { type: "photo", isShared: false },
  ];

  return (
    <>
      <HStack
        py={4}
        w={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text fontSize={"lg"} fontWeight={"semibold"}>
          Browse Shared Files
        </Text>
      </HStack>
      <Stack
        w={"full"}
        py={4}
        direction={["row"]}
        alignItems={"flex-start"}
        justifyContent={["space-between", "flex-start"]}
        flexWrap={"wrap"}
        gap={[4, 8]}
      >
        {files.map((file, key) => (
          <ArchiveItem type={file.type} isShared={file.isShared} key={key} />
        ))}
      </Stack>

      <Popover>
        <PopoverTrigger>
          <Button
            leftIcon={<BsPlus size={24} />}
            rounded={"full"}
            bgColor={"#333"}
            colorScheme="teal"
            pos={"fixed"}
            bottom={4}
            right={["35%", 4]}
          >
            New
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody p={0}>
            <HStack p={3} _hover={{ bgColor: "gray.50" }} cursor={"pointer"}>
              <Icon as={FcFolder} size={"sm"} />
              <Text fontSize={"sm"} fontWeight={"semibold"}>
                Create New Folder
              </Text>
            </HStack>
            <HStack p={3} _hover={{ bgColor: "gray.50" }} cursor={"pointer"}>
              <Icon as={FcFile} size={"sm"} />
              <Text fontSize={"sm"} fontWeight={"semibold"}>
                Upload Files
              </Text>
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>

    </>
  );
};

export default page;