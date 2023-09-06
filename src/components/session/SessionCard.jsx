"use client";
import React from "react";
import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { MdTranslate } from "react-icons/md";
import Link from "next/link";

const SessionCard = ({
  onClick,
  preacher,
  language,
  status,
  title,
  description,
  poster
}) => {
  return (
    <>
      <Box
        w={['full', 'sm']}
        rounded={8}
        transition={"all .3s ease"}
        cursor={"pointer"}
        onClick={onClick}
      >
        <Box pos={"relative"} rounded={8} overflow={"hidden"}>
          <Image
            src={poster || "https://www.hindugodwallpaper.com/downloadfiles.php?id=627"}
            w={"full"}
            h={56}
            objectFit={"cover"}
            cursor={"pointer"}
          />
          <Text
            pos={"absolute"}
            top={2}
            right={0}
            py={"0.5"}
            px={2}
            roundedLeft={"full"}
            color={"#FFF"}
            fontSize={"8"}
            bgGradient={"linear-gradient(to-br, #0052d4, #4364f7, #6fb1fc)"}
          >
            {preacher}
          </Text>
          <Text
            pos={"absolute"}
            bottom={0}
            right={0}
            py={1}
            px={4}
            roundedTopLeft={"full"}
            fontSize={"8"}
            bgColor={"red.500"}
            color={"#FFF"}
            fontWeight={"semibold"}
            textTransform={"uppercase"}
          >
            {status == "ongoing" ? "LIVE" : status}
          </Text>
          <HStack
            pos={"absolute"}
            bottom={0}
            px={2}
            py={1}
            left={0}
            bgGradient={
              "linear-gradient(to-r, rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0.3))"
            }
          >
            <MdTranslate color="#FFF" size={10} />
            <Text fontSize={"10"} color={"#FFF"}>
              {language || "English / Hindi"}
            </Text>
          </HStack>
        </Box>
        <Box w={"full"} py={4}>
          <Text className="messiri" fontSize={"lg"} fontWeight={"semibold"}>
            {title}
          </Text>
          <Text fontSize={"xs"} color={"blackAlpha.600"}>
            {description?.slice(0, 60)}...
          </Text>
          <br />
          <Text fontSize={"sm"} color={"twitter.600"}>
            Tags
          </Text>
          <HStack
            pt={2}
            gap={4}
            flexWrap={"wrap"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            <Link href={"#"}>
              <Text fontSize={"xs"} color="#666" _hover={{ color: "#333" }}>
                #spirituality
              </Text>
            </Link>
            <Link href={"#"}>
              <Text fontSize={"xs"} color="#666" _hover={{ color: "#333" }}>
                #bhagvad_gita
              </Text>
            </Link>
            <Link href={"#"}>
              <Text fontSize={"xs"} color="#666" _hover={{ color: "#333" }}>
                #krishna
              </Text>
            </Link>
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default SessionCard;
