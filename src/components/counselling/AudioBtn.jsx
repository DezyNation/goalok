"use client";
import { Box, Image } from "@chakra-ui/react";
import Lottie from "lottie-react";
import React, { useEffect, useRef, useState } from "react";
import blob from "../../../public/lottie/blob.json";

const AudioBtn = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioref = useRef(null);

  // useEffect(() => {
  //   play();
  // }, []);

  function play(volume) {
    audioref.current.volume = 0.025
    audioref?.current?.play();
    setAudioPlaying(true);
  }

  function pause() {
    audioref?.current?.pause();
    setAudioPlaying(false);
  }

  return (
    <>
      <audio ref={audioref} autoPlay>
        <source src={"/audios/kirtan.mp3"} type="audio/mpeg"></source>
      </audio>
      <Box w={24} h={24} pos={"fixed"} bottom={4} left={4}>
        <Lottie
          animationData={blob}
          loop
          autoPlay
          width={"full"}
          height={"full"}
        />
        <Box
          pos={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          display={"grid"}
          placeContent={"center"}
          cursor={"pointer"}
          onClick={() => (audioPlaying ? pause() : play())}
        >
          <Image
            src={audioPlaying ? "/icons/pause.png" : "/icons/play.png"}
            width={5}
            height={5}
            objectFit={"contain"}
          />
        </Box>
      </Box>
    </>
  );
};

export default AudioBtn;
