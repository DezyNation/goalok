"use client";
import BlankSpacer from "@/components/global/BlankSpacer";
import { Box } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useEffect } from "react";

const page = () => {
  useEffect(()=>{
    window.parent.postMessage({
      event: 'login-with-token',
      loginToken: Cookies.get("rcToken")
      }, process.env.NEXT_PUBLIC_CHAT_URL);
  },[])
  return (
    <>
      <Box
        w={"full"}
        h={"100vh"}
        overflow={"scroll"}
        className="hide-scrollbar"
        bgColor={"#333"}
      >
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
