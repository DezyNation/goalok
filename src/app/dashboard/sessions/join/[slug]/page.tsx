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
import { useRouter } from "next/navigation";
import BackendAxios from "@/utils/axios";
import useApiHandler from "@/utils/hooks/useApiHandler";

export default function Page({ params }) {
  const { slug } = params;
  const { user } = useAuth();
  const { replace } = useRouter();
  const { handleError } = useApiHandler();

  const room = slug;
  const name = user?.username;
  const [token, setToken] = useState("");
  const [sessionInfo, setSessionInfo] = useState(null);

  useEffect(() => {
    if (!user?.username) return;
    (async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${room}&username=${name}&role=${user?.role?.toLowerCase()}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const res = await BackendAxios.get(`/api/sessions/info/${slug}`);
        setSessionInfo(res.data);
      } catch (error) {
        handleError(error, "Error while fetching session info");
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

      <QnaButton
        sessionId={sessionInfo?.id}
        userId={user?.id}
        canUpdate={user?.role == "admin" || user?.role == "preacher"}
      />
    </>
  );
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
