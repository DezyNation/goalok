"use client";
import DashboardNav from "@/components/dashboard/DashboardNav";
import SideNav from "@/components/dashboard/SideNav";
import useAuth from "@/utils/hooks/useAuth";
import { Box, HStack, useToast } from "@chakra-ui/react";
import React, { createContext, useEffect } from "react";
import Loading from "../loading";

const UserContext = createContext(null);

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
      >
        <SideNav user={user} onLogout={logout} />
        <Box p={4} w={"full"} h={"92vh"} overflow={"hidden"}>
          <UserContext.Provider value={{ user, fetchUser, logout, userLoading }}>
            {children}
          </UserContext.Provider>
        </Box>
      </HStack>
    </>
  );
};

export default layout;
export { UserContext };
