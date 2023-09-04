"use client";
import React, { useState } from "react";
import OnlineMembers from "@/components/dashboard/LeftPanel/OnlineMembers";
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Show,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FaLocationDot, FaUserTag } from "react-icons/fa6";
import {
  BsArrowRight,
  BsChevronDown,
  BsChevronUp,
  BsImages,
  BsPencilSquare,
} from "react-icons/bs";
import CreatePost from "@/components/dashboard/feed/CreatePost";
import SessionCard from "@/components/dashboard/RightPanel/SessionCard";
import Link from "next/link";
import BlankSpacer from "@/components/global/BlankSpacer";
import NewsCard from "@/components/dashboard/RightPanel/NewsCard";
import Post from "@/components/dashboard/feed/Post";
import Advertisement from "@/components/dashboard/LeftPanel/Advertisement";
import { IoVideocam } from "react-icons/io5";
import CreateSession from "@/components/dashboard/feed/CreateSession";

const page = () => {
  const [intent, setIntent] = useState("post");

  return (
    <>
      <HStack w={"full"} gap={4} alignItems={"flex-start"}>
        <Show above={"md"}>
          <Box flex={1}>
            <Text pb={4}>Online Members</Text>
            <OnlineMembers />
            <BlankSpacer height={20} />
            <Advertisement />
          </Box>
        </Show>
        <Box
          flex={2}
          paddingBottom={8}
          h={"92vh"}
          overflow={"scroll"}
          className="feed-container"
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={8}
        >
          <Box w={"full"}>
            <HStack justifyContent={"space-evenly"} pb={4}>
              <Button
                size={["sm", "md"]}
                leftIcon={<BsPencilSquare />}
                colorScheme={intent == "post" ? "blackAlpha" : "twitter"}
                bgColor={intent == "post" ? "#333" : "transparent"}
                color={intent == "post" ? "#FFF" : "#333"}
                rounded={"full"}
                _hover={{ bgColor: "#333", color: '#FFF' }}
                variant={intent == "post" ? "solid" : "outline"}
                onClick={() => setIntent("post")}
              >
                New Post
              </Button>
              <Button
                size={["sm", "md"]}
                leftIcon={<IoVideocam />}
                colorScheme={intent == "session" ? "blackAlpha" : "twitter"}
                bgColor={intent == "session" ? "#333" : "transparent"}
                color={intent == "session" ? "#FFF" : "#333"}
                rounded={"full"}
                _hover={{ bgColor: "#333", color: '#FFF' }}
                variant={intent == "session" ? "solid" : "outline"}
                onClick={() => setIntent("session")}
              >
                New Session
              </Button>
            </HStack>
            {intent == "post" ? <CreatePost /> : <CreateSession />}
          </Box>
          <Post />
          <Post />
        </Box>
        <Show above="md">
          <Box
            flex={1}
            display={"flex"}
            flexDir={"column"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            <Text pb={4}>Upcoming Sessions</Text>
            <HStack gap={4}>
              <SessionCard />
              <SessionCard />
            </HStack>
            <HStack justifyContent={"flex-end"} w={"full"} p={4}>
              <Link href={"/home/sessions"} target="_blank">
                <HStack>
                  <Text
                    fontSize={"sm"}
                    fontWeight={"semibold"}
                    color={"twitter.500"}
                  >
                    View All Sessions
                  </Text>
                </HStack>
              </Link>
            </HStack>
            <BlankSpacer height={20} />
            <Text pb={4}>Recent Announcements</Text>
            <HStack w={"full"} justifyContent={"center"}>
              <IconButton
                icon={<BsChevronUp />}
                colorScheme="teal"
                size={"xs"}
                bgColor={"#333"}
                roundedTop={"full"}
                roundedBottom={"none"}
              />
            </HStack>
            <VStack height={"44"} overflow={"scroll"} w={"full"} pt={2}>
              <NewsCard
                title={"Learn more and more"}
                description={"something great is about to happen"}
              />
              <NewsCard
                title={"Another announcement"}
                description={"something great is about to happen"}
              />
            </VStack>
            <HStack w={"full"} justifyContent={"center"}>
              <IconButton
                icon={<BsChevronDown />}
                colorScheme="teal"
                size={"xs"}
                bgColor={"#333"}
                roundedTop={"none"}
                roundedBottom={"full"}
              />
            </HStack>
          </Box>
        </Show>
      </HStack>
    </>
  );
};

export default page;
