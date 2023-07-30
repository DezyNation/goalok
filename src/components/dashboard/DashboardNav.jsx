"use clinet";
import {
  Avatar,
  Box,
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
  const params = useSearchParams()
  const activeTopItem = params.get("active_top_item")

  return (
    <>
      <HStack py={2} px={4} bgColor={"#FFF"}>
        <HStack w={["full", "xs"]}>
          <Image src="/logo.png" w={12} h={12} objectFit={"contain"} />
          <Box>
            <Text className="messiri">ISKCON Inc.</Text>
            <Text fontSize={"8"} color={"darkslategray"}>
              Spiritual platform
            </Text>
          </Box>
        </HStack>
        <Spacer />
        <HStack columnGap={6} justifyContent={"center"}>
          {navItems.map((item, key) => (
            <Link href={item.link}>
              <Text
                cursor={"pointer"}
                fontSize={"sm"}
                textTransform={"capitalize"}
                transition={'all .3s ease'}
                key={key} _hover={{color: (activeTopItem == item.id ? '#333' : 'yellow.500')}}
                px={3} py={1} rounded={'full'}
                bgColor={activeTopItem == item.id ? 'yellow.400' : 'transparent'}
                boxShadow={activeTopItem == item.id ? 'md' : 'none'}
              >
                {item.id}
              </Text>
            </Link>
          ))}
        </HStack>
        <Spacer />
        <HStack>
          <InputGroup w={["full", "xs"]}>
            <Input
              fontSize={"sm"}
              px={2}
              variant={"flushed"}
              placeholder="Search for people, temples, books etc."
            />
            <InputRightElement children={<Icon as={BsSearch} />} />
          </InputGroup>
        </HStack>
      </HStack>
    </>
  );
};

export default DashboardNav;
