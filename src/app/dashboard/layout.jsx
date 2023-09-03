"use client";
import DashboardNav from "@/components/dashboard/DashboardNav";
import SideNav from "@/components/dashboard/SideNav";
import BackendAxios from "@/utils/axios";
import { Box, HStack, useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useEffect } from "react";

const layout = ({ children }) => {
  const Toast = useToast({position: 'top-right'})
  useEffect(()=>{
    if(!localStorage.getItem("userInfo")){
      fetchUserInfo()
    }
  },[])

  function fetchUserInfo(){
    BackendAxios.get(`/api/users/me?populate=role`).then(res => {
      localStorage.setItem("userInfo", JSON.stringify(res.data))
    }).catch(err => {
      if(err?.response?.status == 401){
        localStorage.clear()
        Cookies.remove("token")
        window.location.replace("/")
        Toast({
          status: 'warning',
          description: "Session expired!"
        })
        return
      }
      Toast({
        status: 'error',
        title: "Error while fetching your information",
        description: err?.response?.data?.error?.message || err?.message,
      })
    })
  }

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
