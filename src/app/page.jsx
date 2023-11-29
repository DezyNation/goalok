"use client";
import { Stack, Box, Text, Button, Image } from "@chakra-ui/react";
import HomePage from "./home/page";
import { IoHeart } from "react-icons/io5";

export default function Home() {
  return (
    <>
      <HomePage />

      <Button
        pos={"fixed"}
        bottom={4}
        right={4}
        colorScheme="pink"
        rightIcon={<IoHeart />}
        rounded={'full'}
        as={'a'}
        href="/counselling"
      >Counselling</Button>
    </>
  );
}
