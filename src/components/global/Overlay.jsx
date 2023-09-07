"use client";
import { Box } from "@chakra-ui/react";
import React from "react";

const Overlay = ({ children, blur, overlayColor }) => {
  return (
    <>
      <Box
        pos={"absolute"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        width={"full"}
        bgColor={overlayColor || "blackAlpha.600"}
        rounded={"inherit"}
        backdropBlur={blur || 0}
      >
        {children}
      </Box>
    </>
  );
};

export default Overlay;
