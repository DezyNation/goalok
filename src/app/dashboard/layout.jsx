"use client";
import DashboardNav from "@/components/dashboard/DashboardNav";
import SideNav from "@/components/dashboard/SideNav";
import useAuth from "@/utils/hooks/useAuth";
import { Box, HStack, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";

const layout = ({ children }) => {
  const Toast = useToast({position: 'top-right'})
  const { logout, user } = useAuth()
  useEffect(()=>{
    if(user?.apiStatus > 400){
      logout()
    }
  },[])
  

  return (
    <>
      <DashboardNav />
      <HStack
        w={"full"}
        bgColor={"gray.100"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
      >
        <SideNav user={user} onLogout={logout} />
        <Box p={4} w={'full'} h={'92vh'} overflow={'hidden'}>{children}</Box>
      </HStack>
    </>
  );
};

export default layout;
