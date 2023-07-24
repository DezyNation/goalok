"use client";
import DashboardNav from "@/components/dashboard/DashboardNav";
import SideNav from "@/components/dashboard/SideNav";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <DashboardNav />
      <HStack
        w={"full"}
        bgColor={"gray.100"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
      >
        <SideNav />
        <Box p={4} w={'full'} h={'92vh'} overflow={'hidden'}>{children}</Box>
      </HStack>
    </>
  );
};

export default layout;
