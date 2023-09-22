"use client";
import React, { useEffect, useState } from "react";
import SessionCard from "@/components/session/SessionCard";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
  BsSearch,
} from "react-icons/bs";
import { useRouter } from "next/navigation";
import useApiHandler from "@/utils/hooks/useApiHandler";
import { DefaultAxios } from "@/utils/axios";
import BlankSpacer from "@/components/global/BlankSpacer";
import NoSessionsCard from "@/components/session/NoSessionsCard";

const page = ({ height }) => {
  const Router = useRouter();
  const { handleError } = useApiHandler();

  const [ongoingSessions, setOngoingSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  useEffect(() => {
    fetchOngoingSessions();
    fetchUpcomingSessions();
  }, []);

  function fetchOngoingSessions() {
    DefaultAxios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sessions/ongoing-sessions`
    )
      .then((res) => {
        setOngoingSessions(res.data);
      })
      .catch((err) => {
        handleError(err, "Err while fetching ongoing sessions");
      });
  }

  function fetchUpcomingSessions() {
    DefaultAxios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sessions/upcoming-sessions`
    )
      .then((res) => {
        setUpcomingSessions(res.data);
      })
      .catch((err) => {
        handleError(err, "Err while fetching ongoing sessions");
      });
  }

  return (
    <>
      <BlankSpacer />
      <Box
        flex={4}
        p={8}
        gap={12}
        display={"flex"}
        flexDir={"column"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
      >
        <HStack w={"full"} alignItems={"center"} justifyContent={"flex-end"}>
          <FormControl w={["full", "md"]}>
            <HStack>
              <Input
                py={2}
                px={4}
                border={"1px"}
                flex={4}
                bgColor={"#FFF"}
                borderColor={"blackAlpha.200"}
                rounded={"full"}
                placeholder="Type to search sessions..."
              />
              <Button
                leftIcon={<BsSearch size={12} />}
                color="#FFF"
                flex={1}
                rounded={"full"}
                fontSize={"sm"}
                colorScheme="facebook"
                bgColor={"#333"}
              >
                Search
              </Button>
            </HStack>
          </FormControl>
        </HStack>

        <Text fontSize={"lg"} fontWeight={"semibold"}>
          Ongoing Sessions
        </Text>
        <Stack
          direction={["column", "row"]}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          flexWrap={"wrap"}
          gap={8}
          h={"full"}
        >
          {!ongoingSessions?.length ? <NoSessionsCard /> : null}
          {ongoingSessions?.map((session, key) => (
            <SessionCard
              key={key}
              onClick={() =>
                Router.push(`/dashboard/sessions/join/${session.slug}`)
              }
              title={session?.title}
              description={session?.description}
              status={
                session?.startAt
                  ? new Date(session?.startAt).toLocaleDateString()
                  : "UPCOMING"
              }
              language={session?.language}
              preacher={session?.preacher?.name || session?.preacher?.username}
            />
          ))}
        </Stack>
        <BlankSpacer />
        <Text fontSize={"lg"} fontWeight={"semibold"}>
          Upcoming Sessions
        </Text>
        <Stack
          direction={["column", "row"]}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          flexWrap={"wrap"}
          gap={8}
          h={"full"}
        >
          {!upcomingSessions?.length ? <NoSessionsCard /> : null}
          {upcomingSessions?.map((session, key) => (
            <SessionCard
              key={key}
              onClick={() =>
                Router.push(`/dashboard/sessions/join/${session.slug}`)
              }
              title={session?.title}
              description={session?.description}
              status={
                session?.startAt
                  ? new Date(session?.startAt).toLocaleDateString()
                  : "UPCOMING"
              }
              language={session?.language}
              preacher={session?.preacher?.name || session?.preacher?.username}
            />
          ))}
        </Stack>

        <HStack
          mt={16}
          w={"full"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <HStack w={["full", "sm"]}>
            <Button
              size={"sm"}
              p={4}
              rounded={"full"}
              boxShadow={"md"}
              bg={"#FFF"}
              _hover={{ bgColor: "#333", color: "#FFF" }}
            >
              <BsChevronDoubleLeft />
            </Button>
            <Button
              size={"sm"}
              p={4}
              rounded={"full"}
              boxShadow={"md"}
              bg={"#FFF"}
              _hover={{ bgColor: "#333", color: "#FFF" }}
            >
              <BsChevronLeft />
            </Button>
            <Button
              size={"sm"}
              p={4}
              rounded={"full"}
              boxShadow={"md"}
              bg={"#333"}
              color={"#FFF"}
              _hover={{ bgColor: "#333", color: "#FFF" }}
            >
              1
            </Button>
            <Button
              size={"sm"}
              p={4}
              rounded={"full"}
              boxShadow={"md"}
              bg={"#FFF"}
              _hover={{ bgColor: "#333", color: "#FFF" }}
            >
              2
            </Button>
            <Button
              size={"sm"}
              p={4}
              rounded={"full"}
              boxShadow={"md"}
              bg={"#FFF"}
              _hover={{ bgColor: "#333", color: "#FFF" }}
            >
              3
            </Button>
            <Button
              size={"sm"}
              p={4}
              rounded={"full"}
              boxShadow={"md"}
              bg={"#FFF"}
              _hover={{ bgColor: "#333", color: "#FFF" }}
            >
              <BsChevronDoubleRight />
            </Button>
            <Button
              size={"sm"}
              p={4}
              rounded={"full"}
              boxShadow={"md"}
              bg={"#FFF"}
              _hover={{ bgColor: "#333", color: "#FFF" }}
            >
              <BsChevronRight />
            </Button>
          </HStack>
        </HStack>
      </Box>
    </>
  );
};

export default page;
