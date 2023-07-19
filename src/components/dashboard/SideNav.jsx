"use client";
import React from "react";
import {
  BsChatDotsFill,
  BsFolderFill,
  BsGearFill,
  BsGrid1X2Fill,
  BsHeartFill,
  BsMegaphoneFill,
} from "react-icons/bs";
import {
  Avatar,
  Box,
  Icon,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import TempleIcon from "../../../public/icons/temple.svg";

const SideNav = () => {
  return (
    <>
      <VStack py={4} px={2} bgColor={"#FFF"} h={"92vh"}>
        <Box
          boxSize={16}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          transition={"all .3s ease"}
          cursor={"pointer"}
          _hover={{ color: "yellow.400" }}
        >
          <BsGrid1X2Fill />
          <Text fontSize={"10"}>Feed</Text>
        </Box>

        <Box
          boxSize={16}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          transition={"all .3s ease"}
          cursor={"pointer"}
          _hover={{ color: "yellow.400" }}
        >
          <BsFolderFill />
          <Text fontSize={"10"}>Archives</Text>
        </Box>

        <Box
          boxSize={16}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          transition={"all .3s ease"}
          cursor={"pointer"}
          _hover={{ color: "yellow.400" }}
        >
          <BsMegaphoneFill />
          <Text fontSize={"10"}>News</Text>
        </Box>

        <Box
          boxSize={16}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          transition={"all .3s ease"}
          cursor={"pointer"}
          _hover={{ color: "yellow.400" }}
        >
          <BsHeartFill />
          <Text fontSize={"10"}>Donate</Text>
        </Box>

        <Box
          boxSize={16}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          transition={"all .3s ease"}
          cursor={"pointer"}
          _hover={{ color: "yellow.400" }}
        >
          <BsChatDotsFill />
          <Text fontSize={"10"}>Interact</Text>
        </Box>
        <Spacer />

        <Box
          boxSize={16}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          transition={"all .3s ease"}
          cursor={"pointer"}
          _hover={{ color: "yellow.400" }}
        >
          <BsGearFill />
          <Text fontSize={"10"}>Settings</Text>
        </Box>
        <Popover placement="right">
          <PopoverTrigger>
            <Avatar
              boxSize={8}
              boxShadow={"lg"}
              name="Sangam Kumar"
              src={"https://krishnastore.com/images/cache/545.jpg"}
              cursor={"pointer"}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Sangam Kumar</PopoverHeader>
            <PopoverBody>
              <Text cursor={"pointer"} py={2}>
                View Profile
              </Text>
              <Text cursor={"pointer"} py={2} color={"red.500"}>
                Logout
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </VStack>
    </>
  );
};

export default SideNav;
