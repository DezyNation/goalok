"use client";
import Overlay from "@/components/global/Overlay";
import Chip from "@/components/profile/Chips";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  Tooltip,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  BsCamera,
  BsCheck,
  BsClockHistory,
  BsInfo,
  BsTelephoneFill,
} from "react-icons/bs";
import BlankSpacer from "@/components/global/BlankSpacer";
import { UserContext } from "@/utils/hooks/useAuth";
import dateOptions from "@/utils/date";
import { useSearchParams } from "next/navigation";
import BackendAxios from "@/utils/axios";
import { useFormik } from "formik";

const page = () => {
  const Toast = useToast({ position: "top-right" });
  const { user, logout } = useContext(UserContext);

  const Formik = useFormik({
    initialValues: {
      name: user?.name,
      username: user?.username,
      spiritualName: user?.spiritualName,
      kcExperience: user?.kcExperience,
      country: user?.country,
      state: user?.state,
    },
  });

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
            <HStack p={4} justifyContent={"flex-end"}>
              <Button
                colorScheme="blackAlpha"
                bgColor={"blackAlpha.500"}
                leftIcon={<BsCheck />}
                rounded={"full"}
                size={"sm"}
              >
                Save Details
              </Button>
            </HStack>
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
              width={["full", "80%"]}
              bgColor={"white"}
              boxShadow={"md"}
              rounded={4}
            >
              <VStack w={"full"} justifyContent={"center"}>
                <Box
                  pos={"relative"}
                  rounded={"full"}
                  boxSize={["24", "36"]}
                  overflow={"hidden"}
                >
                  <Image src={user?.avatar} boxSize={"inherit"} />
                  <VStack
                    pos={"absolute"}
                    top={0}
                    left={0}
                    w={"full"}
                    h={"full"}
                    bgColor={"transparent"}
                    color={"transparent"}
                    transition={"all .3s ease"}
                    _hover={{ bgColor: "rgba(0,0,0,0.75)", color: "#FFF" }}
                    justifyContent={"center"}
                    cursor={"pointer"}
                  >
                    <BsCamera />
                    <Text fontSize={"xs"}>
                      Click to {user?.avatar ? "Change" : "Upload"}
                    </Text>
                  </VStack>
                </Box>
              </VStack>
              <br />
              <Text fontSize={"xl"} color={'gray.600'} fontWeight={"semibold"} className="messiri">
                Basic Details
              </Text>
              <hr />
              <br />
              <Stack
                py={6}
                direction={["column", "row"]}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <FormControl w={["full", "sm"]}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    variant={"flushed"}
                    name="username"
                    value={Formik.values.username}
                    onChange={Formik.handleChange}
                    placeholder="Your username for authentication"
                  />
                </FormControl>
                <FormControl w={["full", "sm"]}>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    variant={"flushed"}
                    name="name"
                    value={Formik.values.name}
                    onChange={Formik.handleChange}
                    placeholder="Your full name"
                  />
                </FormControl>
              </Stack>
              <Stack
                py={6}
                direction={["column", "row"]}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <FormControl w={["full", "sm"]}>
                  <FormLabel>
                    Krishna Conscious Age &nbsp; &nbsp; &nbsp;{" "}
                  </FormLabel>
                  <Input
                    variant={"flushed"}
                    name="kcExperience"
                    value={Formik.values.kcExperience}
                    type="number"
                    max={100}
                    onChange={Formik.handleChange}
                    placeholder="Your age in Krishna Bhakti? (eg, 28)"
                  />
                </FormControl>
                <FormControl w={["full", "sm"]}>
                  <FormLabel>Spiritual Name</FormLabel>
                  <Input
                    variant={"flushed"}
                    name="spiritualName"
                    value={Formik.values.spiritualName}
                    onChange={Formik.handleChange}
                    placeholder="Your spiritual name"
                  />
                </FormControl>
              </Stack>
              <br />
              <BlankSpacer height={16} />
              <Text fontSize={"xl"} color={'gray.600'} fontWeight={"semibold"} className="messiri">
                Residential Details
              </Text>
              <hr />
              <br />
              <Stack
                py={6}
                direction={["column", "row"]}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <FormControl w={["full", "sm"]}>
                  <FormLabel>Country</FormLabel>
                  <Input
                    variant={"flushed"}
                    name="country"
                    value={"India"}
                    placeholder="Your country of residence"
                  />
                </FormControl>
                <FormControl w={["full", "sm"]}>
                  <FormLabel>ZIP Code</FormLabel>
                  <Input
                    variant={"flushed"}
                    name="zipCode"
                    value={Formik.values.zipCode}
                    onChange={Formik.handleChange}
                    placeholder="Your ZIP Code"
                  />
                </FormControl>
              </Stack>
              <BlankSpacer height={16} />
              <Text fontSize={"xl"} color={'gray.600'} fontWeight={"semibold"} className="messiri">
                Contact Details
              </Text>
              <hr />
              <br />
              <Stack
                py={6}
                direction={["column", "row"]}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <FormControl w={["full", "sm"]}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    variant={"flushed"}
                    name="email"
                    value={user?.email}
                    placeholder="Your Email"
                    isDisabled
                  />
                </FormControl>
                <FormControl w={["full", "sm"]}>
                  <FormLabel>Phone No.</FormLabel>
                  <Input
                    variant={"flushed"}
                    name="phone"
                    value={user?.phone}
                    onChange={Formik.handleChange}
                    placeholder="Your Phone No."
                    isDisabled
                  />
                </FormControl>
              </Stack>
              <HStack pt={8} justifyContent={'flex-end'}>
                <Button colorScheme="teal" bgColor={'#333'} rounded={'full'}>Save Details</Button>
              </HStack>
            </Box>
          </Stack>
        </Box>
        <BlankSpacer height={16} />
      </Box>
    </>
  );
};

export default page;
