"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  BsCameraVideoFill,
  BsChatDotsFill,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsGearFill,
  BsGrid1X2Fill,
  BsHeartFill,
} from "react-icons/bs";
import { PiFlowerLotusFill } from "react-icons/pi";
import {
  Avatar,
  Box,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Show,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { UserContext } from "@/utils/hooks/useAuth";

const SideNav = () => {
  const params = useSearchParams();
  const activeSideItem = params.get("active_side_item");
  const [activerUser, setActiverUser] = useState(null);
  const [status, setStatus] = useState(true);
  const pathName = usePathname()

  const { user, logout } = useContext(UserContext);

  const items = [
    {
      id: "feed",
      icon: <BsGrid1X2Fill />,
      link: "/dashboard?active_side_item=feed",
    },
    {
      id: "philosophy",
      icon: <PiFlowerLotusFill />,
      link: "/dashboard/files?active_side_item=files",
    },
    {
      id: "sessions",
      icon: <BsCameraVideoFill />,
      link: "/dashboard/sessions?active_side_item=sessions",
    },
    {
      id: "donate",
      icon: <BsHeartFill />,
      link: "/dashboard?active_side_item=donate",
    },
    {
      id: "interact",
      icon: <BsChatDotsFill />,
      link: "/dashboard/chat?active_side_item=interact",
    },
  ];

  useEffect(() => {
    if (user) {
      setActiverUser(user);
    }
  }, [user]);
  useEffect(()=>{
    if(pathName?.includes("chat")) {
      setStatus(false)
    }
  },[pathName])

  return (
    <>
      <VStack
        pos={"relative"}
        py={4}
        bgColor={"#FFF"}
        h={"92vh"}
        transition={"all 0.2s ease"}
        marginLeft={status ? "0" : "-16"}
        marginRight={status ? "0" : "0"}
      >
        {items.map((item, key) => (
          <Link style={{ width: "100%" }} href={item.link} key={key}>
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
              name={activerUser?.name}
              src={activerUser?.avatar}
              cursor={"pointer"}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader textTransform={"capitalize"}>
              {activerUser?.name || activerUser?.username}
            </PopoverHeader>
            <PopoverBody>
              <Link href={"/dashboard/profile"}>
                <Text cursor={"pointer"} py={2} _hover={{ bgColor: "gray.50" }}>
                  View Profile
                </Text>
              </Link>
              <Text
                cursor={"pointer"}
                py={2}
                color={"red.500"}
                _hover={{ bgColor: "gray.50" }}
                onClick={() => logout()}
              >
                Logout
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        {/* Toggle Sidebar */}
        <IconButton
          pos={"absolute"}
          bottom={36}
          right={status ? "-4" : "-8"}
          size={"sm"}
          rounded={0}
          icon={
            status ? (
              <BsChevronDoubleLeft size={20} />
            ) : (
              <BsChevronDoubleRight size={20} />
            )
          }
          onClick={() => setStatus(!status)}
        />
      </VStack>
    </>
  );
};

export default SideNav;
