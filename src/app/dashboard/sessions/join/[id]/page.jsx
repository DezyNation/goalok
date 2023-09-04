"use client";
import React, { useState } from "react";
import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import Plyr from "plyr-react";
import "plyr/dist/plyr.css";
import QnaBox from "@/components/dashboard/session/QnaBox";
import QnaButton from "@/components/dashboard/session/QnaBox";

const page = ({ params }) => {
  const { id } = params;
  const videoSrc = {
    type: "video",
    sources: [
      {
        src: "5IqHGB9_N50",
        provider: "youtube",
      },
    ],
  };

  return (
    <>
      <Box
        pos={"relative"}
        h={"92vh"}
        overflow={"scroll"}
        className="hide-scrollbar"
      >
        <Stack
          direction={["column", "row"]}
          alignItems={"flex-start"}
          gap={8}
          overflow={"scroll"}
        >
          <Box flex={3}>
            <Text
              textTransform={"capitalize"}
              className="messiri"
              fontSize={["3xl", "4xl"]}
            >
              {id?.replace(/-/g, " ")}
            </Text>
            <Text fontWeight={"semibold"}>
              By{" "}
              <Link href={"#"} style={{ color: "#EBB02D" }}>
                Gauranga Sundar Prabhu
              </Link>
            </Text>
            <br />
            <Box rounded={16} w={"full"} height={"95vh"} overflow={"hidden"}>
              <iframe
                allow="camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; autoplay"
                src={`${process.env.NEXT_PUBLIC_CONFERENCE_BASE_URL}/${id}`}
                style={{border: '0px'}}
              ></iframe>
            </Box>
          </Box>
          <QnaButton />
        </Stack>
        <HStack py={8}></HStack>
      </Box>
    </>
  );
};

export default page;
