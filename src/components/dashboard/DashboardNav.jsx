"use clinet";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Show,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { BsSearch } from "react-icons/bs";

const DashboardNav = () => {
  return (
    <>
      <HStack py={2} px={4} bgColor={"#FFF"} justifyContent={"space-between"}>
        <HStack w={["auto", "xs"]}>
          <Image src="/logo.png" h={12} objectFit={"contain"} />
          <Show above="md">
            <Box>
              <Text className="messiri">Krishna Consciousness Society</Text>
              <Text fontSize={"8"} color={"darkslategray"}>
                affiliated to ISKCON Inc.
              </Text>
            </Box>
          </Show>
        </HStack>
        <Button
          rightIcon={<BsSearch />}
          size={"sm"}
          bgColor={"transparent"}
          borderBottom={"1px"}
          borderColor={"gray.200"}
          rounded={0}
          color={"gray.600"}
          fontWeight={"medium"}
          px={0}
        >
          Search Knowledgebase
        </Button>
      </HStack>
    </>
  );
};

export default DashboardNav;
