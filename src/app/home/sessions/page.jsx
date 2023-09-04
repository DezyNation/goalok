"use client";
import SessionCard from "@/components/session/SessionCard";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
  BsSearch,
} from "react-icons/bs";
import { useRouter } from "next/navigation";

const page = () => {
  const Router = useRouter();

  return (
    <>
      <Stack
        p={[4, 8, 16]}
        w={"full"}
        minH={"50vh"}
        direction={["row"]}
        alignItems={"center"}
        bgImage={"/sessionsbg.avif"}
      >
        <Box>
          <Text
            fontSize={["2xl", "4xl", "6xl"]}
            className="messiri"
            lineHeight={["2rem", "4rem"]}
          >
            Browse Sessions
          </Text>
          <Text>
            Ask Queries &nbsp; | &nbsp; Get Guidance &nbsp; | &nbsp; Uplift
            Spiritually
          </Text>
        </Box>
      </Stack>
      <Stack
        direction={["column", "row"]}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        gap={8}
      >
        {/* Session filters */}
        <Box flex={1} position={"relative"}>
          <Box
            position={"sticky"}
            top={0}
            p={8}
            boxShadow={"lg"}
            roundedRight={16}
          >
            <Text className="messiri" fontWeight={"semibold"}>
              Filters
            </Text>
            <br />
            <Text pb={2}>Session Language</Text>
            <hr />
            <Box py={4}>
              <CheckboxGroup>
                <VStack
                  w={"full"}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                  gap={4}
                >
                  <Checkbox colorScheme="twitter">English</Checkbox>
                  <Checkbox colorScheme="twitter">Hindi</Checkbox>
                </VStack>
              </CheckboxGroup>
            </Box>
            <br />
            <Text pb={2}>Status</Text>
            <hr />
            <Box py={4}>
              <CheckboxGroup>
                <VStack
                  w={"full"}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                  gap={4}
                >
                  <Checkbox colorScheme="twitter">Streamed</Checkbox>
                  <Checkbox colorScheme="twitter">Upcoming</Checkbox>
                  <Checkbox colorScheme="twitter">Live</Checkbox>
                </VStack>
              </CheckboxGroup>
            </Box>
            <br />
            <Text pb={2}>Category</Text>
            <hr />
            <Box py={4}>
              <CheckboxGroup>
                <VStack
                  w={"full"}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                  gap={4}
                >
                  <Checkbox colorScheme="twitter">Srimad Bhagvad Gita</Checkbox>
                  <Checkbox colorScheme="twitter">Srimad Bhagvatam</Checkbox>
                  <Checkbox colorScheme="twitter">Vedic Cosmology</Checkbox>
                </VStack>
              </CheckboxGroup>
            </Box>
          </Box>
        </Box>
        {/* Session filters end */}

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
          <Stack
            direction={["column", "row"]}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            gap={8}
            h={"full"}
          >
            <SessionCard onClick={()=>Router.push("/dashboard/sessions/join/bhagvad-gita-session")} />
            <SessionCard onClick={()=>Router.push("/dashboard/sessions/join/bhagvad-gita-session")} />
            <SessionCard onClick={()=>Router.push("/dashboard/sessions/join/bhagvad-gita-session")} />
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
      </Stack>
    </>
  );
};

export default page;
