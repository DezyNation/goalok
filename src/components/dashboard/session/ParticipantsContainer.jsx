import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Participant from "./Participant";
import useSessionHandler from "@/utils/hooks/useSessionHandler";
import useApiHandler from "@/utils/hooks/useApiHandler";

const ParticipantsContainer = ({ preacher, sessionId }) => {
  const { getParticipants } = useSessionHandler();
  const { handleError } = useApiHandler();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    allParticipants();
  }, []);

  async function allParticipants() {
    try {
      const res = await getParticipants();
      setParticipants(res.data);
    } catch (err) {
      handleError(err, "Error while fetching participants");
    }
  }

  return (
    <>
      <Box p={4} bgColor={"#FFF"} boxShadow={"lg"} rounded={8}>
        <Text fontSize={"lg"}>Participants in this session</Text>
        <hr />
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          gap={4}
        >
          {participants?.map((data, key) => (
            <Participant
              key={key}
              isCoHost={data?.isCoHost}
              isPreacher={data?.isPreacher}
              participantId={data?.user?.id}
              micStatus={data?.micStatus}
              cameraStatus={data?.cameraStatus}
              avatar={data?.user?.avatar?.url}
              displayName={data?.user?.name || data?.user?.username}
            />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default ParticipantsContainer;
