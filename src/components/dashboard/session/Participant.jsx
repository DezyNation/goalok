import BackendAxios from "@/utils/axios";
import useAuth from "@/utils/hooks/useAuth";
import useSessionHandler from "@/utils/hooks/useSessionHandler";
import {
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  BsCameraVideo,
  BsCameraVideoOff,
  BsFillShieldFill,
  BsMic,
  BsMicMute,
  BsShieldFill,
} from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { GiHighKick } from "react-icons/gi";

const Participant = ({
  participantId,
  avatar,
  displayName,
  isCoHost,
  isPreacher,
  cameraStatus,
  handRaised,
  micStatus,
  sessionId,
}) => {
  const { user } = useAuth();
  const Toast = useToast();
  const { updatePermission, notify } = useSessionHandler();

  return (
    <>
      <Menu>
        <MenuButton
          as={
            <Avatar name={displayName} src={avatar} pos={"relative"}>
              {isCoHost ? (
                <AvatarBadge boxSize="1.25em" children={<BsShieldFill />} />
              ) : null}
              {handRaised ? (
                <Text pos={"absolute"} fontSize={"xl"} top={0} left={0}>
                  ✋
                </Text>
              ) : null}
            </Avatar>
          }
          rounded={"full"}
          roundedBottomRight={0}
          bgColor={isPreacher ? "yellow.100" : "gray.50"}
          p={3}
        />
        {isCoHost || isPreacher ? (
          parseInt(participantId) != parseInt(user?.id) ? (
            <MenuList>
              <MenuItem
                icon={micStatus ? <BsMicMute /> : <BsMic />}
                onClick={() => {
                  if (micStatus) {
                    console.log("Current Mic Status ", micStatus);
                    updatePermission({
                      permission: { micStatus: false },
                      sessionId: sessionId,
                      participantId: participantId,
                    });
                  } else {
                    console.log("Mic Status is already ", micStatus);
                  }
                }}
              >
                {micStatus ? "Mute User" : "Mic Is Off"}
              </MenuItem>

              <MenuItem
                icon={cameraStatus ? <BsCameraVideoOff /> : <BsCameraVideo />}
                onClick={() => {
                  if (cameraStatus) {
                    console.log("Current Camera Status ", cameraStatus);
                    updatePermission({
                      permission: { cameraStatus: false },
                      sessionId: sessionId,
                      participantId: participantId,
                    });
                  } else {
                    console.log("Camera Status is already ", cameraStatus);
                  }
                }}
              >
                {cameraStatus ? "Close Camera" : "Camera Is Off"}
              </MenuItem>

              <MenuItem
                icon={isCoHost ? <BsFillShieldFill /> : <FaUser />}
                onClick={() => {
                  updatePermission({
                    permission: { isCoHost: !isCoHost },
                    sessionId: sessionId,
                    participantId: participantId,
                  });
                }}
              >
                {isCoHost ? "Remove from Co-Host" : "Make Co-Host"}
              </MenuItem>

              <MenuItem
                color={"red.600"}
                icon={<GiHighKick />}
                onClick={() =>
                  notify({
                    sessionId: sessionId,
                    eventName: "kickout",
                    data: { participantId: participantId },
                  })
                }
              >
                Kick Out
              </MenuItem>
            </MenuList>
          ) : null
        ) : null}
      </Menu>
    </>
  );
};

export default Participant;
