"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/global/Navbar";
import Footer from "../../components/global/Footer";
import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import { IoSend } from "react-icons/io5";
import Link from "next/link";

const page = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/team`)
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!search) setFilteredData(data);
    if (search) {
      setFilteredData(
        data?.filter((user) =>
          user?.spiritualName?.toLowerCase()?.includes(search?.toLowerCase())
        )
      );
    }
  }, [search]);

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
            maxW={["full", "80%"]}
          >
            We comprise a dedicated team of over 150 professionals hailing from
            diverse regions across the nation. Led by{" "}
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
                H.G. Gauranga Sundar Das
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
                <Link href={"https://www.instagram.com/gaurangasundar_d/"}>
                  <Image w={6} src="/icons/instagram.png" />
                </Link>
              </HStack>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Text
        fontWeight={"semibold"}
        fontSize={"3xl"}
        textAlign={"center"}
        px={["4, 8, 16"]}
        textTransform={"capitalize"}
        color={"gray.600"}
      >
        {data?.length}+ nationwide volunteers, and counting!
      </Text>
      <HStack p={[4, 8, 16]} pb={0} justifyContent={["center", "flex-end"]}>
        <Input
          w={["full", "sm"]}
          fontSize={"sm"}
          name="search"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant={"outline"}
        />
      </HStack>
      <HStack
        p={[4, 8, 16]}
        pt={4}
        alignItems={"flex-start"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        my={8}
        gap={[4, 16]}
      >
        {filteredData?.map((item, key) => (
          <Box w={["40vw", 36]} h={"auto"} key={key}>
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
      <Stack
        p={[4, 8, 16]}
        w="100%"
        bgGradient="linear(to-r, gray.400, yellow.500, pink.300)"
        direction={["column", "row"]}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={4}
      >
        <Text
          fontWeight={"bold"}
          fontSize={["3xl", "5xl"]}
          color={"#FFF"}
          textAlign={["center", "left"]}
        >
          Want To Be A Part Of Our Team?
        </Text>
        <Button
          size={"lg"}
          rounded={"full"}
          colorScheme="red"
          rightIcon={<IoSend />}
          as={"a"}
          href="/join"
        >
          Fill This Form
        </Button>
      </Stack>
      <Footer />
    </>
  );
};

export default page;
