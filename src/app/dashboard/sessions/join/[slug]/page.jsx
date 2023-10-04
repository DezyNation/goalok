"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import QnaButton from "@/components/dashboard/session/QnaBox";
import BackendAxios, { DefaultAxios } from "@/utils/axios";
import { UserContext } from "@/utils/hooks/useAuth";
import useApiHandler from "@/utils/hooks/useApiHandler";
import parse from "html-react-parser";
import SessionControls from "@/components/dashboard/session/SessionControls";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import pusher from "@/utils/helpers/pusher";
import useSessionHandler from "@/utils/hooks/useSessionHandler";
import UserSessionControls from "@/components/dashboard/session/UserSessionControls";

const page = ({ params }) => {
  const { slug } = params;

  const [sessionInfo, setSessionInfo] = useState(null);
  const [hostedUrl, setHostedUrl] = useState("");

  const [myInfo, setMyInfo] = useState(null);

  const Toast = useToast();
  const { handleError } = useApiHandler();
  const { getHostedLink, startSession, exitAndRedirect, fetchMyServerInfo } =
    useSessionHandler();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && slug) {
      fetchSessionInfo();
    }
  }, [user, slug]);

  async function refreshMyInfo() {
    const cachedParticipants = JSON.parse(localStorage.getItem("participants"));
    if (!cachedParticipants?.length) {
      const myServerInfo = await fetchMyServerInfo();
      if (myServerInfo?.status == 200) {
        let newList = [];
        newList.push(myServerInfo?.data);
        setMyInfo(myServerInfo);
        localStorage.setItem("participants", JSON.stringify(newList));
      }
      return;
    }
    setMyInfo(cachedParticipants?.find((entry) => entry?.user?.id == user?.id));
  }

  // Handling realtime events
  useEffect(() => {
    if (!sessionInfo?.id) return;
    const cachedParticipants = JSON.parse(localStorage.getItem("participants"));
    const channel = pusher.subscribe(`session-${sessionInfo?.id}`);
    channel.bind("sessionUpdate", ({ data, status }) => {
      if (status == "ended") {
        exitAndRedirect({
          title: "The session has been ended by the host.",
          description: "Let's meet again soon!",
        });
      } else {
        console.log(data);
        setSessionInfo((prev) => ({
          ...prev,
          ...data,
        }));
      }
    });

    channel.bind("kickout", ({ participantId }) => {
      if (participantId == user?.id) {
        setTimeout(() => {
          exitAndRedirect({
            status: "warning",
            title: "You've been removed",
            description: "The admin removed you from the session",
          });
        }, 2000);
      }
    });

    channel.bind("permissionUpdate", (data) => {
      if (cachedParticipants?.length) {
        let participants = [...cachedParticipants];
        let i = participants?.indexOf(
          (entry) => entry?.user?.id == data?.user?.id
        );
        if (i >= 0) {
          participants[i] = data;
        } else {
          participants.push(data);
        }

        localStorage.setItem("participants", participants);
      } else {
        localStorage.setItem("participants", JSON.stringify([data]));
      }
      refreshMyInfo();
    });

    return () => {
      channel.unbind("sessionUpdate");
      channel.unbind("kickout");
      pusher.unsubscribe(`session-${sessionInfo?.id}`);
    };
  }, [sessionInfo]);

  const handleFullScreen = useFullScreenHandle();

  // async function getHostedLink() {
  //   await DefaultAxios.post(
  //     `${process.env.NEXT_PUBLIC_CONFERENCE_BASE_URL}/api/v1/join`,
  //     {
  //       room: slug,
  //       password: "false",
  //       name: user?.username,
  //       audio: "false",
  //       video: "false",
  //       screen: "false",
  //       notify: "true",
  //     },
  //     {
  //       headers: {
  //         authorization: "mirotalksfu_default_secret",
  //       },
  //     }
  //   )
  //     .then((res) => {
  //       setHostedUrl(res.data?.join);
  //     })
  //     .catch((err) => {
  //       handleError(err, "Error while generating hosted URL");
  //     });
  // }

  function fetchSessionInfo() {
    BackendAxios.get(`/api/sessions/info/${slug}`)
      .then(async (res) => {
        if (!res.data.id) {
          window.location.replace(`/dashboard?active_side_item=dashboard`);
          return;
        }
        setSessionInfo(() => res.data);
        if (res?.data?.status != "ongoing") {
          if (
            res.data?.preacher?.id == user?.id &&
            res.data?.coHost?.id == user?.id
          ) {
            const hostedLinkRes = await getHostedLink({
              slug: slug,
              user: user,
            });
            if (hostedLinkRes?.status != 200) {
              Toast({
                status: "warning",
                title: "Please re-join",
                description: "There was an error connecting you to server",
              });
              return;
            }
            setHostedUrl(() => hostedLinkRes?.data?.join);
            startSession({ id: res.data?.id });
          }
        } else {
          exitAndRedirect({
            title: "This session has not started yet.",
            description: "Please contact the host or preacher.",
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status == 404) {
          window.location.replace(`/dashboard?active_side_item=dashboard`);
          return;
        }
        handleError(err, "Error while fetching session info");
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
              p={4}
            >
              {sessionInfo?.title}
            </Text>
            <Text fontWeight={"semibold"} p={4}>
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
            <FullScreen handle={handleFullScreen}>
              <Box
                w={["100vw", "full"]}
                height={"100vh"}
                overflow={"scroll"}
                border={"1px"}
              >
                <iframe
                  allow={`${
                    myInfo?.isCoHost || myInfo?.isPreacher
                      ? "camera;"
                      : sessionInfo?.cameraStatus && myInfo?.cameraStatus
                      ? "camera;"
                      : ""
                  } ${
                    myInfo?.isCoHost || myInfo?.isPreacher
                      ? "microphone;"
                      : sessionInfo?.cameraStatus && myInfo?.micStatus
                      ? "microphone;"
                      : ""
                  } ${
                    myInfo?.isCoHost || myInfo?.isPreacher
                      ? "display-capture;"
                      : ""
                  } fullscreen; clipboard-read; clipboard-write; autoplay`}
                  allowFullScreen
                  src={
                    sessionInfo?.preacher?.id == user?.id
                      ? hostedUrl
                      : sessionInfo?.hostedLink +
                        `?name=${user?.username}&audio=true&video=true&notify=false`
                  }
                  style={{ border: "0px", width: "100%", height: "100%" }}
                ></iframe>
              </Box>
            </FullScreen>
          </Box>
        </Stack>
        {sessionInfo?.coHost?.id == user?.id ||
        sessionInfo?.preacher?.id == user?.id ? (
          <Box p={4} py={16}>
            <SessionControls
              sessionId={sessionInfo?.id}
              microphoneStatus={sessionInfo?.micStatus}
              cameraStatus={sessionInfo?.cameraStatus}
              qnaStatus={sessionInfo?.qnaStatus}
              donationStatus={sessionInfo?.donationStatus}
            />
          </Box>
        ) : null}
        <HStack w={"full"} p={4} py={8}>
          <Box fontSize={"sm"}>
            {parse(
              sessionInfo?.description ||
                "No description available for this session."
            )}
          </Box>
        </HStack>
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

      <UserSessionControls
        sessionId={sessionInfo?.id}
        participantId={user?.id}
        micStatus={myInfo?.micStatus}
        cameraStatus={myInfo?.cameraStatus}
        onFullScreen={() => handleFullScreen.enter()}
      />
    </>
  );
};

export default page;
