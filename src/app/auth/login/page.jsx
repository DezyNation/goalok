"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Checkbox,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  PinInput,
  PinInputField,
  Show,
  useToast,
} from "@chakra-ui/react";
import { BsArrowLeft, BsEye, BsEyeSlash, BsGoogle } from "react-icons/bs";
import { setIn, useFormik } from "formik";
import Link from "next/link";
import Lottie from "lottie-react";
import email from "../../../../public/lottie/email.json";
import success from "../../../../public/lottie/success.json";
import { useRouter, useSearchParams } from "next/navigation";
import useAuth from "@/utils/hooks/useAuth";
import { useJwt } from "react-jwt";

const Login = () => {
  const searchParams = useSearchParams();
  const emailVerified = searchParams.get("email_verified");

  const { token } = useAuth();
  const { isExpired } = useJwt(token || "");
  const { login, register } = useAuth();
  const Toast = useToast();

  const [intent, setIntent] = useState("login");
  const [loginIntent, setLoginIntent] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const Router = useRouter();

  useEffect(() => {
    try {
      if (token && !isExpired) {
        Router.push("/dashboard", undefined, { shallow: true });
      }
    } catch (error) {
      console.log("Error while decoding token");
    }
  }, [token]);

  useEffect(() => {
    if (emailVerified == "true") {
      onToggle();
    }
  }, [emailVerified]);

  const Formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
      remember: false,
    },
    onSubmit: async (values) => {
      if (!values.identifier || !values.password) {
        Toast({
          status: "warning",
          description: "All fields are mandatory",
        });
        return;
      }
      setIsLoading(true);
      const res = await login({
        identifier: values.identifier,
        password: values.password,
        remember: values.remember,
      });
      setIsLoading(false);
      if (res.status == 200) Router.push("/dashboard");
      if (res.status != 200)
        Toast({
          status: "error",
          description: res?.message,
          title: "Error while logging you in!",
        });
    },
  });

  const RegisterFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await register({
          email: values.email,
          password: values.password,
          name: values.username,
        });
        setIsLoading(false);
        setIntent("login");
        RegisterFormik.handleReset();
        onToggle();
      } catch (err) {
        Toast({
          status: "error",
          description: err?.message,
        });
      }
    },
  });

  return (
    <>
      <HStack w={"full"} h={"100vh"} pos={"relative"}>
        <Link
          href={"/"}
          style={{ position: "absolute", top: "8px", left: "8px", zIndex: 999 }}
        >
          <HStack
            px={4}
            py={1}
            rounded={"full"}
            bgColor={"blackAlpha.600"}
            backdropFilter={"blur(4px)"}
            _hover={{ boxShadow: "lg" }}
          >
            <BsArrowLeft color="#FFF" fontSize={22} />
            <Text color={"#FFF"}>Home</Text>
          </HStack>
        </Link>
        <Show above="md">
          <Box
            flex={1}
            h={"full"}
            bgImage={
              "https://i.pinimg.com/736x/6d/a5/19/6da51985c25891ba968a0a3b6f663ab7.jpg"
            }
            bgSize={"cover"}
            bgRepeat={"no-repeat"}
            pos={"relative"}
          >
            <VStack
              w={"full"}
              h={"full"}
              // bg={'rgba(6,15,190,0.5)'}
              bg={"rgba(0,0,0,0.55)"}
              p={16}
              justifyContent={"center"}
            >
              <Text className="messiri" fontSize={"2xl"} color={"#FFF"}>
                "Books are the basis; purity is the force; preaching is the
                essence; utility is the principle."
              </Text>
              <HStack w={"full"} justifyContent={"flex-end"} py={12}>
                <Box>
                  <Text color={"#FFF"} fontWeight={"semibold"} fontSize={"xl"}>
                    A.C. Bhaktivedanta Swami
                  </Text>
                  <Text color={"#FFF"} fontSize={"md"}>
                    Founder Acharya, <br />
                    International Society for Krishna Consciousness
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </Box>
        </Show>
        {intent == "login" && loginIntent ? (
          <VStack
            flex={1}
            h={["auto", "full"]}
            p={[4, 16]}
            pt={[48, 16]}
            pb={[16]}
            justifyContent={"center"}
          >
            <Text>Welcome Back</Text>
            <Text
              className="messiri"
              fontSize={["3xl", "4xl"]}
              textAlign={"center"}
            >
              Continue Your Journey
            </Text>

            <VStack pt={16} pb={8} gap={12}>
              <FormControl w={["xs", "sm"]}>
                <FormLabel>Username</FormLabel>
                <Input
                  focusBorderColor="black"
                  placeholder="Your Username"
                  variant={"flushed"}
                  name={"identifier"}
                  value={Formik.values.identifier}
                  onChange={Formik.handleChange}
                />
              </FormControl>
              <FormControl w={["xs", "sm"]}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    focusBorderColor="black"
                    placeholder="Your Password"
                    variant={"flushed"}
                    name={"password"}
                    onChange={Formik.handleChange}
                    value={Formik.values.password}
                    type={passwordVisible ? "text" : "password"}
                  />
                  <InputRightElement
                    children={passwordVisible ? <BsEyeSlash /> : <BsEye />}
                    cursor={"pointer"}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                </InputGroup>
                <HStack py={4} justifyContent={"space-between"}>
                  <HStack>
                    <Checkbox
                      color={"teal.700"}
                      isChecked={Formik.values.remember}
                      onChange={(e) =>
                        Formik.setFieldValue("remember", e.target.checked)
                      }
                    >
                      Remember Me
                    </Checkbox>
                  </HStack>
                  <Link href={"/auth/reset-password"}>
                    <Text
                      fontSize={"xs"}
                      fontWeight={"semibold"}
                      color={"#AA77FF"}
                    >
                      Forgot Password
                    </Text>
                  </Link>
                </HStack>
              </FormControl>
              <VStack gap={4}>
                <Button
                  w={["xs", "sm"]}
                  isLoading={isLoading}
                  colorScheme="blackAlpha"
                  bg={"black"}
                  onClick={Formik.handleSubmit}
                >
                  Login
                </Button>
                <Button
                  w={["xs", "sm"]}
                  isLoading={isLoading}
                  border={"1px"}
                  bg={"azure"}
                  borderColor={"aqua"}
                  onClick={Formik.handleSubmit}
                  leftIcon={<BsGoogle />}
                  iconSpacing={6}
                >
                  Continue with Google
                </Button>
              </VStack>
            </VStack>

            <Box w={["xs", "sm"]} padding={".5px"} bg={"teal.100"}></Box>

            <Box
              pt={8}
              onClick={() => {
                setIntent("register");
                setLoginIntent(false);
              }}
              cursor={"pointer"}
            >
              <Text
                color={"teal.500"}
                fontSize={"12"}
                textAlign={"center"}
                pb={2}
              >
                Or
              </Text>
              <Text fontWeight={"semibold"} color={"black"}>
                Register a New Account
              </Text>
            </Box>
          </VStack>
        ) : (
          <VStack
            flex={1}
            h={["auto", "full"]}
            p={[4, 16]}
            pt={[48, 16]}
            pb={[16]}
            justifyContent={"center"}
          >
            <Text>|| Hare Krishna ||</Text>
            <Text
              className="messiri"
              fontSize={["3xl", "4xl"]}
              textAlign={"center"}
            >
              Start Your Spiritual Journey
            </Text>

            <VStack pt={12} pb={8} gap={8}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  focusBorderColor="black"
                  placeholder="Username"
                  variant={"flushed"}
                  name={"username"}
                  value={RegisterFormik.values.username}
                  onChange={RegisterFormik.handleChange}
                />
              </FormControl>
              <FormControl w={["xs", "sm"]}>
                <FormLabel>Email</FormLabel>
                <Input
                  focusBorderColor="black"
                  placeholder="Your Email"
                  variant={"flushed"}
                  name={"email"}
                  value={RegisterFormik.values.email}
                  onChange={RegisterFormik.handleChange}
                />
              </FormControl>
              <FormControl w={["xs", "sm"]}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    focusBorderColor="black"
                    placeholder="Your Password"
                    variant={"flushed"}
                    name={"password"}
                    value={RegisterFormik.values.password}
                    onChange={RegisterFormik.handleChange}
                    type={passwordVisible ? "text" : "password"}
                  />
                  <InputRightElement
                    children={passwordVisible ? <BsEyeSlash /> : <BsEye />}
                    cursor={"pointer"}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                </InputGroup>
              </FormControl>
              <VStack gap={4}>
                <Button
                  w={["xs", "sm"]}
                  isLoading={isLoading}
                  colorScheme="blackAlpha"
                  bg={"black"}
                  onClick={RegisterFormik.handleSubmit}
                >
                  Register
                </Button>
                <Button
                  w={["xs", "sm"]}
                  isLoading={isLoading}
                  border={"1px"}
                  bg={"azure"}
                  borderColor={"aqua"}
                  leftIcon={<BsGoogle />}
                  iconSpacing={6}
                >
                  Register with Google
                </Button>
              </VStack>
            </VStack>

            <Box w={["xs", "sm"]} padding={".5px"} bg={"teal.100"}></Box>

            <Box
              pt={8}
              onClick={() => {
                setIntent("login");
                setLoginIntent(true);
              }}
              cursor={"pointer"}
            >
              <Text
                color={"teal.500"}
                fontSize={"12"}
                textAlign={"center"}
                pb={2}
              >
                Or
              </Text>
              <Text fontWeight={"semibold"} color={"black"}>
                Login To Your Account
              </Text>
            </Box>
          </VStack>
        )}
      </HStack>

      {/* Email confirmation animation modal */}
      <Modal isOpen={isOpen} onClose={onToggle} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            alignItems={"center"}
            justifyContent={"center"}
            textAlign={"center"}
          >
            {emailVerified == "true"
              ? "Haribol! Your email was verified successfully."
              : "Verification Mail Sent!"}
          </ModalHeader>
          <ModalBody
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {emailVerified == "true" ? (
              <Text>You can now login to your account</Text>
            ) : (
              <>
                <Text>We have sent a verification email to you!</Text>
                <Text>Please verify it within 3 hours</Text>
              </>
            )}
            <HStack py={4}>
              <Lottie
                animationData={emailVerified == "true" ? success : email}
                loop
                autoPlay
                width={48}
                height={48}
              />
            </HStack>
          </ModalBody>
          <ModalFooter gap={4} justifyContent={"flex-end"}>
            <Button
              colorScheme="teal"
              bgColor={"#222"}
              rounded={"full"}
              onClick={onClose}
            >
              {emailVerified == "true" ? "Login Now!" : "Okay!"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
