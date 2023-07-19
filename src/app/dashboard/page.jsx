"use client";
import React from "react";
import OnlineMembers from "@/components/dashboard/OnlineMembers";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FaLocationDot, FaUserTag } from "react-icons/fa6";
import { BsArrowRight, BsImages, BsPencilSquare } from "react-icons/bs";
import CreatePost from "@/components/dashboard/feed/CreatePost";
import SessionCard from "@/components/dashboard/RightPanel/SessionCard";
import Link from "next/link";
import BlankSpacer from "@/components/global/BlankSpacer";
import NewsCard from "@/components/dashboard/RightPanel/NewsCard";

const page = () => {
  return (
    <>
      <HStack w={"full"} gap={4} alignItems={"flex-start"}>
        <Box>
          <Text pb={4}>Online Members</Text>
          <OnlineMembers />
        </Box>
        <Box flex={2}>
          <CreatePost />
        </Box>
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
          <BlankSpacer />
          <Text pb={4}>Recent Announcements</Text>
          <VStack height={"xs"} overflow={"scroll"} w={"full"}>
            <NewsCard
              title={"Learn more and more"}
              description={"something great is about to happen"}
            />
            <NewsCard
              title={"Another announcement"}
              description={"something great is about to happen"}
            />
          </VStack>
        </Box>
      </HStack>
    </>
  );
};

export default page;
