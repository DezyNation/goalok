"use client";
import ReceivedMessage from "@/components/interaction/ReceivedMessage";
import SentMessage from "@/components/interaction/SentMessage";
import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScaleFade,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiRupee, BiSolidParty } from "react-icons/bi";
import {
  BsEmojiHeartEyes,
  BsEmojiHeartEyesFill,
  BsEmojiLaughingFill,
  BsHeartFill,
  BsX,
} from "react-icons/bs";
import { FaQuestion } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const QnaBox = ({ onClose }) => {
  const [showReactions, setShowReactions] = useState(false);

  return (
    <>
      <Box flex={1} h={"full"} rounded={12} bg={"#FFF"} boxShadow={"lg"}>
        <HStack
          w={"full"}
          justifyContent={"space-between"}
          py={3}
          px={4}
          roundedTop={12}
          bgColor={"blanchedalmond"}
        >
          <Text
            className="messiri"
            fontSize={["lg", "lg"]}
            fontWeight={"semibold"}
          >
            Ask Your Questions Here
          </Text>
          <IconButton
            bgColor={"transparent"}
            icon={<BsX size={20} />}
            onClick={onClose}
          />
        </HStack>
        {/* QnA area */}
        <VStack
          w={"full"}
          p={4}
          gap={6}
          minH={["md"]}
          maxH={["md"]}
          overflowY={"scroll"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
        >
          <SentMessage />
          <ReceivedMessage />
        </VStack>
        <HStack
          py={3}
          w={"full"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Box
            p={3}
            roundedLeft={"full"}
            boxShadow={"lg"}
            border={"1px"}
            borderColor={"blackAlpha.100"}
            borderRight={0}
            transition={"all .3s ease"}
          >
            <HStack gap={2}>
              <IconButton
                icon={<BiRupee />}
                boxSize={8}
                rounded={"full"}
                _hover={{ bgColor: "twitter.500", color: "#FFF" }}
              />
              <IconButton
                icon={<BsEmojiHeartEyes />}
                boxSize={8}
                rounded={"full"}
                _hover={{ bgColor: "yellow.400" }}
                bgColor={showReactions ? "yellow.400" : "gray.100"}
                onClick={() => setShowReactions(!showReactions)}
              />
              {showReactions ? (
                <HStack gap={2} transition={"all .2s ease"}>
                  <IconButton
                    bg={"#FFF"}
                    icon={<BsHeartFill />}
                    boxSize={8}
                    rounded={"full"}
                    color={"tomato"}
                  />
                  <Box
                    bg={"#FFF"}
                    w={10}
                    h={8}
                    rounded={"full"}
                    color={"yellow.500"}
                    display={"grid"}
                    placeContent={"center"}
                    _hover={{ bgColor: "gray.200" }}
                    cursor={"pointer"}
                  >
                    🎉
                  </Box>
                  <Box
                    bg={"#FFF"}
                    w={10}
                    h={8}
                    rounded={"full"}
                    color={"yellow.500"}
                    display={"grid"}
                    placeContent={"center"}
                    _hover={{ bgColor: "gray.200" }}
                    cursor={"pointer"}
                  >
                    🙏
                  </Box>
                  <Box
                    bg={"#FFF"}
                    w={10}
                    h={8}
                    rounded={"full"}
                    color={"yellow.500"}
                    display={"grid"}
                    placeContent={"center"}
                    _hover={{ bgColor: "gray.200" }}
                    cursor={"pointer"}
                  >
                    😍
                  </Box>
                </HStack>
              ) : null}
            </HStack>
          </Box>
        </HStack>
        <HStack p={3} w={"full"}>
          <InputGroup>
            <Input
              px={2}
              noOfLines={99}
              fontSize={"xs"}
              variant={"flushed"}
              placeholder="Type here..."
            />
            <InputRightElement
              children={<IoSend color="#999" style={{ cursor: "pointer" }} />}
            />
          </InputGroup>
        </HStack>
      </Box>
    </>
  );
};

const QnaButton = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <IconButton
        display={isOpen ? "none" : "flex"}
        boxSize={16}
        bgColor={"#333"}
        color={"#FFF"}
        _hover={{ bgColor: "#666", color: "#FFF" }}
        rounded={"full"}
        roundedTopRight={0}
        icon={<FaQuestion size={20} />}
        pos={"fixed"}
        bottom={4}
        right={4}
        onClick={onToggle}
      />
      <HStack
        pos={"fixed"}
        top={0}
        left={0}
        w={"full"}
        h={"100vh"}
        p={[0, 4]}
        display={isOpen ? "flex" : "none"}
        alignItems={"center"}
        justifyContent={["center", "flex-end"]}
        bgColor={"blackAlpha.700"}
      >
        <ScaleFade initialScale={0.9} in={isOpen}>
          <Box w={"xs"} h={["100vh", "auto"]}>
            <QnaBox onClose={onToggle} />
          </Box>
        </ScaleFade>
      </HStack>
    </>
  );
};

export default QnaButton;
