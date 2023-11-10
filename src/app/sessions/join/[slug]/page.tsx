"use client";
import "@livekit/components-styles";
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
} from "@livekit/components-react";
import { useEffect, useState } from "react";
import { Track } from "livekit-client";
import useAuth from "@/utils/hooks/useAuth";
import QnaButton from "@/components/dashboard/session/QnaBox";
import { useRouter, useSearchParams } from "next/navigation";
import BackendAxios from "@/utils/axios";
import useApiHandler from "@/utils/hooks/useApiHandler";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";

export default function Page({ params }) {
  const { slug } = params;
  const query = useSearchParams();
  const Toast = useToast();
  const role = query.get("role");

  const [name, setName] = useState<string | undefined>("");
  const { replace } = useRouter();

  const room = slug;
  const [token, setToken] = useState("");

  useEffect(() => {
    const nameFromCookie = Cookies.get("name");
    setName(nameFromCookie);
  }, []);

  useEffect(() => {
    if (!name) {
      replace(`/sessions/prepare/${slug}`);
    }
  }, [name]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${room}&username=${name}&role=${role?.toLowerCase()}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
        Toast({ status: "error", description: "Token error, please refresh" });
      }
    })();
  }, []);

  if (token === "") {
    return <div>Please wait...</div>;
  }

  return (
    <>
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        connectOptions={{ autoSubscribe: true, maxRetries: 3 }}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        data-lk-theme="default"
        style={{ height: "100dvh" }}
        autoFocus={true}
        // onDisconnected={() => replace("/dashboard?active_side_item=feed")}
      >
        <VideoConference />

        <RoomAudioRenderer />
      </LiveKitRoom>
    </>
  );
}
