"use client";
import Navbar from "@/components/global/Navbar";
import { Stack, Box, Text, Button, Image, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { BsArrowRight, BsStarFill } from "react-icons/bs";

export default function HomePage() {
  return (
    <>
      <Navbar theme={"gradient"} />
      <Stack
        w={"full"}
        h={"100vh"}
        bgImage={"/hero.png"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        bgPos={"center"}
      >
        <Box
          pos={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage={"linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))"}
        >
          <Box
            w={["90%", "82.5%"]}
            p={[4, 8, 16]}
            pos={"absolute"}
            top={0}
            left={0}
            right={0}
            mx={"auto"}
          >
            <Box w={["full", "max-content"]}>
              <Text
                mt={[24, 24, 48]}
                marginBottom={"-4"}
                fontSize={["lg", "2xl"]}
                color={"#FFF"}
              >
                Your Quest For
              </Text>
              <Text
                fontSize={["6xl", "8xl", "9xl"]}
                className="messiri"
                pb={0}
                color={"#FFF"}
                mt={[4, 0]}
              >
                Answers
              </Text>
              <HStack
                w={"full"}
                justifyContent={"flex-end"}
                marginTop={["-4", "-12"]}
              >
                <Box h={"0.25"} bgColor={"#FFF"} w={["35%", "70%"]}></Box>
                <Text flex={1} fontSize={["lg", "2xl"]} color={"#FFF"}>
                  Ends Here
                </Text>
              </HStack>
              <HStack gap={6}>
                <Link href={"/auth/login?intent=register"}>
                  <Button
                    className="messiri"
                    color={"#FFF"}
                    rounded={"full"}
                    variant={"outline"}
                    colorScheme="whiteAlpha"
                    mt={8}
                    rightIcon={<BsArrowRight />}
                  >
                    Register Now
                  </Button>
                </Link>
                <Link href={'/auth/login?intent=login'}>
                  <Button
                    className="messiri"
                    rounded={"full"}
                    colorScheme="yellow"
                    mt={8}
                  >
                    Login Now
                  </Button>
                </Link>
              </HStack>
            </Box>
          </Box>

          <Box
            pos={"absolute"}
            w={["full", "xs"]}
            bottom={0}
            right={0}
            p={[4, 8]}
          >
            <Text className="messiri" color={"#FFF"} fontSize={["xl", "2xl"]}>
              Sagar Patel
            </Text>
            <Text color={"#FFF"} marginTop={"-1"} fontSize={"sm"}>
              New Delhi
            </Text>
            <HStack color={"#FFF"} gap={1} py={2}>
              <BsStarFill size={10} />
              <BsStarFill size={10} />
              <BsStarFill size={10} />
              <BsStarFill size={10} />
              <BsStarFill size={10} />
            </HStack>
            <Text fontSize={"xs"} color={"#FAFAFACF"}>
              Attending the Bhagavad Gita sessions opened my mind and heart to a
              new perspective. Its profound philosophy provided me with a
              framework to understand the nature of suffering and the means to
              transcend it... &nbsp;&nbsp;
              <span style={{ color: "#FFD93D" }}>Read More</span>
            </Text>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
