"use client";
import DashboardNav from "@/components/dashboard/DashboardNav";
import SideNav from "@/components/dashboard/SideNav";
import useAuth, { UserContext } from "@/utils/hooks/useAuth";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { BsX } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Toast from "@/components/global/Toast";

const layout = ({ children }) => {
  const { logout, user, fetchUser, userLoading } = useAuth();
  const [showConfirmationBanner, setShowConfirmationBanner] = useState(false);
  const pathName = usePathname();

  const [allowFullScreen, setAllowFullScreen] = useState(false);

  useEffect(() => {
    if (user?.apiStatus > 400) {
      Toast({
        status: "warning",
        description: "Session Expired!",
      });
      logout();
    }
  }, []);

  useEffect(() => {
    if (pathName?.includes("chat") || pathName?.includes("sessions/join")) {
      setAllowFullScreen(true);
    }
  }, [pathName]);

  return (
    <>
      {userLoading ? <Loading /> : null}

      <>
        <DashboardNav />
        {!user?.confirmed && showConfirmationBanner ? (
          <HStack
            p={4}
            border={"1px"}
            borderColor={"whatsapp.500"}
            bgColor={"whatsapp.100"}
            justifyContent={"center"}
            pos={"relative"}
          >
            <Text
              fontSize={"xs"}
              color={"whatsapp.600"}
              fontWeight={"semibold"}
              textAlign={"center"}
            >
              Please confirm your account. Check your email for a confirmation
              mail
            </Text>
            <IconButton
              pos={"absolute"}
              right={4}
              icon={<BsX size={18} />}
              variant={"ghost"}
              onClick={() => setShowConfirmationBanner(false)}
            />
          </HStack>
        ) : null}
        <HStack
          w={"full"}
          bgColor={"gray.100"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          gap={0}
        >
          <UserContext.Provider
            value={{ user, fetchUser, logout, userLoading }}
          >
            <SideNav />
            <Box
              p={allowFullScreen ? 0 : 4}
              w={"full"}
              h={allowFullScreen ? "100vh" : "92vh"}
              overflow={"hidden"}
            >
              {children}
            </Box>
          </UserContext.Provider>
        </HStack>
      </>
    </>
  );
};

export default layout;
