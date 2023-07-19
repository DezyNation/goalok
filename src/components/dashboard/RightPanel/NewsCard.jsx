"use client";
import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const NewsCard = ({ title, description, link }) => {
  return (
    <>
      <Link href={link || "#"} style={{ width: "100%" }}>
        <Box w={"full"} p={4} rounded={4} bgColor={"#FFF"}>
          <Text fontWeight={"semibold"}>{title}</Text>
          <Text fontSize={"xs"}>{description}</Text>
        </Box>
      </Link>
    </>
  );
};

export default NewsCard;
