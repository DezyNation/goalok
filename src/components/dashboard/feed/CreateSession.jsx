"use client";
import Loading from "@/app/loading";
import BackendAxios from "@/utils/axios";
import useApiHandler from "@/utils/hooks/useApiHandler";
import useAuth from "@/utils/hooks/useAuth";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  Select,
  Switch,
  Text,
  Textarea,
  VStack,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { BsAlarm, BsCheckLg, BsSearch } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

const CreateSession = () => {
  const Toast = useToast({ position: "top-right" });
  const { logout, user } = useAuth();
  const { handleError } = useApiHandler();
  const { onCopy, setValue, hasCopied } = useClipboard("");

  const [isLoading, setIsLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [preachers, setPreachers] = useState([]);

  useEffect(() => {
    if (user?.role == "Admin") {
      Formik.setFieldValue("coHost", user?.id);
    }
    if (user?.role == "Preacher") {
      Formik.setFieldValue("preacher", user?.id);
    }
  }, [user]);

  const Formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      // course: "1",
      coHost: user?.role == "Admin" ? user?.id : "",
      preacher: user?.role == "Preacher" ? user?.id : "",
      slug: ``,
      qnaStatus: true,
      donationStatus: true,
      audioStatus: false,
      videoStatus: false,
      startAt: "",
      duration: "",
      language: "English/Hindi",
      intent: "create",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      BackendAxios.post(`/api/sessions/create`, values)
        .then((res) => {
          setIsLoading(false);
          Toast({
            description: `Session ${values.intent}d successfully!`,
          });
          if(values.intent == 'create'){
            window.location.assign(`/dashboard/sessions/join/${Formik.values.slug}`)
          }
        })
        .catch((err) => {
          setIsLoading(false);
          handleError(err);
        });
    },
  });

  useEffect(() => {
    if (user?.role == "Preacher") {
      fetchAdmins();
    }
    if (user?.role == "Admin") {
      fetchPreachers();
    }
  }, [user]);

  useEffect(() => {
    Formik.setFieldValue(
      "slug",
      `${Formik.values.preacher}-${Formik.values.title
        ?.toLowerCase()
        .replace(/ /g, "-")}`
    );
  }, [Formik.values.preacher,  Formik.values.title]);

  const fetchAdmins = () => {
    BackendAxios.get(`/api/iskconinc/admin`)
      .then((res) => {
        if (res.data.length) setAdmins(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const fetchPreachers = () => {
    BackendAxios.get(`/api/iskconinc/preacher`)
      .then((res) => {
        if (res.data.length) setPreachers(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  useEffect(() => {
    setValue(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard/sessions/join/${Formik.values.slug}`
    );
  }, [Formik.values.slug]);

  return (
    <>
      {isLoading ? <Loading /> : null}
      <Box w={"full"} p={[3, 8]} rounded={4} bgColor={"#FFF"}>
        <VStack w={"full"} gap={6}>
          <FormControl isRequired>
            <FormLabel fontSize={["12", "sm"]} mb={0}>
              Session Title
            </FormLabel>
            <Input
              variant={"flushed"}
              fontSize={["12", "sm"]}
              name="title"
              onChange={Formik.handleChange}
            />
          </FormControl>
          {Formik.values.title ? (
            <Box py={2}>
              <Text fontSize={"xs"}>Your session link will be</Text>
              <Button
                size={"xs"}
                onClick={onCopy}
                colorScheme={hasCopied ? "whatsapp" : "gray"}
              >
                {process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard/sessions/join/
                {Formik.values.slug}
              </Button>
              {hasCopied ? (
                <Text
                  color={"whatsapp.500"}
                  fontSize={"xs"}
                  fontWeight={"medium"}
                >
                  Copied to clipboard!
                </Text>
              ) : null}
            </Box>
          ) : null}
          <FormControl>
            <FormLabel fontSize={["12", "sm"]} mb={0}>
              Description
            </FormLabel>
            <Textarea
              variant={"flushed"}
              fontSize={["12", "sm"]}
              name="description"
              onChange={Formik.handleChange}
              resize={"vertical"}
            />
          </FormControl>
          {user?.role == "Preacher" ? (
            <FormControl>
              <FormLabel fontSize={["12", "sm"]} mb={0}>
                Co-Host
              </FormLabel>
              <Select
                variant={"flushed"}
                fontSize={["12", "sm"]}
                name="coHost"
                onChange={Formik.handleChange}
                placeholder="Please select"
              >
                {admins?.map((user, key) => (
                  <option value={user?.id} key={key}>
                    {user?.name} ({user?.username})
                  </option>
                ))}
              </Select>
            </FormControl>
          ) : user?.role == "Admin" ? (
            <FormControl isRequired>
              <FormLabel fontSize={["12", "sm"]} mb={0}>
                Preacher
              </FormLabel>
              <Select
                variant={"flushed"}
                fontSize={["12", "sm"]}
                name="preacher"
                onChange={Formik.handleChange}
                placeholder="Please select"
              >
                {preachers?.map((user, key) => (
                  <option value={user?.id} key={key}>
                    {user?.name} ({user?.username})
                  </option>
                ))}
              </Select>
            </FormControl>
          ) : null}
          <br />
          <Text fontSize={"sm"} py={4} w={"full"} textAlign={"left"}>
            Manage Audience Permissions
          </Text>
          <HStack w={"full"} justifyContent={"space-between"}>
            <FormControl>
              <HStack justifyContent={"flex-start"}>
                <FormLabel fontSize={["12", "sm"]} mb={0}>
                  QnA
                </FormLabel>
                <Switch
                  size={["sm", "md"]}
                  onChange={(e) =>
                    Formik.setFieldValue("qnaStatus", e.target.checked)
                  }
                  defaultChecked={Formik.values.qnaStatus}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack justifyContent={"flex-start"}>
                <FormLabel fontSize={["12", "sm"]} mb={0}>
                  Donations
                </FormLabel>
                <Switch
                  size={["sm", "md"]}
                  onChange={(e) =>
                    Formik.setFieldValue("donationStatus", e.target.checked)
                  }
                  defaultChecked={Formik.values.donationStatus}
                />
              </HStack>
            </FormControl>
          </HStack>

          <HStack w={"full"} justifyContent={"space-between"}>
            <FormControl>
              <HStack justifyContent={"flex-start"}>
                <FormLabel fontSize={["12", "sm"]} mb={0}>
                  Audio
                </FormLabel>
                <Switch
                  size={["sm", "md"]}
                  onChange={(e) =>
                    Formik.setFieldValue("audioStatus", e.target.checked)
                  }
                  defaultChecked={Formik.values.audioStatus}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack justifyContent={"flex-start"}>
                <FormLabel fontSize={["12", "sm"]} mb={0}>
                  Video
                </FormLabel>
                <Switch
                  size={["sm", "md"]}
                  onChange={(e) =>
                    Formik.setFieldValue("videoStatus", e.target.checked)
                  }
                  defaultChecked={Formik.values.videoStatus}
                />
              </HStack>
            </FormControl>
          </HStack>
          <br />
          <HStack w={"full"} gap={[4, 16]}>
            <FormControl flex={[3, 2]}>
              <FormLabel fontSize={["12", "sm"]} mb={0}>
                Start At
              </FormLabel>
              <Input
                variant={"flushed"}
                fontSize={["12", "sm"]}
                name="startAt"
                type="datetime-local"
                onChange={Formik.handleChange}
              />
            </FormControl>
            <FormControl flex={[1, 2]}>
              <FormLabel fontSize={["12", "sm"]} mb={0}>
                Duration (hrs.)
              </FormLabel>
              <Input
                variant={"flushed"}
                fontSize={["12", "sm"]}
                name="duration"
                type="number"
                max={6}
                onChange={Formik.handleChange}
              />
            </FormControl>
          </HStack>
        </VStack>
        <br />
        <HStack justifyContent={"flex-end"} gap={6}>
          <Button
            color="#333"
            variant="outline"
            borderColor="#333"
            rightIcon={<BsAlarm size={16} />}
            rounded={"full"}
            size={["sm", "md"]}
            boxShadow={["sm", "md"]}
            onClick={() => {
              Formik.setFieldValue("intent", "schedule");
              Formik.handleSubmit();
            }}
          >
            Schedule
          </Button>
          <Button
            colorScheme="pink"
            bgColor={"fuchsia"}
            rightIcon={<BsCheckLg size={20} />}
            rounded={"full"}
            size={["sm", "md"]}
            boxShadow={["sm", "md"]}
            onClick={() => {
              Formik.setFieldValue("intent", "create");
              Formik.handleSubmit();
            }}
          >
            Start Now
          </Button>
        </HStack>
      </Box>

      <Modal></Modal>
    </>
  );
};

export default CreateSession;
