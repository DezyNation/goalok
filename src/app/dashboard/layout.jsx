"use client";
import DashboardNav from "@/components/dashboard/DashboardNav";
import SideNav from "@/components/dashboard/SideNav";
import useAuth, { UserContext } from "@/utils/hooks/useAuth";
import { Box, HStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loading from "../loading";

const layout = ({ children }) => {
  const Toast = useToast({ position: "top-right" });
  const { logout, user, fetchUser, userLoading } = useAuth();
  useEffect(() => {
    if (user?.apiStatus > 400) {
      Toast({
        status: "warning",
        description: "Session Expired!",
      });
      logout();
    }
  }, []);

  return (
    <>
      {userLoading ? <Loading /> : null}

      <DashboardNav />
      <HStack
        w={"full"}
        bgColor={"gray.100"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        gap={0}
      >
        <UserContext.Provider value={{ user, fetchUser, logout, userLoading }}>
          <SideNav />
          <Box p={4} w={"full"} h={"92vh"} overflow={"hidden"}>
            {children}
          </Box>
        </UserContext.Provider>
      </HStack>
    </>
  );
};

export default layout;
