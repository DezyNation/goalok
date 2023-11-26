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
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsAlarm, BsCheckLg, BsSearch } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

const CreateSession = () => {
  const { logout, user } = useAuth();
  const Toast = useToast();
  const { push } = useRouter();
  const { handleError } = useApiHandler();
  const { onCopy, setValue, hasCopied } = useClipboard("");

  const now = new Date();
  const [isLoading, setIsLoading] = useState(false);

  const [startTime, setStartTime] = useState(now);

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
      if (!values.preacher) {
        Toast({
          description: "Can't create session without a preacher",
        });
      }
      setIsLoading(true);
      BackendAxios.post(`/api/sessions/create`, values)
        .then((res) => {
          setIsLoading(false);
          Toast({
            description: `Session ${values.intent}d successfully!`,
          });
          if (values.intent == "create") {
            push(`/dashboard/sessions/join/${values.slug}`);
          } else {
            Toast({
              status: "success",
              title: "Session created successfully!",
              description: "Please copy the link",
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          handleError(err);
        });
    },
  });

  useEffect(() => {
    Formik.setFieldValue(
      "slug",
      `${Formik.values.title?.toLowerCase().replace(/ /g, "-")}`
    );
  }, [Formik.values.title]);

  useEffect(() => {
    if (startTime) {
      Formik.setFieldValue("startAt", new Date(startTime).toISOString());
    }
  }, [startTime]);

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
              <Text fontSize={"xs"} mb={4}>
                Click to copy your session link
              </Text>
              <Button
                size={"xs"}
                onClick={onCopy}
                colorScheme={hasCopied ? "whatsapp" : "gray"}
              >
                Copy Meeting Link
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
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormControl>
            {/* <FormControl flex={[1, 2]}>
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
            </FormControl> */}
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
            Go Live
          </Button>
        </HStack>
      </Box>

      <Modal></Modal>
    </>
  );
};

export default CreateSession;
