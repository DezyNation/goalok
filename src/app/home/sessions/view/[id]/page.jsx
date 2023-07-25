"use client";
import React, { useState } from "react";
import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Plyr from "plyr-react";
import "plyr/dist/plyr.css";
import BlankSpacer from "@/components/global/BlankSpacer";
import { IoSend } from "react-icons/io5";
import { BiRupee, BiSolidParty } from "react-icons/bi";
import { BsEmojiHeartEyes, BsEmojiHeartEyesFill, BsEmojiLaughingFill, BsHeartFill } from "react-icons/bs";
import SentMessage from "@/components/interaction/SentMessage";
import ReceivedMessage from "@/components/interaction/ReceivedMessage";

const page = ({ params }) => {
  const { id } = params;
  const videoSrc = {
    type: "video",
    sources: [
      {
        src: "5IqHGB9_N50",
        provider: "youtube",
      },
    ],
  };

  const [showReactions, setShowReactions] = useState(false);

  return (
    <>
      <Stack
        mt={"10vh"}
        p={[4, 8, 16]}
        direction={["column", "row"]}
        alignItems={"flex-start"}
        gap={8}
      >
        <Box flex={3}>
          <Text
            textTransform={"capitalize"}
            className="messiri"
            fontSize={["3xl", "4xl"]}
          >
            {id?.replace(/-/g, " ")}
          </Text>
          <Text fontWeight={"semibold"}>
            By{" "}
            <Link href={"#"} style={{ color: "#EBB02D" }}>
              Gauranga Sundar Prabhu
            </Link>
          </Text>
          <br />
          <Box rounded={16} overflow={"hidden"}>
            <Plyr source={videoSrc} options={{ ratio: "16:9" }} />
          </Box>
        </Box>
        <Box flex={1} h={"full"} rounded={12} bg={"#FFF"} boxShadow={"lg"}>
          <Text
            w={"full"}
            py={3}
            px={4}
            roundedTop={12}
            className="messiri"
            fontSize={["lg", "lg"]}
            fontWeight={"semibold"}
            bgColor={"blanchedalmond"}
          >
            Interactions
          </Text>
          {/* Interactions area */}
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
                  <HStack gap={2}>
                    <IconButton
                      bg={"#FFF"}
                      icon={<BsHeartFill />}
                      boxSize={8}
                      rounded={"full"}
                      color={"tomato"}
                    />
                    <IconButton
                      bg={"#FFF"}
                      icon={<BiSolidParty />}
                      boxSize={8}
                      rounded={"full"}
                      color={"blackAlpha.800"}
                    />
                    <IconButton
                      bg={"#FFF"}
                      icon={<BsEmojiLaughingFill />}
                      boxSize={8}
                      rounded={"full"}
                      color={"yellow.500"}
                    />
                    <IconButton
                      bg={"#FFF"}
                      icon={<BsEmojiHeartEyesFill />}
                      boxSize={8}
                      rounded={"full"}
                      color={"yellow.500"}
                    />
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
      </Stack>
      <BlankSpacer />
    </>
  );
};

export default page;
