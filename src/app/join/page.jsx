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
} from "@chakra-ui/react";
import { CountrySelector } from "react-international-phone";
import "react-international-phone/style.css";
import { Select } from "chakra-react-select";

const page = () => {
  const [country, setCountry] = useState("in");
  const [pastAssociation, setPastAssociation] = useState(null);

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
                <FormControl w={["full", "xs"]}>
                  <FormLabel>Your Name</FormLabel>
                  <Input rounded={"full"} placeholder="Your full name" />
                </FormControl>
                <FormControl w={["full", "xs"]}>
                  <FormLabel>Phone Number</FormLabel>
                  <InputGroup>
                    <InputLeftAddon
                      p={0}
                      bgColor={"#FFF"}
                      children={
                        <CountrySelector
                          selectedCountry={country}
                          onSelect={(iso2) => setCountry(iso2)}
                          buttonStyle={{
                            width: "100%",
                            border: "none",
                            paddingLeft: "6px",
                            paddingRight: "6px",
                          }}
                        />
                      }
                    />
                    <Input
                      rounded={"full"}
                      placeholder="Your phone no."
                      type="tel"
                      max={10}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} gap={8} pb={8}>
                <FormControl w={["full", "xs"]}>
                  <FormLabel>Your Telegram ID</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children={"@"} />
                    <Input rounded={"full"} placeholder="Your Telegram ID" />
                  </InputGroup>
                </FormControl>
                <FormControl w={["full", "xs"]}>
                  <FormLabel>How did you know about us?</FormLabel>
                  <Select options={sources}></Select>
                </FormControl>
              </Stack>
              <Stack
                w={"full"}
                direction={["column", "row"]}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                gap={8}
                pb={8}
              >
                <FormControl>
                  <FormLabel>Did you join any other temple before?</FormLabel>
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
                    <FormLabel>Please tell us the temple name</FormLabel>
                    <Input placeholder="e.g., ISKCON or HKM" />
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
              >
                <FormControl w={["full", "full"]}>
                  <FormLabel>Tell us little about yourself</FormLabel>
                  <Textarea
                    w={"full"}
                    h={24}
                    resize={"none"}
                    fontSize={"sm"}
                    placeholder={
                      "Tell us why you want to join us, what inspires you the most, your fields of interest..."
                    }
                  />
                </FormControl>
              </Stack>
              <HStack mb={8} w={"full"} justifyContent={"flex-start"}>
                <Checkbox />
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
                >
                  Submit
                </Button>
              </HStack>
            </VStack>
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default page;
