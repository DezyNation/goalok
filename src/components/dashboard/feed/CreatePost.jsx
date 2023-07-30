"use client";
import { Avatar, Box, Button, HStack, Text, Textarea } from "@chakra-ui/react";
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
            h={12}
            variant={"unstyled"}
            placeholder="Share your thoughts, Sangam"
            mb={2}
            resize={"none"}
          />
        </HStack>
        <HStack py={2} gap={6}>
          <HStack rounded={"full"} gap={0} bgColor={"gray.100"}>
            <Box
              p={2}
              rounded={"full"}
              display={"grid"}
              placeContent={"center"}
              bgColor={"purple.500"}
            >
              <BsImages color="#FFF" />
            </Box>
            <Box pr={3} pl={2}>
              <Text fontSize={"xs"}>Gallery</Text>
            </Box>
          </HStack>

          <HStack rounded={"full"} gap={0} bgColor={"gray.100"}>
            <Box
              p={2}
              rounded={"full"}
              display={"grid"}
              placeContent={"center"}
              bgColor={"pink.400"}
            >
              <FaLocationDot color="#FFF" />
            </Box>
            <Box pr={3} pl={2}>
              <Text fontSize={"xs"}>Share Location</Text>
            </Box>
          </HStack>

          <HStack rounded={"full"} gap={0} bgColor={"gray.100"}>
            <Box
              p={2}
              rounded={"full"}
              display={"grid"}
              placeContent={"center"}
              bgColor={"yellow.500"}
            >
              <FaUserTag color="#FFF" />
            </Box>
            <Box pr={3} pl={2}>
              <Text fontSize={"xs"}>Tag Someone</Text>
            </Box>
          </HStack>
        </HStack>
        <HStack p={2} justifyContent={"flex-end"}>
          <Button
            colorScheme="pink"
            bgColor={"fuchsia"}
            rightIcon={<IoSend />}
            rounded={'full'}
            boxShadow={'md'}
          >
            Share
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default CreatePost;
