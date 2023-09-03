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
  useToast,
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
} from "@chakra-ui/react";
import { BsArrowLeft, BsEye, BsEyeSlash, BsGoogle } from "react-icons/bs";
import { setIn, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const Toast = useToast({ position: "top-right" });
  const [intent, setIntent] = useState("login");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const Router = useRouter()

  const Formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    onSubmit: (values) => {
      if (!values.identifier || !values.password) {
        Toast({
          status: "warning",
          description: "All fields are mandatory",
        });
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        Router.push("/dashboard?active_side_item=feed")
      }, 1000);
    },
  });

  const RegisterFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      otp: "",
    },
    onSubmit: (values) => {
        onClose()
        Toast({
            status: "success",
            title: "Registration successful!",
            description: "Please login with your credentials"
        })
        setIntent("login")
    },
  });

  function sendOtp() {
    Toast({
      status: "success",
      description: "OTP sent successfully!",
    });
    onOpen();
  }

  function handleRegister() {}

  return (
    <>
      <HStack w={"full"} h={"100vh"}>
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
        {intent == "login" ? (
          <VStack flex={1} h={"full"} p={[4, 16]} justifyContent={"center"}>
            <Text>Welcome Back</Text>
            <Text className="messiri" fontSize={"4xl"}>
              Continue Your Journey
            </Text>

            <VStack pt={16} pb={8} gap={12}>
              <FormControl w={"sm"}>
                <FormLabel>Username</FormLabel>
                <Input
                  focusBorderColor="black"
                  placeholder="Your Username"
                  variant={"flushed"}
                  name={"identifier"}
                  onChange={Formik.handleChange}
                />
              </FormControl>
              <FormControl w={"sm"}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    focusBorderColor="black"
                    placeholder="Your Password"
                    variant={"flushed"}
                    name={"password"}
                    onChange={Formik.handleChange}
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
                    <Checkbox color={"teal.700"}>Remember Me</Checkbox>
                  </HStack>
                  <Link href={"#"}>
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
                  w={"sm"}
                  isLoading={isLoading}
                  colorScheme="blackAlpha"
                  bg={"black"}
                  onClick={Formik.handleSubmit}
                >
                  Login
                </Button>
                <Button
                  w={"sm"}
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

            <Box w={"sm"} padding={".5px"} bg={"teal.100"}></Box>

            <Box
              pt={8}
              onClick={() => setIntent("register")}
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
          <VStack flex={1} h={"full"} p={16} justifyContent={"center"}>
            <Text>Hare Krishna</Text>
            <Text className="messiri" fontSize={"4xl"}>
              Start Your Spiritual Journey
            </Text>

            <VStack pt={12} pb={8} gap={8}>
              <HStack gap={4} w={"sm"}>
                <FormControl>
                  <FormLabel fontSize={"sm"}>First Name</FormLabel>
                  <Input
                    focusBorderColor="black"
                    placeholder="First Name"
                    variant={"flushed"}
                    name={"firstName"}
                    onChange={RegisterFormik.handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize={"sm"}>Last Name</FormLabel>
                  <Input
                    focusBorderColor="black"
                    placeholder="Last Name"
                    variant={"flushed"}
                    name={"lastName"}
                    onChange={RegisterFormik.handleChange}
                  />
                </FormControl>
              </HStack>
              <FormControl w={"sm"}>
                <FormLabel>Email</FormLabel>
                <Input
                  focusBorderColor="black"
                  placeholder="Your Email"
                  variant={"flushed"}
                  name={"identifier"}
                  onChange={RegisterFormik.handleChange}
                />
              </FormControl>
              <FormControl w={"sm"}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    focusBorderColor="black"
                    placeholder="Your Password"
                    variant={"flushed"}
                    name={"password"}
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
                  w={"sm"}
                  isLoading={isLoading}
                  colorScheme="blackAlpha"
                  bg={"black"}
                  onClick={sendOtp}
                >
                  Register
                </Button>
                <Button
                  w={"sm"}
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

            <Box w={"sm"} padding={".5px"} bg={"teal.100"}></Box>

            <Box pt={8} onClick={() => setIntent("login")} cursor={"pointer"}>
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

      <Modal isOpen={isOpen} onClose={onToggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignItems={"center"} justifyContent={"center"}>
            Enter OTP
          </ModalHeader>
          <ModalBody
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text>We have sent an OTP to your email</Text>
            <HStack py={4}>
              <PinInput otp>
                <PinInputField bgColor={"aqua"} />
                <PinInputField bgColor={"aqua"} />
                <PinInputField bgColor={"aqua"} />
                <PinInputField bgColor={"aqua"} />
              </PinInput>
            </HStack>
          </ModalBody>
          <ModalFooter gap={4} justifyContent={"flex-end"}>
            <Button variant={"outline"} borderColor={"#222"} rounded={"full"}>
              Resend OTP
            </Button>
            <Button
              colorScheme="teal"
              bgColor={"#222"}
              rounded={"full"}
              onClick={RegisterFormik.handleSubmit}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
