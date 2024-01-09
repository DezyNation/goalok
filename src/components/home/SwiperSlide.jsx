"use client";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const SwiperSlide = ({ img, title, link }) => {
  return (
    <>
      <Link href={link ?? "#"} target="_blank">
        <div class="center-box">
          <div class="animated-border-box-glow"> </div>
          <div class="animated-border-box">
            <Box
              pos={"relative"}
              w={"99%"}
              h={"98%"}
              rounded={'inherit'}
              overflow={"hidden"}
              bgImage={img}
              bgSize={"cover"}
              bgRepeat={'no-repeat'}
              bgPos={'center'}
            >
              <Box
                pos={"absolute"}
                w={"full"}
                h={"full"}
                p={4}
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgGradient="linear(blackAlpha.50 10%, blackAlpha.200 30%, blackAlpha.400 40%, blackAlpha.500 60%, blackAlpha.700 100%)"
                display={"flex"}
                flexDir={"row"}
                alignItems={"flex-end"}
                justifyContent={"flex-start"}
              >
                <Text
                  textTransform={"capitalize"}
                  fontSize={"lg"}
                  color={"#FFF"}
                  fontWeight={"semibold"}
                >
                  {title}
                </Text>
              </Box>
            </Box>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SwiperSlide;
