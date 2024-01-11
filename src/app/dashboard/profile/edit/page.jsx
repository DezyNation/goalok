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
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState, useRef } from "react";
import { BsCamera, BsCheck } from "react-icons/bs";
import BlankSpacer from "@/components/global/BlankSpacer";
import { UserContext } from "@/utils/hooks/useAuth";
import dateOptions from "@/utils/date";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import BackendAxios from "../../../../utils/axios";
import { Select } from "chakra-react-select";
import { useFormik } from "formik";
import { COUNTRIES, STATES } from "../../../../utils/constants";
import useApiHandler from "../../../../utils/hooks/useApiHandler";
import useAuth from "../../../../utils/hooks/useAuth";

const page = () => {
  const Toast = useToast();
  const { uploadAndAttachMedia, handleError } = useApiHandler();
  const { fetchUser, user } = useAuth();

  const [dob, setDob] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [kcExperience, setKcExperience] = useState(new Date());
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const avatarInputRef = useRef(null);

  const handleClick = () => {
    avatarInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Read the selected file as a data URL
      setAvatar(selectedFile);
      const reader = new FileReader();

      reader.onloadend = () => {
        // Set the data URL as the image preview
        setAvatarPreview(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setKcExperience(
      user?.kcExperience ? new Date(user?.kcExperience) : new Date()
    );
    setDob(user?.dob ? new Date(user?.dob) : new Date());
    Formik.setFieldValue("username", user?.username);
    Formik.setFieldValue("name", user?.name);
    Formik.setFieldValue("spiritualName", user?.spiritualName);
    Formik.setFieldValue("country", user?.country);
    Formik.setFieldValue("state", user?.state);
    Formik.setFieldValue("zipCode", user?.zipCode);
    Formik.setFieldValue("gender", user?.gender);
    Formik.setFieldValue("about", user?.about);
    Formik.setFieldValue("qualification", user?.qualification);
  }, [user?.id]);

  const Formik = useFormik({
    initialValues: {
      name: user?.name,
      username: user?.username,
      spiritualName: user?.spiritualName,
      kcExperience: kcExperience,
      country: user?.country,
      state: user?.state,
      zipCode: user?.zipCode,
      dob: dob,
      telegramId: user?.telegramId,
      gender: user?.gender,
      qualification: user?.qualification,
      about: user?.about,
    },
    onSubmit: async (values) => {
      setLoading(true);
      if (avatar) {
        console.log(avatar);
        // return;
        await uploadAndAttachMedia({
          entryId: user?.id,
          field: "avatar",
          files: [avatar],
          modelName: "plugin::users-permissions.user",
        });
      }
      BackendAxios.put(`/api/users/update/me`, values)
        .then((res) => {
          setLoading(false);
          Toast({
            status: "success",
            description: "Your profile was updated successfully!",
          });
        })
        .catch((err) => {
          setLoading(false);
          handleError(err, "Error while updating your profile");
        });
    },
  });

  return (
    <>
      <input
        type="file"
        ref={avatarInputRef}
        onChange={handleFileChange}
        accept="image/"
        style={{ display: "none" }}
      />
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
                leftIcon={<BsCheck size={20} />}
                rounded={"full"}
                size={"sm"}
                onClick={Formik.handleSubmit}
                isLoading={loading}
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
              width={["full", "100%"]}
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
                  <Image
                    src={avatarPreview ?? user?.avatar}
                    boxSize={"inherit"}
                    objectFit={"cover"}
                  />
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
                    onClick={handleClick}
                  >
                    <BsCamera />
                    <Text fontSize={"xs"}>
                      Click to {user?.avatar ? "Change" : "Upload"}
                    </Text>
                  </VStack>
                </Box>
                {avatarPreview ? (
                  <Button
                    variant={"ghost"}
                    colorScheme="red"
                    size={"sm"}
                    rounded={"full"}
                    onClick={() => {
                      setAvatarPreview(null);
                      setAvatar(null);
                    }}
                  >
                    Remove
                  </Button>
                ) : null}
              </VStack>
              <br />
              <Text
                fontSize={"xl"}
                color={"gray.600"}
                fontWeight={"semibold"}
                className="messiri"
              >
                Basic Details
              </Text>
              <hr />
              <br />
              <Stack
                py={6}
                direction={["column", "row"]}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={[8, 6]}
              >
                <FormControl w={["full", "sm"]}>
                  <FormLabel fontSize={"sm"}>Username</FormLabel>
                  <Input
                    variant={"flushed"}
                    name="username"
                    value={Formik.values.username}
                    onChange={Formik.handleChange}
                    placeholder="Your username for authentication"
                  />
                </FormControl>
                <FormControl w={["full", "sm"]}>
                  <FormLabel fontSize={"sm"}>Karmi Name</FormLabel>
                  <Input
                    variant={"flushed"}
                    name="name"
                    value={Formik.values.name}
                    onChange={Formik.handleChange}
                    placeholder="Your material name"
                  />
                </FormControl>
                <FormControl w={["full", "sm"]}>
                  <FormLabel fontSize={"sm"}>Spiritual Name</FormLabel>
                  <Input
                    variant={"flushed"}
                    name="spiritualName"
                    value={Formik.values.spiritualName}
                    onChange={Formik.handleChange}
                    placeholder="Your spiritual name"
                  />
                </FormControl>
              </Stack>
              <Stack
                py={6}
                direction={["column", "row"]}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={[8, 6]}
              >
                <FormControl w={["full", "sm"]}>
                  <FormLabel fontSize={"sm"}>Gender</FormLabel>
                  <HStack gap={6} pt={4}>
                    <Box
                      w={20}
                      h={20}
                      rounded={"full"}
                      border={"0.5px solid"}
                      borderColor={"gray.200"}
                      boxShadow={"base"}
                      transition={"all .3s ease"}
                      bgColor={
                        Formik.values.gender == "male" ? "yellow.400" : "#FFF"
                      }
                      _hover={{
                        boxShadow: "lg",
                        bgColor:
                          Formik.values.gender == "male"
                            ? "yellow.400"
                            : "yellow.100",
                      }}
                      display={"grid"}
                      placeContent={"center"}
                      cursor={"pointer"}
                      onClick={() => Formik.setFieldValue("gender", "male")}
                    >
                      <Image w={10} src="/boy.png" />
                    </Box>
                    <Box
                      w={20}
                      h={20}
                      rounded={"full"}
                      border={"0.5px solid"}
                      borderColor={"gray.200"}
                      boxShadow={"base"}
                      transition={"all .3s ease"}
                      bgColor={
                        Formik.values.gender == "female" ? "yellow.400" : "#FFF"
                      }
                      _hover={{
                        boxShadow: "lg",
                        bgColor:
                          Formik.values.gender == "female"
                            ? "yellow.400"
                            : "yellow.100",
                      }}
                      display={"grid"}
                      placeContent={"center"}
                      cursor={"pointer"}
                      onClick={() => Formik.setFieldValue("gender", "female")}
                    >
                      <Image w={10} src="/girl.png" />
                    </Box>
                  </HStack>
                </FormControl>
                <FormControl w={["full", "sm"]}>
                  <FormLabel fontSize={"sm"}>Date of Birth</FormLabel>
                  <SingleDatepicker
                    name="dob"
                    date={dob}
                    onDateChange={setDob}
                  />
                </FormControl>
                <FormControl w={["full", "sm"]}>
                  <FormLabel fontSize={"sm"}>
                    When did join Krishna Consciousness?
                  </FormLabel>
                  <SingleDatepicker
                    name="kcExperience"
                    date={kcExperience}
                    onDateChange={setKcExperience}
                  />
                </FormControl>
              </Stack>
              <br />
              <BlankSpacer height={16} />
              <br />
              <Text
                fontSize={"xl"}
                color={"gray.600"}
                fontWeight={"semibold"}
                className="messiri"
              >
                About Yourself
              </Text>
              <br />
              <hr />
              <Stack
                py={6}
                direction={["column", "row"]}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={[8, 6]}
              >
                <FormControl w={["full", "sm"]}>
                  <FormLabel fontSize={"sm"}>Qualification</FormLabel>
                  <Input
                    variant={"flushed"}
                    name="qualification"
                    value={Formik.values.qualification}
                    onChange={Formik.handleChange}
                    placeholder="Your material qualification"
                  />
                </FormControl>
              </Stack>
              <Stack
                py={6}
                direction={["column", "row"]}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={[8, 6]}
              >
                <FormControl w={["full", "full"]}>
                  <FormLabel fontSize={"sm"}>Bio</FormLabel>
                  <Textarea
                    w={"full"}
                    h={24}
                    value={Formik.values.about}
                    onChange={(e) =>
                      Formik.setFieldValue("about", e.target.value)
                    }
                    resize={"none"}
                    placeholder="Tell us something about yourself..."
                  />
                </FormControl>
              </Stack>
              <br />
              <BlankSpacer height={16} />
              <Text
                fontSize={"xl"}
                color={"gray.600"}
                fontWeight={"semibold"}
                className="messiri"
              >
                Residential Details
              </Text>
              <hr />
              <br />
              <Stack
                py={6}
                direction={["column", "row"]}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={[8, 6]}
              >
                <FormControl w={["full", "sm"]}>
                  <FormLabel fontSize={"sm"}>Country</FormLabel>
                  <Select
                    placeholder="Please select your country"
                    options={COUNTRIES}
                    value={COUNTRIES.find(
                      (data) => data?.value == Formik.values.country
                    )}
                    onChange={(data) =>
                      Formik.setFieldValue("country", data?.value)
                    }
                  />
                </FormControl>
                <FormControl w={["full", "sm"]}>
                  <FormLabel fontSize={"sm"}>State</FormLabel>
                  <Select
                    placeholder="Please select your state"
                    options={STATES}
                    value={STATES.find(
                      (data) => data?.value == Formik.values.state
                    )}
                    onChange={(data) =>
                      Formik.setFieldValue("state", data?.value)
                    }
                  />
                </FormControl>
                <FormControl w={["full", "sm"]}>
                  <FormLabel fontSize={"sm"}>ZIP Code</FormLabel>
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
              <Text
                fontSize={"xl"}
                color={"gray.600"}
                fontWeight={"semibold"}
                className="messiri"
              >
                Contact Details
              </Text>
              <hr />
              <br />
              <Stack
                py={6}
                direction={["column", "row"]}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={[8, 6]}
              >
                <FormControl w={["full", "sm"]}>
                  <FormLabel fontSize={"sm"}>Email</FormLabel>
                  <Input
                    variant={"flushed"}
                    name="email"
                    value={user?.email}
                    placeholder="Your Email"
                    isDisabled
                  />
                </FormControl>
                <FormControl w={["full", "sm"]}>
                  <FormLabel fontSize={"sm"}>Phone No.</FormLabel>
                  <Input
                    variant={"flushed"}
                    name="phone"
                    value={user?.phone}
                    onChange={Formik.handleChange}
                    placeholder="Your Phone No."
                    isDisabled
                  />
                </FormControl>
                <FormControl w={["full", "sm"]}>
                  <FormLabel fontSize={"sm"}>Telegram ID</FormLabel>
                  <InputGroup>
                    <InputLeftElement children={"@"} />
                    <Input
                      variant={"flushed"}
                      name="telegramId"
                      value={user?.telegramId}
                      onChange={Formik.handleChange}
                      placeholder="Your Telegram ID"
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
              <HStack pt={8} justifyContent={"flex-end"}>
                <Button
                  colorScheme="teal"
                  bgColor={"#333"}
                  rounded={"full"}
                  onClick={Formik.handleSubmit}
                  isLoading={loading}
                >
                  Save Details
                </Button>
              </HStack>
            </Box>
          </Stack>
        </Box>
        <BlankSpacer height={[24, 16]} />
      </Box>
    </>
  );
};

export default page;
