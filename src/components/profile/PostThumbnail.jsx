"use client";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Overlay from "../global/Overlay";

const PostThumbnail = ({ coverImage, text = "No caption" }) => {
  return (
    <>
      <Box
        pos={"relative"}
        boxSize={"28"}
        rounded={"4"}
        boxShadow={"md"}
        bgImage={coverImage || "/banners/temple2.png"}
        bgSize={'cover'}
      >
        <Overlay>
            <Text color={'#FFF'} fontSize={'12'} p={2}>
                {text?.slice(0,16)}
            </Text>
        </Overlay>
      </Box>
    </>
  );
};

export default PostThumbnail;
