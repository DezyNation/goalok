"use client";

import { useToast } from "@chakra-ui/react";
import useApiHandler from "./useApiHandler";

const { DefaultAxios, default: BackendAxios } = require("../axios");

const useSessionHandler = () => {
  const Toast = useToast();
  const { handleError } = useApiHandler();

  const getHostedLink = async ({ slug, user }) => {
    const result = await DefaultAxios.post(
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
    );
    return result;
  };

  const getParticipants = async ({ sessionId }) => {
    const result = await BackendAxios.get(
      `/api/session-participant/all?sessionId=${sessionId}`
    );
    return result;
  };

  const startSession = ({ id }) => {
    BackendAxios.post(`/api/sessions/start-session`, {
      sessionId: id,
    })
      .then((res) => {
        console.log("Session started");
      })
      .catch((err) => {
        handleError(err, "Error while updating session status");
      });
  };

  const removeMe = async ({userId}) => {
    await BackendAxios.post(`/api/session-participant/remove-me`).then(res => {
      console.log("Room exit successful!")
    }).catch(err => {
      handleError(err, "Failed to exit session")
    })
  }

  const updatePermission = async ({ sessionId, participantId, permission }) => {
    await BackendAxios.post(`/api/session-participant/update`, {
      sessionId: sessionId,
      participantId: participantId,
      permission: permission,
    })
      .then((res) => {
        Toast({ description: "Permission updated successfully" });
      })
      .catch((err) => {
        handleError(err, "Could not update participant settings on Server");
      });
  };

  const notify = ({ sessionId, eventName, data }) => {
    BackendAxios.post(`/api/session-participant/notify`, {
      sessionId: sessionId,
      eventName: eventName,
      data: data,
    })
      .then((res) => {
        Toast({ description: "Permission updated successfully" });
      })
      .catch((err) => {
        handleError(err, "Error while updating participant");
      });
  };

  const exitAndRedirect = ({ title, description, redirectLink, status }) => {
    Toast({
      status: status || "info",
      title: title,
      description: description,
    });
    setTimeout(() => {
      window.location?.replace(
        redirectLink || `/dashboard?active_side_item=dashboard`
      );
    }, 1000);
  };

  const fetchMyServerInfo = async () => {
    const res = await BackendAxios.get(`/api/session-participant/me`)
    return res;
  }

  return {
    getHostedLink,
    exitAndRedirect,
    startSession,
    getParticipants,
    updatePermission,
    notify,
    removeMe,
    fetchMyServerInfo
  };
};

export default useSessionHandler;
