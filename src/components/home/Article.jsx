"use client";
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const Article = ({ banner, overview, title, id }) => {
  return (
    <>
      <Box
        as="a"
        href={`/article/${id}`}
        flex={1}
        boxShadow={"base"}
        rounded={4}
        maxW={["full", "sm"]}
      >
        <Image
          w={["full"]}
          h={48}
          objectFit={"cover"}
          objectPosition={banner ? "center" : "top"}
          src={
            banner
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${banner}`
              : "https://upload.wikimedia.org/wikipedia/commons/7/79/Radha_Krishna_at_Iskcon_Vrindavan.jpg"
          }
        />
        <Box p={4}>
          <Text fontSize={"lg"} fontWeight={"medium"} mb={1}>
            {title}
          </Text>
          <Text fontSize={"xs"}>{overview}</Text>
        </Box>
      </Box>
    </>
  );
};

export default Article;
