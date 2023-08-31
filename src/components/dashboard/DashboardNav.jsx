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
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { BsSearch } from "react-icons/bs";

const DashboardNav = () => {
  const navItems = [
    {
      id: "home",
      link: "/dashboard?active_top_item=home",
    },
    {
      id: "sessions",
      link: "/dashboard/sessions?active_top_item=sessions",
    },
    {
      id: "tests",
      link: "/dashboard?active_top_item=tests",
    },
    {
      id: "knowledgebase",
      link: "/dashboard?active_top_item=knowledgebase",
    },
  ];
  const params = useSearchParams();
  const activeTopItem = params.get("active_top_item");

  return (
    <>
      <HStack py={2} px={4} bgColor={"#FFF"} justifyContent={"space-between"}>
        <HStack w={["auto", "xs"]}>
          <Image src="/logo.png" w={12} h={12} objectFit={"contain"} />
          <Box>
            <Text className="messiri">ISKCON Inc.</Text>
            <Text fontSize={"8"} color={"darkslategray"}>
              Spiritual platform
            </Text>
          </Box>
        </HStack>
        <Button
          rightIcon={<BsSearch />}
          size={"sm"}
          bgColor={"transparent"}
          borderBottom={"1px"}
          borderColor={"gray.200"}
          rounded={0} color={'gray.600'}
          fontWeight={'medium'} px={0}
        >
          Search Knowledgebase
        </Button>
      </HStack>
    </>
  );
};

export default DashboardNav;
