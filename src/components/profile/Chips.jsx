"use client";
import { Button } from "@chakra-ui/react";
import React from "react";

const Chip = ({ size, text, colorScheme, color, bgColor, onClick }) => {
  return (
    <Button
      size={size || "xs"}
      bgColor={bgColor || "aliceblue"}
      color={color || "twitter.500"}
      rounded={"full"}
      colorScheme={colorScheme || "twitter"}
      _hover={{ color: "#FFF", bgColor: "twitter.500" }}
      onClick={() => onClick ? onClick(text) : console.log(text)}
    >
      {text?.replace(/-/g, " ")}
    </Button>
  );
};

export default Chip;
