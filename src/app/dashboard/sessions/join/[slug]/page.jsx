"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import QnaButton from "@/components/dashboard/session/QnaBox";
import BackendAxios, { DefaultAxios } from "@/utils/axios";
import { UserContext } from "@/utils/hooks/useAuth";
import useApiHandler from "@/utils/hooks/useApiHandler";
import parse from "html-react-parser";

const page = ({ params }) => {
  const { slug } = params;

  const [sessionInfo, setSessionInfo] = useState(null);
  const [hostedUrl, setHostedUrl] = useState("");
  const [myName, setMyName] = useState("");

  const { handleError } = useApiHandler();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && slug) {
      fetchSessionInfo();
    }
  }, [user, slug]);

  async function getHostedLink() {
    await DefaultAxios.post(
      `${process.env.NEXT_PUBLIC_CONFERENCE_BASE_URL}/api/v1/join`,
      {
        room: slug,
        password: "false",
        name: user?.username,
        audio: "false",
        video: "false",
        screen: "false",
        notify: "true",
      },
      {
        headers: {
          authorization: "mirotalksfu_default_secret",
        },
      }
    )
      .then((res) => {
        setHostedUrl(res.data?.join);
      })
      .catch((err) => {
        handleError(err);
      });
  }

  function fetchSessionInfo() {
    BackendAxios.get(`/api/sessions/info/${slug}`)
      .then(async (res) => {
        if (!res.data.id) {
          window.location.replace(`/dashboard?active_side_item=dashboard`);
          return;
        }
        setSessionInfo(() => res.data);
        if (res.data?.preacher?.id == user?.id) {
          await getHostedLink();
        }
      })
      .catch((err) => {
        if (err?.response?.status == 404) {
          window.location.replace(`/dashboard?active_side_item=dashboard`);
          return;
        }
        handleError(err);
      });
  }

  return (
    <>
      <Box
        pos={"relative"}
        h={"92vh"}
        overflow={"scroll"}
        className="hide-scrollbar"
      >
        <Stack
          direction={["column", "row"]}
          alignItems={"flex-start"}
          gap={8}
          overflow={"scroll"}
        >
          <Box flex={3}>
            <Text
              textTransform={"capitalize"}
              className="messiri"
              fontSize={["3xl", "4xl"]}
            >
              {sessionInfo?.title}
            </Text>
            <Text fontWeight={"semibold"}>
              By{" "}
              <Link
                href={`/dashboard/profile?user_id=${sessionInfo?.preacher?.id}`}
                style={{ color: "#EBB02D" }}
                target="_blank"
              >
                {sessionInfo?.preacher?.name
                  ? sessionInfo?.preacher?.name?.replace("Das", "Prabhu")
                  : sessionInfo?.preacher?.username}
              </Link>
            </Text>
            <br />
            <Box
              rounded={16}
              w={"full"}
              height={"95vh"}
              overflow={"hidden"}
              border={"1px"}
            >
              <iframe
                allow={`${
                  sessionInfo?.videoStatus ||
                  sessionInfo?.coHost?.id == user?.id ||
                  sessionInfo?.preacher?.id == user?.id
                    ? "camera;"
                    : ""
                } ${
                  sessionInfo?.audioStatus ||
                  sessionInfo?.coHost?.id == user?.id ||
                  sessionInfo?.preacher?.id == user?.id
                    ? "microphone;"
                    : ""
                } ${
                  sessionInfo?.coHost?.id == user?.id ||
                  sessionInfo?.preacher?.id == user?.id
                    ? "display-capture;"
                    : ""
                } fullscreen; clipboard-read; clipboard-write; autoplay`}
                src={
                  sessionInfo?.preacher?.id == user?.id
                    ? hostedUrl
                    : sessionInfo?.hostedLink +
                      `?name=${user?.username}&audio=${sessionInfo?.audioStatus}&video=${sessionInfo?.videoStatus}&notify=true`
                }
                style={{ border: "0px", width: "100%", height: "100%" }}
              ></iframe>
            </Box>
          </Box>
          {sessionInfo?.qnaStatus && (
            <QnaButton
              sessionId={sessionInfo?.id}
              userId={user?.id}
              canUpdate={
                sessionInfo?.coHost?.id == user?.id ||
                sessionInfo?.preacher?.id == user?.id
              }
            />
          )}
        </Stack>
        <HStack w={"full"} py={8}>
          <Box fontSize={"sm"}>
            {parse(
              sessionInfo?.description ||
                "No description available for this session."
            )}
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default page;
