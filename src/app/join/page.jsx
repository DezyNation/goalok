"use client";
import React, { useState } from "react";
import Navbar from "../../components/global/Navbar";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Hide,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { CountrySelector } from "react-international-phone";
import "react-international-phone/style.css";
import { Select } from "chakra-react-select";
import { useFormik } from "formik";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

const page = () => {
  const Toast = useToast({ position: "top-right" });
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("in");
  const [pastAssociation, setPastAssociation] = useState(false);

  const sources = [
    {
      label: "Instagram",
      value: "Instagram",
    },
    {
      label: "Google",
      value: "Google",
    },
    {
      label: "Quora",
      value: "Quora",
    },
    {
      label: "Facebook",
      value: "Facebook",
    },
    {
      label: "X (Twitter)",
      value: "X (Twitter)",
    },
    {
      label: "Koo",
      value: "Koo",
    },
    {
      label: "Other",
      value: "Other",
    },
  ];

  const Formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      telegramId: "",
      reference: "",
      hadPastAssociation: pastAssociation,
      previousTempleName: "",
      country: country,
    },
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`${API_BASE_URL}/joining-requests`, {
          data: {
            ...values,
          },
        })
        .then((res) => {
          setLoading(false);
          Toast({
            status: "success",
            title: "Successfully submitted.",
          });
          Formik.handleReset();
        })
        .catch((error) => {
          setLoading(false);
          Toast({
            status: "error",
            title: "Error submitting your request",
            description:
              error?.response?.data?.error?.message ||
              error?.response?.data?.message ||
              error?.message,
          });
        });
    },
  });

  return (
    <>
      <Navbar />
      <Box>
        <HStack
          w={"full"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <Hide below="md">
            <Box
              pos={"relative"}
              flex={1}
              minH={"100vh"}
              bgImage={"/gsdprabhuji.jpg"}
              bgSize={"cover"}
              bgPosition={"70% 50%"}
              bgRepeat={"no-repeat"}
            >
              <Box
                pos={"absolute"}
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgColor={"blackAlpha.500"}
              ></Box>
            </Box>
          </Hide>
          <form onSubmit={Formik.handleSubmit}>
            <Box
              flex={1}
              p={[4, 8, 16]}
              h={"100vh"}
              overflowY={"scroll"}
              className="hide-scrollbar"
            >
              <VStack my={16} alignItems={"center"} justifyContent={"center"}>
                <Text>Take the best decision of your life</Text>
                <Text className="messiri" fontSize={["3xl"]}>
                  Get a Devotee Association
                </Text>
                <br />
                <Stack direction={["column", "row"]} gap={8} pb={8}>
                  <FormControl w={["full", "xs"]} isRequired>
                    <FormLabel fontSize={"sm"}>Your Name</FormLabel>
                    <Input
                      rounded={"full"}
                      placeholder="Your full name"
                      name="name"
                      value={Formik.values.name}
                      onChange={Formik.handleChange}
                    />
                  </FormControl>
                  <FormControl w={["full", "xs"]} isRequired>
                    <FormLabel fontSize={"sm"}>Phone Number</FormLabel>
                    <InputGroup pos={"relative"} zIndex={9}>
                      <InputLeftAddon
                        p={0}
                        pos={"relative"}
                        bgColor={"#FFF"}
                        children={
                          <CountrySelector
                            selectedCountry={country}
                            onSelect={(iso2) => setCountry(iso2)}
                            renderButtonWrapper={({ children, rootProps }) => (
                              <Button {...rootProps} variant="outline" px="4px">
                                {children}
                              </Button>
                            )}
                          />
                        }
                      />
                      <Input
                        rounded={"full"}
                        placeholder="Your phone no."
                        type="tel"
                        max={10}
                        name="phone"
                        value={Formik.values.phone}
                        onChange={Formik.handleChange}
                      />
                    </InputGroup>
                  </FormControl>
                </Stack>
                <Stack direction={["column", "row"]} gap={8} pb={8} zIndex={1}>
                  <FormControl w={["full", "xs"]}>
                    <FormLabel fontSize={"sm"}>Your Telegram ID</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children={"@"} />
                      <Input
                        rounded={"full"}
                        placeholder="Your Telegram ID"
                        name="telegramId"
                        value={Formik.values.telegramId}
                        onChange={Formik.handleChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl w={["full", "xs"]} isRequired>
                    <FormLabel fontSize={"sm"}>
                      How did you know about us?
                    </FormLabel>
                    <Select
                      options={sources}
                      name="reference"
                      value={sources.find(
                        (data) => data?.value == Formik.values.reference
                      )}
                      onChange={(item) =>
                        Formik.setFieldValue(
                          "reference",
                          sources.find((data) => data?.value == item?.value)
                            ?.value
                        )
                      }
                    />
                  </FormControl>
                </Stack>
                <Stack
                  w={"full"}
                  direction={["column", "row"]}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                  gap={8}
                  pb={8}
                  zIndex={0}
                >
                  <FormControl>
                    <FormLabel fontSize={"sm"}>
                      Did you join any other temple before?
                    </FormLabel>
                    <HStack>
                      <Button
                        colorScheme={pastAssociation ? "twitter" : "gray"}
                        onClick={() => setPastAssociation(true)}
                      >
                        YES
                      </Button>
                      <Button
                        colorScheme={
                          pastAssociation == false ? "twitter" : "gray"
                        }
                        onClick={() => setPastAssociation(false)}
                      >
                        NO
                      </Button>
                    </HStack>
                  </FormControl>
                  {pastAssociation ? (
                    <FormControl>
                      <FormLabel fontSize={"sm"}>
                        Please tell us the temple name
                      </FormLabel>
                      <Input
                        placeholder="e.g., ISKCON or HKM"
                        name="previousTempleName"
                        value={Formik.values.previousTempleName}
                        onChange={Formik.handleChange}
                      />
                    </FormControl>
                  ) : null}
                </Stack>
                <Stack
                  w={"full"}
                  direction={["column", "row"]}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                  gap={8}
                  pb={8}
                  zIndex={0}
                >
                  <FormControl w={["full", "full"]}>
                    <FormLabel fontSize={"sm"}>
                      Tell us little about yourself
                    </FormLabel>
                    <Textarea
                      w={"full"}
                      h={24}
                      resize={"none"}
                      fontSize={"sm"}
                      placeholder={
                        "Tell us why you want to join us, what inspires you the most, your fields of interest..."
                      }
                      name="about"
                      value={Formik.values.about}
                      onChange={Formik.handleChange}
                    />
                  </FormControl>
                </Stack>
                <HStack
                  mb={8}
                  w={"full"}
                  alignItems={["flex-start", "center"]}
                  justifyContent={"flex-start"}
                >
                  <Checkbox isRequired />
                  <Text fontSize={"sm"}>
                    By submitting this form, you agree to our Terms & Conditions
                    and Privacy Policy
                  </Text>
                </HStack>
                <HStack w={"full"} justifyContent={"flex-end"}>
                  <Button
                    colorScheme="yellow"
                    rounded={"full"}
                    fontWeight={"medium"}
                    type="submit"
                    isLoading={loading}
                  >
                    Submit
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </form>
        </HStack>
      </Box>
    </>
  );
};

export default page;
