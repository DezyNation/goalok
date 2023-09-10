"use client";
import React, { useContext, useEffect, useState } from "react";
import { Box, Button, HStack, Stack, Text, useToast } from "@chakra-ui/react";
import Link from "next/link";
import QnaButton from "@/components/dashboard/session/QnaBox";
import BackendAxios, { DefaultAxios } from "@/utils/axios";
import { UserContext } from "@/utils/hooks/useAuth";
import useApiHandler from "@/utils/hooks/useApiHandler";
import parse from "html-react-parser";
import SessionControls from "@/components/dashboard/session/SessionControls";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Pusher from "pusher-js";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: "ap2",
});

const page = ({ params }) => {
  const { slug } = params;
  const Toast = useToast({
    position: "top-right",
  });
  const [sessionInfo, setSessionInfo] = useState(null);
  const [hostedUrl, setHostedUrl] = useState("");

  const { handleError } = useApiHandler();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && slug) {
      fetchSessionInfo();
    }
  }, [user, slug]);

  // Handling realtime events
  useEffect(() => {
    if (!sessionInfo?.id) return;
    const channel = pusher.subscribe(`session-${sessionInfo?.id}`);
    channel.bind("sessionUpdate", ({ data, status }) => {
      if (status == "ended") {
        Toast({
          title: "The session has ended.",
          description: "Let's meet again soon!",
        });
        setTimeout(() => {
          window.location?.replace(`/dashboard?active_side_item=dashboard`);
        }, 1000);
      } else {
        console.log(data);
        setSessionInfo((prev) => ({
          ...prev,
          ...(typeof data?.qnaStatus == "boolean" && {
            qnaStatus: data?.qnaStatus,
          }),
          ...(typeof data?.audioStatus == "boolean" && {
            audioStatus: data?.audioStatus,
          }),
          ...(typeof data?.videoStatus == "boolean" && {
            videoStatus: data?.videoStatus,
          }),
          ...(typeof data?.donationStatus == "boolean" && {
            donationStatus: data?.donationStatus,
          }),
        }));
      }
    });

    return () => {
      channel.unbind("sessionUpdate");
      pusher.unsubscribe(`session-${sessionInfo?.id}`);
    };
  }, [sessionInfo]);

  const handleFullScreen = useFullScreenHandle();

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
        handleError(err, "Error while generating hosted URL");
      });
  }

  async function startSession({ id }) {
    BackendAxios.post(`/api/sessions/start-session`, {
      sessionId: id || sessionInfo?.id,
    })
      .then((res) => {
        console.log("Session started");
      })
      .catch((err) => {
        handleError(err, "Error while updating session status");
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
        // if (res?.data?.status != "ongoing") {
        //   if (
        //     res.data?.preacher?.id != user?.id ||
        //     res.data?.coHost?.id != user?.id
        //   ) {
        //     Toast({
        //       title: "This session has not started yet.",
        //       description: "Please contact the host or preacher.",
        //     });
        //     setTimeout(() => {
        //       window.location.replace("/dashboard?active_side_item=dashboard");
        //     }, 1000);
        //   }
        // }
        if (res.data?.preacher?.id == user?.id) {
          await getHostedLink();
          await startSession({ id: res.data?.id });
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
                rounded={[0, 16]}
                w={["100vw", "full"]}
                height={"95vh"}
                overflow={"scroll"}
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
                  allowFullScreen
                  src={
                    sessionInfo?.preacher?.id == user?.id
                      ? hostedUrl
                      : sessionInfo?.hostedLink +
                        `?name=${user?.username}&audio=${sessionInfo?.audioStatus}&video=${sessionInfo?.videoStatus}&notify=false`
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
              microphoneStatus={sessionInfo?.audioStatus}
              cameraStatus={sessionInfo?.videoStatus}
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

      <HStack
        pos={"fixed"}
        bottom={0}
        left={0}
        right={0}
        p={4}
        width={"full"}
        alignItems={"center"}
        justifyContent={["center", "flex-start"]}
        zIndex={1}
      >
        <Button
          onClick={handleFullScreen.enter}
          colorScheme="yellow"
          rounded={"full"}
        >
          Fullscreen
        </Button>
      </HStack>
    </>
  );
};

export default page;
