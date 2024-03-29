"use client";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

const SessionCard = ({ image, title, preacher, slug }) => {
  return (
    <Link href={`/dashboard/sessions/join/${slug}`}>
      <Box
        w={36}
        height={48}
        rounded={6}
        overflow={"hidden"}
        bgImage={
          image || "https://www.hindugodwallpaper.com/downloadfiles.php?id=627"
        }
        bgSize={"cover"}
        bgPosition={"center"}
        _hover={{ boxShadow: "lg" }}
        cursor={"pointer"}
      >
        <Box
          w={"full"}
          p={3}
          height={"full"}
          bgGradient={"linear-gradient(to-b, rgba(0,0,0,0.6), rgba(0,0,0,0.6))"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"flex-start"}
          justifyContent={"flex-end"}
        >
          <Text className="messiri" color={"#FFF"} fontSize={"sm"}>
            {title}
          </Text>
          <Text color={"#FFF"} fontSize={"8"}>
            by {preacher}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default SessionCard;
