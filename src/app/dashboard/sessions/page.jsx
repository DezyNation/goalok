"use client";
import React from "react";
import SessionCard from "@/components/session/SessionCard";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
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
          <SessionCard
            onClick={() =>
              Router.push("/home/sessions/view/bhagvad-gita-session")
            }
          />
          <SessionCard
            onClick={() =>
              Router.push("/home/sessions/view/bhagvad-gita-session")
            }
          />
          <SessionCard
            onClick={() =>
              Router.push("/home/sessions/view/bhagvad-gita-session")
            }
          />
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
