"use client";
import React, { useEffect, useState } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { DefaultAxios } from "../../../utils/axios";
import { Box, Container, Image, Text, VStack } from "@chakra-ui/react";
import Navbar from "../../../components/global/Navbar";
import Footer from "../../../components/global/Footer";

const page = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    DefaultAxios.get(`/api/article/view/${id}`)
      .then(async (res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setError(true);
      });
  }

  return (
    <>
      <Navbar />
      {error ? (
        <VStack
          justifyContent={"center"}
          w={"full"}
          h={"100vh"}
          p={[4, 8, 16]}
          pt={[32]}
        >
          <Text fontSize={"xl"} fontWeight={"semibold"} color={"gray.600"}>
            Article not found
          </Text>
        </VStack>
      ) : (
        <Container maxW={["full", "5xl", "5xl"]}>
          <Box w={"full"} p={[4]} minH={"100vh"} my={32}>
            <Text fontSize={["xl", "2xl"]} fontWeight={"semibold"} mb={8}>
              {data?.title}
            </Text>
            {data?.banner ? (
              <Image
                w={"full"}
                h={"xs"}
                objectFit={"cover"}
                src={`${data?.banner?.url}`}
              />
            ) : null}
            <br />
            <br />
            {data ? (
              <BlocksRenderer
                blocks={{
                  paragraph: ({ children }) => {
                    return children[0].props.text === "" ? (
                      <p className="">ㅤ</p>
                    ) : (
                      <p className="">{children}</p>
                    );
                  },
                  quote: ({ children }) => {
                    return (
                      <Box
                        p={6}
                        w={"full"}
                        borderLeft={"2px solid"}
                        borderLeftColor={"gray.500"}
                        bgColor={"gray.50"}
                      >
                        <p>"{children}"</p>
                      </Box>
                    );
                  },
                }}
                content={data?.description}
              />
            ) : null}
          </Box>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default page;
