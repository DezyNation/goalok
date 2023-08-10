"use client";
import Overlay from "@/components/global/Overlay";
import Chip from "@/components/profile/Chips";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { HiPencil } from "react-icons/hi";
import {
  GiByzantinTemple,
  GiReceiveMoney,
} from "react-icons/gi";
import Link from "next/link";
import { LuCalendarHeart } from "react-icons/lu";
import PostThumbnail from "@/components/profile/PostThumbnail";

const page = () => {
  const date = new Date();
  return (
    <>
      <Box
        pos={"relative"}
        width={"full"}
        height={"xs"}
        bgImage={`/banners/temple5.png`}
        bgSize={"cover"}
        bgPos={"center"}
        rounded={6}
        zIndex={0}
      >
        <Overlay>
          <HStack p={4} justifyContent={"flex-end"}>
            <Button
              colorScheme="blackAlpha"
              bgColor={"blackAlpha.500"}
              leftIcon={<HiPencil />}
              rounded={"full"}
            >
              Edit Profile
            </Button>
          </HStack>
        </Overlay>
        <Stack
          pos={"absolute"}
          top={"70%"}
          p={8}
          left={0}
          right={0}
          direction={["column", "row"]}
          alignItems={"flex-start"}
          justifyContent={"center"}
          gap={6}
          zIndex={9}
        >
          <Box
            p={[4, 6]}
            flex={1}
            bgColor={"white"}
            boxShadow={"md"}
            rounded={4}
          >
            <HStack alignItems={"flex-start"} justifyContent={"flex-start"}>
              <Avatar
                size={"lg"}
                boxShadow={"lg"}
                name="Sangam Kumar"
                src={"https://krishnastore.com/images/cache/545.jpg"}
                cursor={"pointer"}
              />
              <Box>
                <Text fontSize={["lg"]} fontWeight={"semibold"}>
                  Spiritual Name
                </Text>
                <Text fontSize={["xs"]}>a.k.a Sangam Kumar</Text>
                <HStack pt={2} flexWrap={"wrap"}>
                  <Chip text={"Student"} />
                </HStack>
              </Box>
            </HStack>
            <br />
            <hr />
            <br />
            <VStack w={"full"} gap={6} alignItems={"flex-start"}>
              <HStack alignItems={"center"} justifyContent={"flex-start"}>
                <GiByzantinTemple size={20} />
                <Text fontSize={"sm"}>
                  Linked to{" "}
                  <span style={{ fontWeight: "500", color: "#A076F9" }}>
                    <Link href={"#"}>ISKCON New York</Link>
                  </span>
                </Text>
              </HStack>
              <HStack alignItems={"center"} justifyContent={"flex-start"}>
                <LuCalendarHeart size={20} />
                <Text fontSize={"sm"}>2 Years in Krishna Consciousness</Text>
              </HStack>
              <HStack alignItems={"center"} justifyContent={"flex-start"}>
                <GiReceiveMoney size={20} />
                <Text fontSize={"sm"}>Donated ₹ 10K+</Text>
              </HStack>
            </VStack>
          </Box>
          <Box
            p={[4, 6]}
            flex={3}
            bgColor={"white"}
            boxShadow={"md"}
            rounded={4}
          >
            <Text pb={2} fontSize={"lg"} fontWeight={"semibold"}>
              About
            </Text>
            <hr />
            <Text pt={2} fontSize={"sm"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              architecto, ratione aspernatur, esse obcaecati cumque vero dicta
              corrupti provident qui et ex earum fugit accusantium tempora,
              quisquam beatae eum quia!
            </Text>
            <br /><br />
            <Text pb={2} fontSize={"lg"} fontWeight={"semibold"}>
              Recent Posts
            </Text>
            <hr />
            <HStack pt={4} gap={4}>
              <PostThumbnail />
              <PostThumbnail />
              <PostThumbnail />
              <Box
                boxShadow={"md"}
                boxSize={28}
                border={"1px solid #FAFAFA"}
                rounded={4}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                cursor={'pointer'}
              >
                <Text
                  fontWeight={"semibold"}
                  color={"twitter.500"}
                  textAlign={"center"}
                >
                  View All
                </Text>
              </Box>
            </HStack>
            <br />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default page;
