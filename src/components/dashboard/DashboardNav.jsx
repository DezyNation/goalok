"use clinet";
import { Avatar, Box, HStack, Icon, Image, Input, InputGroup, InputRightElement, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";

const DashboardNav = () => {
  return (
    <>
      <HStack py={2} px={4} bgColor={"#FFF"}>
        <HStack>
          <Image src="/logo.png" w={12} h={12} objectFit={"contain"} />
          <Box>
            <Text className="messiri">ISKCON Inc.</Text>
            <Text fontSize={"8"} color={"darkslategray"}>
              Spiritual platform
            </Text>
          </Box>
        </HStack>
        <Spacer />
        <HStack gap={6}>
          <Text className="nav-link" cursor={"pointer"} fontSize={"sm"}>
            Home
          </Text>
          <Text className="nav-link" cursor={"pointer"} fontSize={"sm"}>
            Sessions
          </Text>
          <Text className="nav-link" cursor={"pointer"} fontSize={"sm"}>
            Events
          </Text>
          <Text className="nav-link" cursor={"pointer"} fontSize={"sm"}>
            Nearby
          </Text>
          <Text className="nav-link" cursor={"pointer"} fontSize={"sm"}>
            Read & Learn
          </Text>
        </HStack>
        <Spacer />
        <HStack>
          <InputGroup w={['full', 'sm']}>
            <Input fontSize={'sm'} px={2} variant={'flushed'} placeholder="Search for people, temples, books etc." />
            <InputRightElement children={<Icon as={BsSearch} />} />
          </InputGroup>
        </HStack>
      </HStack>
    </>
  );
};

export default DashboardNav;
