"use client";
import Overlay from "@/components/global/Overlay";
import Chip from "@/components/profile/Chips";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { HiMail, HiPencil } from "react-icons/hi";
import { GiByzantinTemple, GiReceiveMoney } from "react-icons/gi";
import Link from "next/link";
import { LuCalendarHeart } from "react-icons/lu";
import PostThumbnail from "@/components/profile/PostThumbnail";
import { FaLocationDot } from "react-icons/fa6";
import { BsClockHistory, BsTelephoneFill } from "react-icons/bs";
import BlankSpacer from "@/components/global/BlankSpacer";
import { UserContext } from "@/utils/hooks/useAuth";
import dateOptions from "@/utils/date";
import { useSearchParams } from "next/navigation";
import BackendAxios from "@/utils/axios";

const page = () => {
  const Toast = useToast({ position: "top-right" });
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  const { user, logout } = useContext(UserContext);

  const [fetchedUser, setFetchedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCriticalElements, setShowCriticalElements] = useState(false);

  useEffect(() => {
    if (!userId || userId == user?.id) {
      setShowCriticalElements(true);
    }
    if (!userId) {
      setFetchedUser(user);
    } else {
      fetchUserInfo();
    }
  }, [userId, user]);

  function fetchUserInfo() {
    BackendAxios.get(`/api/users/${userId}?populate=*`)
      .then((res) => {
        setFetchedUser({
          apiStatus: res.status,
          id: res?.data?.id,
          email: res?.data?.email,
          phone: res?.data?.phone,
          username: res?.data?.username,
          name: res?.data?.name,
          avatar: res?.data?.avatar
            ? `${res?.data?.avatar?.url}`
            : null,
          about: res?.data?.about,
          role: res?.data?.role?.name,
          confirmed: res?.data?.confirmed,
          blocked: res?.data?.blocked,
          createdAt: res?.data?.createdAt,
          kcExperience: res?.data?.kcExperience,
          totalDonations: res?.data?.totalDonations,
          active: true,
        });
      })
      .catch((err) => {
        if(err?.response?.status == 401){
          logout()
        }
        Toast({
          status: "error",
          description: err?.response?.data?.error?.message || err?.message,
        });
      });
  }

  return (
    <>
      <Box
        w={"full"}
        h={"92vh"}
        overflow={"scroll"}
        className={"hide-scrollbar"}
      >
        <Box
          pos={"relative"}
          width={"full"}
          height={"xs"}
          bgImage={`/banners/temple5.png`}
          bgSize={"cover"}
          bgPos={"center"}
          rounded={6}
          zIndex={0}
        >
          <Overlay>
            {showCriticalElements ? (
              <HStack p={4} justifyContent={"flex-end"}>
                <Link href={"/dashboard/profile/edit"}>
                  <Button
                    colorScheme="blackAlpha"
                    bgColor={"blackAlpha.500"}
                    leftIcon={<HiPencil />}
                    rounded={"full"}
                    size={"sm"}
                  >
                    Edit Profile
                  </Button>
                </Link>
              </HStack>
            ) : null}
          </Overlay>
          <Stack
            pos={"absolute"}
            top={"70%"}
            p={[0, 8]}
            left={0}
            right={0}
            direction={["column", "row"]}
            alignItems={"flex-start"}
            justifyContent={"center"}
            gap={6}
            zIndex={9}
          >
            <Box
              w={["full", "auto"]}
              p={[4, 6]}
              flex={1}
              bgColor={"white"}
              boxShadow={"md"}
              rounded={4}
            >
              <HStack alignItems={"flex-start"} justifyContent={"flex-start"}>
                <Avatar
                  size={"lg"}
                  boxShadow={"lg"}
                  name={fetchedUser?.name}
                  src={fetchedUser?.avatar}
                  cursor={"pointer"}
                />
                <Box>
                  <Text fontSize={["lg"]} fontWeight={"semibold"}>
                    {fetchedUser?.name}
                  </Text>
                  <Text fontSize={["xs"]}>
                    {fetchedUser?.spiritualName
                      ? `a.k.a ${fetchedUser?.spiritualName}`
                      : null}
                  </Text>
                  <HStack pt={2} flexWrap={"wrap"}>
                    <Chip
                      text={
                        fetchedUser?.role == "Authenticated"
                          ? "Student"
                          : fetchedUser?.role
                      }
                    />
                  </HStack>
                </Box>
              </HStack>
              <br />
              <hr />
              <br />
              <VStack w={"full"} gap={6} alignItems={"flex-start"}>
                <HStack alignItems={"center"} justifyContent={"flex-start"}>
                  <FaLocationDot size={20} />
                  <Text fontSize={"sm"}>From New Delhi</Text>
                </HStack>

                <HStack alignItems={"center"} justifyContent={"flex-start"}>
                  <BsClockHistory size={20} />
                  <Box>
                    <Text fontSize={"xs"}>Member since</Text>
                    <Text fontSize={"sm"}>
                      {fetchedUser?.createdAt
                        ? new Date(fetchedUser?.createdAt).toLocaleDateString(
                            "en-IN",
                            dateOptions
                          )
                        : null}
                    </Text>
                  </Box>
                </HStack>

                <HStack alignItems={"center"} justifyContent={"flex-start"}>
                  <LuCalendarHeart size={20} />
                  <Text fontSize={"sm"}>
                    {fetchedUser?.kcExperience || "1"} Years in Krishna
                    Consciousness
                  </Text>
                </HStack>
                {showCriticalElements ? (
                  <HStack alignItems={"center"} justifyContent={"flex-start"}>
                    <GiReceiveMoney size={20} />
                    <Text fontSize={"sm"}>Donated ₹ {fetchedUser?.totalDonations}</Text>
                  </HStack>
                ) : null}
                {showCriticalElements ? (
                  <HStack alignItems={"center"} justifyContent={"flex-start"}>
                    <HiMail size={20} />
                    <Text fontSize={"sm"}>{fetchedUser?.email}</Text>
                  </HStack>
                ) : null}
                {showCriticalElements ? (
                  <HStack alignItems={"center"} justifyContent={"flex-start"}>
                    <BsTelephoneFill size={20} />
                    <Text fontSize={"sm"}>+91 {fetchedUser?.phone}</Text>
                  </HStack>
                ) : null}
              </VStack>
            </Box>
            <Box
              w={["full", "auto"]}
              p={[4, 6]}
              flex={3}
              bgColor={"white"}
              boxShadow={"md"}
              rounded={4}
            >
              <Text pb={2} fontSize={"lg"} fontWeight={"semibold"}>
                About
              </Text>
              <hr />
              <Text pt={2} fontSize={"sm"}>
                {user?.about}
              </Text>
              <br />
            </Box>
          </Stack>
        </Box>
        <BlankSpacer height={16} />
      </Box>
    </>
  );
};

export default page;
