"use client";
import Loading from "@/app/loading";
import BackendAxios from "@/utils/axios";
import { UserContext } from "@/utils/hooks/useAuth";
import useUpload from "@/utils/hooks/useUpload";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Hide,
  IconButton,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BsImages, BsPencilSquare, BsSendFill } from "react-icons/bs";
import { FaLocationDot, FaUserTag } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
// import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Toast from "@/components/global/Toast";
const Quill = typeof window === 'object' ? require('react-quill') : () => false;

// const QuillNoSSRWrapper = dynamic(async () => {
//   const { default: RQ } = await import("react-quill");
//   return ({ ...props }) => <RQ {...props} />;
// });
// const QuillNoSSRWrapper = dynamic(import('react-quill'), {
//   ssr: false
// })

const CreatePost = () => {
  const { user } = useContext(UserContext);
  const { uploadFiles } = useUpload();
  const fileInputRef = useRef(null);

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 500);
  }, []);

  const Formik = useFormik({
    initialValues: {
      description: "",
      files: null,
    },
    onSubmit: (values) => {
      setIsLoading(true);
      BackendAxios.post(`/api/posts/create`, values)
        .then(async (res) => {
          // if (values.files) {
          //   const filesUploadRes = await uploadFiles({
          //     collection: res.data?.collection,
          //     files: values.files,
          //     entityId: res.data?.id,
          //     field: "media",
          //     path: "postsMedia",
          //   });
          //   console.log(filesUploadRes);
          //   if (filesUploadRes.status > 400) {
          //     Toast({
          //       status: "error",
          //       description: filesUploadRes.message,
          //     });
          //     setIsLoading(false);
          //     return;
          //   }
          // }
          Toast({
            status: "success",
            description: "Post created successfully!",
          });
          Formik.handleReset();
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error while creating post", error);
          setIsLoading(false);
          Toast({
            status: "error",
            description:
              error?.response?.data?.error?.message || error?.message,
          });
        });
    },
  });

  return (
    <>
      {isLoading ? <Loading loadingText={"Publishing post"} /> : null}
      <Box w={"full"} p={3} rounded={4} bgColor={"#FFF"}>
        <HStack
          p={[0, 3]}
          w={"100%"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
        >
          <Avatar
            name={user?.name || user?.username}
            src={user?.avatar}
            size={"sm"}
          />
          {isClient ? (
            <Quill
              theme="snow"
              value={Formik.values.description}
              onChange={(value) => Formik.setFieldValue("description", value)}
              style={{ height: "120px", width: "100%" }}
              modules={{ toolbar: false }}
              placeholder={`Share your thoughts, ${
                user?.name ? user?.name?.split(" ")[0] : user?.username
              }`}
            />
          ) : null}
        </HStack>
        <HStack py={2} pb={0} gap={6} w={"full"} overflowX={"scroll"}>
          {/* <>
            <HStack
              rounded={"full"}
              gap={0}
              bgColor={"gray.100"}
              cursor={"pointer"}
              onClick={() => fileInputRef.current.click()}
            >
              <IconButton
                size={"sm"}
                color={"#FFF"}
                rounded={"full"}
                icon={<BsImages />}
                bgColor={"purple.500"}
              />
              <Text w={["28", "auto"]} pr={3} pl={2} fontSize={"xs"}>
                Insert Media
              </Text>
            </HStack>
            {Formik.values.files?.length ? (
              <Text fontSize={'xs'}>{Formik.values.files?.length} files selected</Text>
            ) : null}
          </> */}

          <Input
            name="files"
            type="file"
            onChange={(e) => Formik.setFieldValue("files", e.target.files)}
            multiple
            display={"none"}
            ref={fileInputRef}
          />

          {/* <HStack rounded={"full"} gap={0} bgColor={"gray.100"}>
            <IconButton
              size={"sm"}
              color={"#FFF"}
              rounded={"full"}
              icon={<FaLocationDot />}
              bgColor={"pink.400"}
            />
            <Text w={['28', 'auto']} pr={3} pl={2} fontSize={"xs"}>
              Share Location
            </Text>
          </HStack>

          <HStack rounded={"full"} gap={0} bgColor={"gray.100"}>
            <IconButton
              size={"sm"}
              color={"#FFF"}
              rounded={"full"}
              icon={<FaUserTag />}
              bgColor={"yellow.500"}
            />
              <Text w={['28', 'auto']} pr={3} pl={2} fontSize={"xs"}>Tag People</Text>
          </HStack> */}
        </HStack>
        <br />
        <HStack p={2} justifyContent={"flex-end"}>
          <Button
            colorScheme="pink"
            bgColor={"fuchsia"}
            rightIcon={<IoSend />}
            rounded={"full"}
            size={["sm", "md"]}
            boxShadow={["sm", "md"]}
            onClick={Formik.handleSubmit}
          >
            Share
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default CreatePost;
