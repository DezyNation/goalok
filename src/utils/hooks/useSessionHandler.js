"use client";

import Toast from "@/components/global/Toast";

const { DefaultAxios, default: BackendAxios } = require("../axios");

const useSessionHandler = () => {
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

  const startSession = ({id}) => {
    BackendAxios.post(`/api/sessions/start-session`, {
        sessionId: id
      })
        .then((res) => {
          console.log("Session started");
        })
        .catch((err) => {
          handleError(err, "Error while updating session status");
        });
  }

  const exitAndRedirect = ({title, description, redirectLink}) => {
    Toast({
        title: title,
        description: description,
      });
      setTimeout(() => {
        window.location?.replace(redirectLink || `/dashboard?active_side_item=dashboard`);
      }, 1000);
  }

  return { getHostedLink, exitAndRedirect, startSession };
};

export default useSessionHandler;
