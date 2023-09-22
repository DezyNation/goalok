"use client";
import BlankSpacer from "@/components/global/BlankSpacer";
import Navbar from "@/components/global/Navbar";
import BackendAxios, { DefaultAxios } from "@/utils/axios";
import useApiHandler from "@/utils/hooks/useApiHandler";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Text,
  Input,
  Button,
  Textarea,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState } from "react";

const DeleteAccount = () => {
  const Toast = useToast({ position: "top-right" });
  const { handleError } = useApiHandler();

  const [isLoading, setIsLoading] = useState(false)

  const Formik = useFormik({
    initialValues: {
      email: "",
      secretPin: "",
      reason: "",
    },
    onSubmit: (values) => {
      if (!values.email || !values.secretPin) {
        Toast({
          description: "Email and Secret PIN are required",
        });
        return;
      }
      setIsLoading(true)
      DefaultAxios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/account/request-delete`,
        values
        )
        .then((res) => {
          setIsLoading(false)
          Toast({
            title: "Your request has been sent",
            description: "Please check your email for further updates",
          });
        })
        .catch((err) => {
          setIsLoading(false)
          handleError(err, "Error while sending request");
        });
    },
  });
  return (
    <>
      <Navbar />
      <BlankSpacer />
      <Box p={[4]}>
        <Container py={8}>
          <Text
            fontSize={"2xl"}
            fontWeight={"semibold"}
            textAlign={"center"}
            className="messiri"
          >
            Account Deletion Request
          </Text>
          <Text textAlign={"center"}>
            We are sorry to see you go. If this is a mistake please contact us
            at <a href="mailto:support@iskconinc.com">support@iskconinc.com</a>{" "}
            We will be happy to help!
          </Text>
          <br />
          <br />
          <FormControl pt={4}>
            <FormLabel>Registered Email ID</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Your registered Email"
              onChange={Formik.handleChange}
            />
          </FormControl>
          <br />
          <FormControl pt={4}>
            <FormLabel>Secret PIN</FormLabel>
            <Text fontSize={"8px"}>
              You can find your Secret PIN in Settings.
            </Text>
            <Input
              type="number"
              name="secretPin"
              placeholder="Secret PIN"
              minLength={4}
              maxLength={4}
              onChange={Formik.handleChange}
            />
          </FormControl>
          <br />
          <FormControl pt={4}>
            <FormLabel>Reason (optional)</FormLabel>
            <Textarea
              name="reason"
              height={24}
              w={"full"}
              resize={"none"}
              placeholder="Help us understand what went wrong?"
              onChange={Formik.handleChange}
            />
          </FormControl>
          <br />
          <br />
          <HStack justifyContent={"flex-end"}>
            <Button
              colorScheme="teal"
              bgColor={"#333"}
              onClick={Formik.handleSubmit}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </HStack>
        </Container>
      </Box>
    </>
  );
};

export default DeleteAccount;
