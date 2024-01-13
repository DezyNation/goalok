"use client";
import React from "react";
import {
  Box,
  Text,
  Stack,
  HStack,
  Spacer,
  Button,
  Show,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  DrawerBody,
} from "@chakra-ui/react";
import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Navbar = ({ theme }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <>
      <Box
        pos={"fixed"}
        top={0}
        left={0}
        w={"full"}
        right={0}
        zIndex={99}
        p={[4, 6]}
        bgGradient={
          theme == "gradient"
            ? "linear-gradient(to-b, rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0.1))"
            : "linear-gradient(to-b, rgba(0,0,0,0.8), rgba(0,0,0,0.8))"
        }
        backdropFilter={"blur(8px)"}
      >
        <Show above="md">
          <HStack
            w={["full", "full", "80%"]}
            mx={"auto"}
            color={"#FFF"}
            gap={[4, 8, 16]}
            justifyContent={'space-between'}
          >
            <Text cursor={"pointer"} className="raleway nav-link" as={'a'} href="/counselling">
              Counselling
            </Text>
            <Text cursor={"pointer"} className="raleway nav-link">
              Projects
            </Text>
            <Spacer />
            <Link href={"/"}>
              <Text
                cursor={"pointer"}
                className="messiri nav-link"
                fontSize={["md", "lg"]}
                textAlign={'center'}
              >
                Krishna Consciousness Society
              </Text>
            </Link>
            <Spacer />
            <Text cursor={"pointer"} className="raleway nav-link">
              Shop
            </Text>
            <Link href={"/auth/login"}>
              <Button
                colorScheme="yellow"
                roundedTopLeft={"full"}
                roundedBottomRight={"full"}
                size={"sm"}
                px={6}
              >
                Login Now
              </Button>
            </Link>
          </HStack>
        </Show>

        <Show below="md">
          <HStack w={"full"} justifyContent={"space-between"} color={"#FFF"}>
            <Link href={"/"}>
              <Text
                cursor={"pointer"}
                className="messiri nav-link"
                fontSize={["md", "lg"]}
              >
                Krishna Consciousness Society
              </Text>
            </Link>
            <IconButton
              color={"#FFF"}
              icon={<HiOutlineMenuAlt3 size={24} />}
              variant={"ghost"}
              _hover={{ bgColor: "transparent" }}
              onClick={onToggle}
            />
          </HStack>
        </Show>
      </Box>

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        size={"xs"}
      >
        <DrawerOverlay />
        <DrawerContent bgColor={'#03001C'} color={'#FFF'}>
          <DrawerHeader></DrawerHeader>
          <DrawerBody py={16} display={'flex'} flexDir={'column'} gap={4}>
            <Text cursor={"pointer"} className="raleway nav-link">
              Counselling
            </Text>
            <Text cursor={"pointer"} className="raleway nav-link">
              Projects
            </Text>
            <Link href={"/home/sessions"}>
              <Text cursor={"pointer"} className="raleway nav-link">
                Sessions
              </Text>
            </Link>
            <Text cursor={"pointer"} className="raleway nav-link">
              Shop
            </Text>
            <Text cursor={"pointer"} className="raleway nav-link">
              Donations
            </Text>
            <Box w={'full'} h={'full'}></Box>
            <Link href={"/auth/login"} style={{alignSelf: 'center', width: '100%'}}>
              <Button
                colorScheme="yellow"
                roundedTopLeft={"full"}
                roundedBottomRight={"full"}
                px={6} w={'full'}
              >
                Login Now
              </Button>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
