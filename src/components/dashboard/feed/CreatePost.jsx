"use client";
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { BsImages, BsPencilSquare, BsSendFill } from "react-icons/bs";
import { FaLocationDot, FaUserTag } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const CreatePost = () => {
  return (
    <>
      <Box w={"full"} p={3} rounded={4} bgColor={"#FFF"}>
        <HStack justifyContent={"flex-end"}>
          <Button
            leftIcon={<BsPencilSquare />}
            variant={"ghost"}
            colorScheme="twitter"
            size={"sm"}
          >
            Create Post
          </Button>
        </HStack>
        <HStack p={3} alignItems={"flex-start"} justifyContent={"flex-start"}>
          <Avatar
            name="Sangam Kumar"
            src={"https://krishnastore.com/images/cache/545.jpg"}
            size={"sm"}
          />
          <Textarea
            fontSize={"sm"}
            w={"full"}
            h={[16, 12]}
            variant={"unstyled"}
            placeholder="Share your thoughts, Sangam"
            mb={2}
            resize={"none"}
          />
        </HStack>
        <HStack py={2} gap={6} w={"full"} overflowX={"scroll"}>
          <HStack rounded={"full"} gap={0} bgColor={"gray.100"}>
            <IconButton
              size={"sm"}
              color={"#FFF"}
              rounded={"full"}
              icon={<BsImages />}
              bgColor={"purple.500"}
            />
            <Text w={['28', 'auto']} pr={3} pl={2} fontSize={"xs"}>
              Insert Media
            </Text>
          </HStack>

          <HStack rounded={"full"} gap={0} bgColor={"gray.100"}>
            <IconButton
              size={"sm"}
              color={"#FFF"}
              rounded={"full"}
              icon={<FaLocationDot />}
              bgColor={"pink.400"}
            />
            <Text w={['28', 'auto']} pr={3} pl={2} fontSize={"xs"}>
              Share Location
            </Text>
          </HStack>

          <HStack rounded={"full"} gap={0} bgColor={"gray.100"}>
            <IconButton
              size={"sm"}
              color={"#FFF"}
              rounded={"full"}
              icon={<FaUserTag />}
              bgColor={"yellow.500"}
            />
              <Text w={['28', 'auto']} pr={3} pl={2} fontSize={"xs"}>Tag People</Text>
          </HStack>
        </HStack>
        <br />
        <HStack p={2} justifyContent={"flex-end"}>
          <Button
            colorScheme="pink"
            bgColor={"fuchsia"}
            rightIcon={<IoSend />}
            rounded={"full"}
            boxShadow={"md"}
          >
            Share
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default CreatePost;
