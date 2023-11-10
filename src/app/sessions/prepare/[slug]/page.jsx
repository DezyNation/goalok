"use client";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const { slug } = params;
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  function joinSession() {
    setLoading(true);
    Cookies.set("name", name);
    push(`/sessions/join/${slug}?role=authenticated`);
  }
  return (
    <>
      <Box p={[4, 8, 16]}>
        <VStack maxW={"xl"} alignItems={"center"} justifyContent={"flex-start"}>
          <Text fontSize={"2xl"} textAlign={"center"}>
            Join Session
          </Text>
          <Input
            w={["full"]}
            my={8}
            variant={"outline"}
            rounded={"full"}
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            colorScheme="yellow"
            rounded={"full"}
            maxW={["full", "xs"]}
            isLoading={loading}
            onClick={() => joinSession()}
          >
            Join Now
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default page;
