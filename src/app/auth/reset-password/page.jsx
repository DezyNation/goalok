"use client";
import BackendAxios, { DefaultAxios } from "@/utils/axios";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  useToast
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/constants";

const page = () => {
  const Toast = useToast()
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const token = searchParams.get("code");
  const [email, setEmail] = useState("");

  useEffect(() => {
    Formik.setFieldValue("code", token);
  }, [token]);

  const Formik = useFormik({
    initialValues: {
      code: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      axios.post(`${API_BASE_URL}/auth/reset-password`, values)
        .then((res) => {
          setIsLoading(false);
          Toast({
            status: "success",
            title: "Password Reset Successfully",
            description: "Please login with your new credentials",
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toast({
            status: "error",
            description: err?.response?.data?.error?.message || err?.message,
          });
        });
    },
  });

  function sendResetEmail() {
    setIsLoading(true);
    DefaultAxios.post(`/api/auth/forgot-password`, {
      email: email,
    })
      .then((res) => {
        setIsLoading(false);
        Toast({
          status: "success",
          title: "Password Reset Email Sent",
          description: "Please check your inbox for email",
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast({
          status: "error",
          description: err?.response?.data?.error?.message || err?.message,
        });
      });
  }

  return (
    <>
      <VStack
        w={"full"}
        alignItems={"center"}
        justifyContent={"center"}
        p={[4, 16]}
      >
        <Link href={"/"}>
          <HStack
            px={4}
            py={1}
            pos={"absolute"}
            top={4}
            left={4}
            rounded={"full"}
            bgColor={"blackAlpha.600"}
            backdropFilter={"blur(4px)"}
            _hover={{ boxShadow: "lg" }}
          >
            <BsArrowLeft color="#FFF" fontSize={22} />
            <Text color={"#FFF"}>Home</Text>
          </HStack>
        </Link>
        <Container w={'xs'} alignItems={"center"} justifyContent={"center"} pt={[16, 0]}>
          <Image
            boxSize={"36"}
            src="/logo.png"
            objectFit={"contain"}
            mx={"auto"}
          />
          <Text fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>
            Reset Password
          </Text>
          <br />
          <br />
          {Formik.values.code ? (
            <>
              <FormControl w={["xs", "sm"]}>
                <FormLabel>New Password</FormLabel>
                <Input
                  focusBorderColor="black"
                  placeholder="New Password"
                  variant={"flushed"}
                  name={"password"}
                  type="password"
                  onChange={Formik.handleChange}
                />
              </FormControl>
              <br />
              <FormControl w={["xs", "sm"]}>
                <FormLabel>Password Confirmation</FormLabel>
                <Input
                  focusBorderColor="black"
                  placeholder="Password Confirmation"
                  variant={"flushed"}
                  name={"passwordConfirmation"}
                  onChange={Formik.handleChange}
                />
              </FormControl>
            </>
          ) : (
            <FormControl w={["xs", "sm"]}>
              <FormLabel>Registered Email</FormLabel>
              <Input
                focusBorderColor="black"
                placeholder="Your Email"
                variant={"flushed"}
                name={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          )}
          <br />
          <br />
          {Formik.values.code ? (
            <Button
              w={"full"}
              bgColor={"#333"}
              color={"#FFF"}
              _hover={{ bgColor: "#666" }}
              onClick={Formik.handleSubmit}
              isLoading={isLoading}
            >
              Confirm
            </Button>
          ) : (
            <Button
              w={"full"}
              bgColor={"#333"}
              color={"#FFF"}
              _hover={{ bgColor: "#666" }}
              onClick={sendResetEmail}
              isLoading={isLoading}
            >
              Send Password Reset Email
            </Button>
          )}
        </Container>
      </VStack>
    </>
  );
};

export default page;
