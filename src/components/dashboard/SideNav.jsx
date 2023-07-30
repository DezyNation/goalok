"use client";
import React, { useEffect } from "react";
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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const SideNav = () => {
  const params = useSearchParams();
  const activeSideItem = params.get("active_side_item");

  const items = [
    {
      id: "feed",
      icon: <BsGrid1X2Fill />,
      link: "/dashboard?active_side_item=feed",
    },
    {
      id: "files",
      icon: <BsFolderFill />,
      link: "/dashboard/files?active_side_item=files",
    },
    {
      id: "news",
      icon: <BsMegaphoneFill />,
      link: "/dashboard?active_side_item=news",
    },
    {
      id: "donate",
      icon: <BsHeartFill />,
      link: "/dashboard?active_side_item=donate",
    },
    {
      id: "interact",
      icon: <BsChatDotsFill />,
      link: "/dashboard/interact?active_side_item=interact",
    },
  ];

  return (
    <>
      <VStack py={4} bgColor={"#FFF"} h={"92vh"}>
        {items.map((item, key) => (
          <Link style={{ width: "100%" }} href={item.link}>
            <Box
              boxSize={16}
              display={"flex"}
              flexDir={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={1}
              key={key}
              transition={"all .3s ease"}
              cursor={"pointer"}
              _hover={{ bg: "yellow.400" }}
              bg={activeSideItem == item.id ? "yellow.400" : "#FFF"}
            >
              {item.icon}
              <Text fontSize={"10"} textTransform={"capitalize"}>
                {item.id}
              </Text>
            </Box>
          </Link>
        ))}
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
          _hover={{ bg: "yellow.400" }}
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
