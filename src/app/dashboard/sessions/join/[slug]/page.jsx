"use client";
import React, { useContext, useEffect, useState } from "react";
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
import { DefaultAxios } from "@/utils/axios";
import { UserContext } from "@/utils/hooks/useAuth";

const page = ({ params }) => {
  const { slug } = params;
  const [joiningLink, setJoiningLink] = useState(false)
  const {user} = useContext(UserContext)

  useEffect(()=>{
    getJoiningLink()
  },[])

  function getJoiningLink() {
    DefaultAxios.post(
      `${process.env.NEXT_PUBLIC_CONFERENCE_BASE_URL}/api/v1/join`,
      {
        room: slug,
        name: user?.username,
        audio: true,
        video: false,
        notify: true,
      },
      {
        headers: {
          authorization: "mirotalksfu_default_secret",
        },
      }
    ).then(res => {
      console.log(res.data)
      setJoiningLink(res.data?.join)
    }).catch(err => {
      console.log(err)
    });
  }

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
              {slug?.replace(/-/g, " ")}
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
                src={"https://meet.krishnaconsciousnesssociety.com/join?room=session-id&password=undefined&name=undefined&audio=true&video=false&screen=undefined&notify=true"}
                style={{ border: "0px", width: "100%", height: "100%" }}
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
