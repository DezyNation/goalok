"use client";
import ArchiveItem from "@/components/dashboard/archives/ArchiveItem";
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
      <HStack justifyContent={"flex-end"}>
        <Popover>
          <PopoverTrigger>
            <Button
              leftIcon={<BsInfoCircleFill />}
              variant={"ghost"}
              color={"gray.600"}
              size={"sm"}
            >
              Learn More
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              {browseArchiveType == "public" ? (
                <VStack w={"full"} alignItems={"flex-start"}>
                  <Text fontSize={"sm"}>
                    • Files in the public archive can be shared to anyone
                    without any restrictions.
                  </Text>
                  <Text fontSize={"sm"}>
                    • Shared links remain valid forever.
                  </Text>
                  <Text fontSize={"sm"}>
                    • Files from the public archive can be used while creating a
                    post or while interacting with anyone.
                  </Text>
                </VStack>
              ) : (
                <VStack w={"full"} alignItems={"flex-start"}>
                  <Text fontSize={"sm"}>
                    • Files in the private archive can be shared with the
                    registered users only.
                  </Text>
                  <Text fontSize={"sm"}>
                    • The shared private files can be accessed either via a
                    secret code or an OTP.
                  </Text>
                  <Text fontSize={"sm"}>
                    • These private files can never be used anywhere in this
                    portal.
                  </Text>
                </VStack>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
      <HStack
        py={4}
        w={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text fontSize={"lg"} fontWeight={"semibold"}>
          Browse Your {browseArchiveType == "public" ? "Files" : "Private Archive"}
        </Text>

        <Select
          name="browseArchiveType"
          w={36}
          bgColor={"#FFF"}
          onChange={(e) => setBrowseArchiveType(e.target.value)}
          value={browseArchiveType}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </Select>
      </HStack>
      <Stack
        w={"full"}
        py={4}
        direction={["row"]}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
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
            right={4}
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
