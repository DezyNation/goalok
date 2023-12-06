"use client";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import Navbar from "../../components/global/Navbar";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import help from "../../../public/lottie/help.json";
import group from "../../../public/lottie/group.json";
import Lottie from "lottie-react";

const page = () => {
  return (
    <>
      <Navbar />
      <Box p={[8, 16]}>
        <Stack
          w={"full"}
          direction={["column", "row"]}
          alignItems={"center"}
          justifyContent={"center"}
          mt={[16]}
        >
          <Box w={["full", "full"]}>
            <Text className="messiri" fontSize={["3xl", "5xl"]}>
              You are not alone...
            </Text>
            <br />
            <Text maxW={["full", "lg"]}>
              Life can be difficult sometimes and finding the right direction
              might seem impossible. That's why we are here to listen to you and
              guide you. You are not alone and you don't have to keep all this
              inside yourself either.
            </Text>
            <br />
            <Text maxW={["full", "lg"]}>
              We are online 24x7 to associate with you in your difficult times.
              Reach out to us through any of the mentioned channels.
            </Text>
            <br />
            <Box maxW={["full", "lg"]}>
              {/* <Box py={2}>
                <HStack
                  gap={4}
                  as={"a"}
                  href="mailto:counselling@krishnaconsciousnesssociety.com"
                  target="_blank"
                >
                  <MdEmail />
                  <Text>support@krishnaconsciousnesssociety.com</Text>
                </HStack>
              </Box> */}
              {/* <Box py={2}>
                <HStack gap={4} as={"a"} href="tel:+91-1234567890">
                  <IoCall />
                  <Text>+91-1234567890</Text>
                </HStack>
              </Box> */}
              {/* <Box py={2}>
                <HStack gap={4} as={"a"} href="https://wa.me/+917838074742" target="_blank">
                  <BsWhatsapp />
                  <Text>Click to Chat</Text>
                </HStack>
              </Box> */}
              <Box py={2}>
                Or you can click on the Live Chat icon in the bottom right
                corner to start an anonymous chat.
              </Box>
            </Box>
          </Box>
          <Box w={["full", "full"]}>
            <HStack w={"full"} justifyContent={"flex-start"}>
              <Box w={"full"} h={"sm"}>
                <Lottie
                  animationData={group}
                  loop
                  autoPlay
                  width={"full"}
                  height={"full"}
                />
              </Box>
            </HStack>
          </Box>
        </Stack>

        <TawkMessengerReact
          propertyId="6564dcb01db16644c55521b1"
          widgetId="1hg8vs518"
        />
      </Box>
    </>
  );
};

export default page;
