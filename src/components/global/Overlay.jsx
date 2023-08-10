"use client";
import { Box } from "@chakra-ui/react";
import React from "react";

const Overlay = ({children}) => {
  return (
    <>
      <Box
        pos={"absolute"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        width={"full"}
        bgColor={"blackAlpha.600"}
        rounded={'inherit'}
      >
        { children }
      </Box>
    </>
  );
};

export default Overlay;
