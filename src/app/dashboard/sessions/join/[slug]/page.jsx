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

export default function Page({ params }) {
  const { slug } = params;
  const { user } = useAuth();

  const room = slug;
  const name = user?.username;

  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState("");

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

  if (token === "") {
    return <div>Please wait...</div>;
  }

  return (
    <>
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        connectOptions={{ autoSubscribe: true }}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        // Use the default LiveKit theme for nice styles.
        data-lk-theme="default"
        style={{ height: "100dvh" }}
        autoFocus={true}
      >
        {/* Your custom component with basic video conferencing functionality. */}
        <VideoConference />
        {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
        <RoomAudioRenderer />
        {/* Controls for the user to start/stop audio, video, and screen 
      share tracks and to leave the room. */}
        <ControlBar controls={{ chat: false }} />
      </LiveKitRoom>

      <QnaButton
        sessionId={slug?.split("-")[0]}
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
