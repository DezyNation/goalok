"use client";
import useSessionHandler from "@/utils/hooks/useSessionHandler";
import { HStack, IconButton } from "@chakra-ui/react";
import React from "react";

const UserSessionControls = ({
  sessionId,
  participantId,
  micStatus,
  cameraStatus,
  handRaised,
  onFullScreen,
}) => {
  const { updatePermission } = useSessionHandler();

  return (
    <>
      <HStack
        pos={"fixed"}
        bottom={0}
        left={0}
        right={0}
        p={4}
        width={"full"}
        alignItems={"center"}
        justifyContent={["center", "center"]}
        zIndex={1}
        bgColor={"none"}
      >
        <HStack rounded={"8"} gap={0} overflow={"hidden"}>
          <IconButton
            onClick={() =>
              updatePermission({
                sessionId: sessionId,
                participantId: participantId,
                permission: { micStatus: !micStatus },
              })
            }
            bgColor={"#333"}
            color={"#FFF"}
            colorScheme="yellow"
            size={"lg"}
            icon={<BsMicFill />}
            rounded={0}
          />
          <IconButton
            onClick={() =>
              updatePermission({
                sessionId: sessionId,
                participantId: participantId,
                permission: { cameraStatus: !cameraStatus },
              })
            }
            bgColor={"#333"}
            color={"#FFF"}
            colorScheme="yellow"
            size={"lg"}
            icon={<BsCameraFill />}
            rounded={0}
          />
          <IconButton
            onClick={() =>
              updatePermission({
                sessionId: sessionId,
                participantId: participantId,
                permission: { handRaised: !handRaised },
              })
            }
            bgColor={"#333"}
            color={"#FFF"}
            colorScheme="yellow"
            size={"lg"}
            icon={<FaHandPaper />}
            rounded={0}
          />
          <IconButton
            onClick={() => onFullScreen()}
            bgColor={"#333"}
            color={"#FFF"}
            colorScheme="yellow"
            size={"lg"}
            icon={<BsArrowsFullscreen />}
            rounded={0}
          />
        </HStack>
      </HStack>
    </>
  );
};

export default UserSessionControls;
