"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/global/Navbar";
import Footer from "../../components/global/Footer";
import { Box, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

const page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/team`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Box p={[4, 8, 16]} pb={4} h={"auto"}>
        <Text
          fontSize={["3xl", "5xl"]}
          textAlign={"center"}
          fontWeight={"semibold"}
          mt={8}
          pt={[8, 4]}
          className="messiri"
        >
          Our Team
        </Text>
        <VStack w={"full"} alignItems={"center"} justifyContent={"center"}>
          <Text
            fontSize={["sm", "sm"]}
            textAlign={"center"}
            color={"gray.600"}
            mb={8}
            maxW={["full", "xl"]}
          >
            We comprise a dedicated team of over 150 professionals hailing from
            diverse regions across the nation. Under the leadership of{" "}
            <strong>H.G. Gauranga Sundar Das</strong>, our team boasts
            individuals with expertise in various fields, encompassing
            scientists, doctors, journalists, chartered accountants, engineers,
            and more!
          </Text>
        </VStack>
        <Stack
          direction={["column", "row"]}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box w={["full", "xs"]} boxShadow={"lg"} h={"md"}>
            <Image
              w={"full"}
              h={"72"}
              src="/team/gsdprabhuji.jpg"
              objectFit={"cover"}
              objectPosition={"top"}
            />
            <Box p={4}>
              <Text className="messiri" fontSize={"lg"} fontWeight={"semibold"}>
                HG Gauranga Sundar Das
              </Text>
              <Text fontSize={"xs"} color={"gray.600"}>
                <span style={{ fontWeight: "600" }}>Chairman</span> - Project
                Gaiya
              </Text>
              <Text fontSize={"xs"} color={"gray.600"}>
                <span style={{ fontWeight: "600" }}>President</span> - Krishna
                Consciousness Society
              </Text>
              <Text fontSize={"xs"} color={"gray.600"}>
                <span style={{ fontWeight: "600" }}>Ex Digital & IT Head</span>{" "}
                - Bharat Niti
              </Text>
              <HStack pt={4} justifyContent={"flex-end"} cursor={"pointer"}>
                <Image w={6} src="/icons/instagram.png" />
              </HStack>
            </Box>
          </Box>
        </Stack>
        <br />
        <br />
      </Box>

      <HStack
        p={[4, 8, 16]}
        alignItems={"center"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        my={8}
        gap={[4, 16]}
      >
        {data?.map((item, key) => (
          <Box w={["40vw", 36]} h={"auto"}>
            <VStack w={"full"} alignItems={"center"} justifyContent={"center"}>
              <Image
                src={item?.avatar?.url ?? "/face.png"}
                w={[24, 36]}
                h={[24, 36]}
                rounded={"full"}
                objectPosition={"center"}
                objectFit={"cover"}
                mb={1}
              />
              <Text
                className="messiri"
                fontWeight={"semibold"}
                textTransform={"capitalize"}
                fontSize={["sm", "md"]}
                textAlign={"center"}
              >
                {item?.spiritualName}
              </Text>
              <Text
                fontSize={["10", "xs"]}
                color={"gray.500"}
                textAlign={"center"}
              >
                {item?.qualification}
              </Text>
            </VStack>
          </Box>
        ))}
      </HStack>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default page;