"use client";
import { Box } from "@chakra-ui/react";
import React from "react";

const page = () => {
  return (
    <>
      <Box w={'full'} h={'100vh'} bgColor={'#333'}>
        <iframe
          src={process.env.NEXT_PUBLIC_CHAT_URL}
          allow="camera; microphone; fullscreen; clipboard-read; clipboard-write; autoplay"
          style={{ border: "0px", width: "100%", height: "100%" }}
        ></iframe>
      </Box>
    </>
  );
};

export default page;
