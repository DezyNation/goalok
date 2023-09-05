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
  PopoverTrigger,
  Show,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  BsChatQuote,
  BsChatQuoteFill,
  BsEyeSlashFill,
  BsFlagFill,
  BsHeart,
  BsHeartFill,
  BsImages,
  BsPinMapFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaShare } from "react-icons/fa6";
import Lottie from "lottie-react";
import hearts from "../../../../public/icons/lottie/hearts.json";
import parse from "html-react-parser";

const Author = ({ name, createdAt, id, avatar, type }) => {
  return (
    <>
      <HStack w={"full"} alignItems={"center"} justifyContent={"space-between"}>
        <HStack alignItems={"center"} justifyContent={"flex-start"} pb={2}>
          <Avatar src={avatar} name={name} size={"sm"} />
          <Box>
            <Text fontSize={"sm"}>{name}</Text>
            <Text fontSize={8}>{createdAt}</Text>
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

const TextBlock = ({ description }) => {
  return (
    <>
      <Box fontSize={"sm"}>{parse(description || "")}</Box>
    </>
  );
};

const MediaBlock = ({ media }) => {
  return (
    <>
      <Box w={"full"} height={"xs"} pos={"relative"}>
        <Image
          src="https://i0.wp.com/myvoice.opindia.com/wp-content/uploads/sites/3/2020/06/Lord-Krishna-and-Gopis.jpg"
          w={"full"}
          h={"inherit"}
          objectFit={"cover"}
          rounded={4}
        />
        <Button
          colorScheme="blackAlpha"
          bgColor={"blackAlpha.600"}
          rounded={"full"}
          leftIcon={<BsImages />}
          pos={"absolute"}
          bottom={4}
          right={4}
          size={"sm"}
        >
          +3 images
        </Button>
      </Box>
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
  const [liked, setLiked] = useState(false);
  const [reactionPaused, setReactionPaused] = useState(true);

  useEffect(() => {
    if (liked) {
      setReactionPaused(false);
    } else {
      setReactionPaused(true);
    }
  }, [liked]);
  return (
    <>
      <HStack
        w={"full"}
        py={[1, 4]}
        justifyContent={"space-between"}
        pos={"relative"}
      >
        <Box
          flex={1}
          w={"full"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          pos={"relative"}
        >
          <Show above="md">
            <Button
              rounded={"full"}
              variant={"ghost"}
              colorScheme="red"
              leftIcon={liked ? <BsHeartFill /> : <BsHeart />}
              onClick={() => setLiked(!liked)}
            >
              Love
            </Button>
          </Show>
          <Show below="md">
            <IconButton
              size={"lg"}
              rounded={"full"}
              variant={"ghost"}
              colorScheme="red"
              icon={liked ? <BsHeartFill /> : <BsHeart />}
              onClick={() => setLiked(!liked)}
            />
          </Show>
          {reactionPaused || (
            <Box pos={"absolute"} left={["-4rem", "-2.5rem"]} width={48}>
              <Lottie
                width={50}
                height={150}
                animationData={hearts}
                loop={false}
                autoplay={true}
                onComplete={() => setReactionPaused(true)}
              />
            </Box>
          )}
        </Box>
        <Box
          flex={1}
          w={"full"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Show above="md">
            <Button
              rounded={"full"}
              variant={"ghost"}
              colorScheme="facebook"
              leftIcon={<BsChatQuote />}
            >
              Comment
            </Button>
          </Show>
          <Show below="md">
            <IconButton
              size={"lg"}
              rounded={"full"}
              variant={"ghost"}
              colorScheme="facebook"
              leftIcon={<BsChatQuote />}
            />
          </Show>
        </Box>
        <Box
          flex={1}
          w={"full"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Show above="md">
            <Button
              rounded={"full"}
              variant={"ghost"}
              colorScheme="facebook"
              leftIcon={<FaShare />}
            >
              Comment
            </Button>
          </Show>
          <Show below="md">
            <IconButton
              size={"lg"}
              rounded={"full"}
              variant={"ghost"}
              colorScheme="facebook"
              leftIcon={<FaShare />}
            />
          </Show>
        </Box>
      </HStack>
    </>
  );
};

const Post = ({ description, createdAt, creator, media, postId }) => {
  return (
    <>
      <Box
        w={"full"}
        p={4}
        pb={0}
        rounded={4}
        bgColor={"#FFF"}
        boxShadow={"base"}
      >
        <Author
          name={creator?.name}
          createdAt={createdAt}
          avatar={creator?.avatar?.url}
          id={postId}
        />
        <hr />
        <VStack
          w={"full"}
          py={4}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          gap={4}
        >
          <TextBlock description={description} />
          {/* <MediaBlock /> */}
        </VStack>
        {/* <Footer /> */}
        <hr />
        {/* <Interactions /> */}
      </Box>
    </>
  );
};

export default Post;
