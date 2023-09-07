"use client";
import Overlay from "@/components/global/Overlay";
import { DefaultAxios } from "@/utils/axios";
import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

const read = (params) => {
  const { slug } = params;
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchBookInfo();
    }
  }, [slug]);

  function fetchBookInfo() {
    DefaultAxios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/knowledgebase/books/${slug}`
    )
      .then((res) => {
        setBookInfo(res.data);
      })
      .catch((err) => {
        handleError(err, "Error while fetching book info");
      });
  }

  return (
    <>
      <Box w={"full"} h={"full"} overflow={"scroll"} className="hide-scrollbar">
        <Box
          w={"full"}
          pos={"relative"}
          minH={"sm"}
          bgImage={
            bookInfo?.cover ||
            "https://cdn.firstcry.com/education/2022/04/27151302/1863326218.jpg"
          }
          bgSize={"cover"}
        >
          <Overlay blur={"10px"} overlayColor={"blackAlpha.700"}>
            <Box w={"full"} p={8}>
              <Text
                fontSize={["2xl", "3xl"]}
                className="messiri"
                color={"#FFF"}
                fontWeight={"semibold"}
              >
                {bookInfo?.title}
              </Text>
              <Text fontSize={["lg"]} color={"#FFF"}>
                by {bookInfo?.author}
              </Text>
              <Link
                href={`/dashboard/knowledgebase/books/read/${slug}`}
                target="_blank"
              >
                <Button rounded={"full"} colorScheme="yellow">
                  Read Now
                </Button>
              </Link>
            </Box>
          </Overlay>
        </Box>
        <Box w={"full"} py={8}>
          {parse(bookInfo?.description)}
        </Box>
      </Box>
    </>
  );
};

export default read;
