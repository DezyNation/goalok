"use client";
import React from "react";
import {
  Box,
  Text,
  Stack,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  Container,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <Box
        pos={"fixed"}
        top={0}
        left={0}
        w={"full"}
        right={0}
        zIndex={9999}
        p={[4, 6]}
        bgGradient={
          "linear-gradient(to-b, rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0.1))"
        }
      >
        <HStack
          w={["full", "full", "80%"]}
          mx={"auto"}
          color={"#FFF"}
          gap={[4, 8, 16]}
        >
          <Text cursor={"pointer"} className="raleway nav-link">
            Counselling
          </Text>
          <Text cursor={"pointer"} className="raleway nav-link">
            Books
          </Text>
          <Link href={"/home/sessions"}>
            <Text cursor={"pointer"} className="raleway nav-link">
              Sessions
            </Text>
          </Link>
          <Spacer />
          <Link href={"/"}>
            <Text
              cursor={"pointer"}
              className="messiri nav-link"
              fontSize={["md", "lg"]}
            >
              ISKCON Inc.
            </Text>
          </Link>
          <Spacer />
          <Text cursor={"pointer"} className="raleway nav-link">
            Shop
          </Text>
          <Text cursor={"pointer"} className="raleway nav-link">
            Projects
          </Text>
          <Text cursor={"pointer"} className="raleway nav-link">
            Donations
          </Text>
        </HStack>
      </Box>
    </>
  );
};

export default Navbar;
