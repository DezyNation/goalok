"use client";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  BsChatQuoteFill,
  BsEyeSlashFill,
  BsFlagFill,
  BsHeartFill,
  BsPinMap,
  BsPinMapFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaShare } from "react-icons/fa6";

const Author = ({ name, id, image, type }) => {
  return (
    <>
      <HStack w={"full"} alignItems={"center"} justifyContent={"space-between"}>
        <HStack alignItems={"center"} justifyContent={"flex-start"} pb={2}>
          <Avatar name="Subal Das" size={"sm"} />
          <Box>
            <Text fontSize={"sm"}>Subal Das</Text>
            <Text fontSize={8}>ISKCON Inc.</Text>
          </Box>
        </HStack>
        <Popover>
          <PopoverTrigger>
            <IconButton
              icon={<BsThreeDotsVertical />}
              variant={"ghost"}
              size={"sm"}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody p={0}>
              <HStack p={3} _hover={{ bgColor: "gray.50" }} cursor={"pointer"}>
                <Icon as={BsFlagFill} color={"red.400"} size={"sm"} />
                <Text color={"red.400"} fontSize={"sm"} fontWeight={"semibold"}>
                  Report this post
                </Text>
              </HStack>
              <HStack p={3} _hover={{ bgColor: "gray.50" }} cursor={"pointer"}>
                <Icon as={BsEyeSlashFill} size={"sm"} />
                <Text fontSize={"sm"} fontWeight={"semibold"}>
                  Hide this post
                </Text>
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </>
  );
};

const TextBlock = ({ content }) => {
  return (
    <>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ipsam, id
        veniam dolor dolorem animi quod tempore architecto perferendis, at velit
        repellat soluta nemo sequi excepturi commodi. Eveniet, facilis
        explicabo?
      </Text>
    </>
  );
};

const MediaBlock = ({ media }) => {
  return (
    <>
      <Stack w={"full"} direction={["column", "row"]} gap={4}>
        <Box flex={2} height={52}>
          <Image
            src="https://i0.wp.com/myvoice.opindia.com/wp-content/uploads/sites/3/2020/06/Lord-Krishna-and-Gopis.jpg"
            w={"full"}
            h={"inherit"}
            objectFit={"cover"}
            rounded={4}
          />
        </Box>
        <VStack w={"full"} gap={4} flex={1}>
          <HStack w={"full"}>
            <Image
              src="https://i0.wp.com/myvoice.opindia.com/wp-content/uploads/sites/3/2020/06/Lord-Krishna-and-Gopis.jpg"
              objectFit={"cover"}
              boxSize={24}
              rounded={4}
            />
            <Image
              src="https://i0.wp.com/myvoice.opindia.com/wp-content/uploads/sites/3/2020/06/Lord-Krishna-and-Gopis.jpg"
              objectFit={"cover"}
              boxSize={24}
              rounded={4}
            />
          </HStack>
          <HStack w={"full"}>
            <Image
              src="https://i0.wp.com/myvoice.opindia.com/wp-content/uploads/sites/3/2020/06/Lord-Krishna-and-Gopis.jpg"
              objectFit={"cover"}
              boxSize={24}
              rounded={4}
            />
            <Image
              src="https://i0.wp.com/myvoice.opindia.com/wp-content/uploads/sites/3/2020/06/Lord-Krishna-and-Gopis.jpg"
              objectFit={"cover"}
              boxSize={24}
              rounded={4}
            />
          </HStack>
        </VStack>
      </Stack>
    </>
  );
};

const Footer = () => {
  return (
    <>
      <HStack justifyContent={"flex-start"} gap={8} py={4}>
        <HStack cursor={"pointer"}>
          <AvatarGroup size={"xs"} max={2}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
          <Text fontSize={"xs"}>Tagged</Text>
        </HStack>
        <Button
          rounded={"full"}
          variant={"ghost"}
          colorScheme="twitter"
          bgColor={"twitter.50"}
          size={"xs"}
          leftIcon={<BsPinMapFill />}
        >
          New Delhi, India
        </Button>
      </HStack>
    </>
  );
};

const Interactions = () => {
  return (
    <>
      <HStack w={"full"} py={4} justifyContent={"space-between"}>
        <Box
          flex={1}
          w={"full"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <Button
            rounded={"full"}
            variant={"ghost"}
            colorScheme="red"
            leftIcon={<BsHeartFill />}
          >
            Love
          </Button>
        </Box>
        <Box
          flex={1}
          w={"full"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Button
            rounded={"full"}
            variant={"ghost"}
            colorScheme="facebook"
            leftIcon={<BsChatQuoteFill />}
          >
            Comment
          </Button>
        </Box>
        <Box
          flex={1}
          w={"full"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Button
            rounded={"full"}
            variant={"ghost"}
            colorScheme="yellow"
            leftIcon={<FaShare />}
          >
            Share
          </Button>
        </Box>
      </HStack>
    </>
  );
};

const Post = ({ content, media }) => {
  return (
    <>
      <Box p={4} pb={0} rounded={4} bgColor={"#FFF"} boxShadow={"base"}>
        <Author />
        <hr />
        <VStack
          w={"full"}
          py={4}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          gap={4}
        >
          <TextBlock />
          <MediaBlock />
        </VStack>
        <Footer />
        <hr />
        <Interactions />
      </Box>
    </>
  );
};

export default Post;
