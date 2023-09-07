"use client";
import { Text } from "@chakra-ui/react";
import React from "react";

const read = (params) => {
  const { slug } = params;
  return (
    <>
      <Text>Book info {slug}</Text>
    </>
  );
};

export default read;
