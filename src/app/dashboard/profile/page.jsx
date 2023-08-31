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
import { HiMail, HiPencil } from "react-icons/hi";
import { GiByzantinTemple, GiReceiveMoney } from "react-icons/gi";
import Link from "next/link";
import { LuCalendarHeart } from "react-icons/lu";
import PostThumbnail from "@/components/profile/PostThumbnail";
import { FaLocationDot } from "react-icons/fa6";
import { BsClockHistory, BsTelephoneFill } from "react-icons/bs";
import BlankSpacer from "@/components/global/BlankSpacer";

const page = () => {
  const date = new Date();
  return (
    <>
      <Box w={'full'} h={'92vh'} overflow={'scroll'} className={"hide-scrollbar"}>
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
                size={'sm'}
              >
                Edit Profile
              </Button>
            </HStack>
          </Overlay>
          <Stack
            pos={"absolute"}
            top={"70%"}
            p={[0, 8]}
            left={0}
            right={0}
            direction={["column", "row"]}
            alignItems={"flex-start"}
            justifyContent={"center"}
            gap={6}
            zIndex={9}
          >
            <Box
            w={['full', 'auto']}
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
                    Sangam Kumar
                  </Text>
                  <Text fontSize={["xs"]}>a.k.a Spiritual Name</Text>
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
                  <FaLocationDot size={20} />
                  <Text fontSize={"sm"}>From New Delhi</Text>
                </HStack>

                <HStack alignItems={"center"} justifyContent={"flex-start"}>
                  <BsClockHistory size={20} />
                  <Text fontSize={"sm"}>Member since April 21, 2020</Text>
                </HStack>

                <HStack alignItems={"center"} justifyContent={"flex-start"}>
                  <LuCalendarHeart size={20} />
                  <Text fontSize={"sm"}>2 Years in Krishna Consciousness</Text>
                </HStack>

                {/* Show only if viewer is admin */}
                <HStack alignItems={"center"} justifyContent={"flex-start"}>
                  <GiReceiveMoney size={20} />
                  <Text fontSize={"sm"}>Donated ₹ 10K+</Text>
                </HStack>

                <HStack alignItems={"center"} justifyContent={"flex-start"}>
                  <HiMail size={20} />
                  <Text fontSize={"sm"}>sangam@mail.com</Text>
                </HStack>

                <HStack alignItems={"center"} justifyContent={"flex-start"}>
                  <BsTelephoneFill size={20} />
                  <Text fontSize={"sm"}>+91 1234567890</Text>
                </HStack>
              </VStack>
            </Box>
            <Box
            w={['full', 'auto']}
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
              <br />
              <br />
              <Text pb={2} fontSize={"lg"} fontWeight={"semibold"}>
                Enrolled Courses
              </Text>
              <hr />
              <HStack pt={4} gap={4} flexWrap={'wrap'}>
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
                  cursor={"pointer"}
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
        <BlankSpacer height={16} />
      </Box>
    </>
  );
};

export default page;
