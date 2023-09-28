import BackendAxios from "@/utils/axios";
import useAuth from "@/utils/hooks/useAuth";
import {
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  BsCameraVideo,
  BsCameraVideoOff,
  BsMic,
  BsMicMute,
  BsShieldFill,
} from "react-icons/bs";
import { GiHighKick } from "react-icons/gi";

const Participant = ({
  participantId,
  avatar,
  displayName,
  isCoHost,
  isPreacher,
  cameraStatus,
  micStatus,
  sessionId
}) => {
  const { user } = useAuth();
  const Toast = useToast()

  function updatePermission(permission){
    BackendAxios.post(`/api/session-participant/notify`, {
      sessionId: sessionId,
      participantId: participantId,
      permission: permission
    }).then(res => {
      Toast({description: "Permission updated successfully"})
    })
  }

  return (
    <>
      <Menu>
        <MenuButton
          as={
            <Avatar name={displayName} src={avatar}>
              {isCoHost ? (
                <AvatarBadge boxSize="1.25em" children={<BsShieldFill />} />
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
              <MenuItem icon={micStatus ? <BsMicMute /> : <BsMic />}>
                {micStatus ? "Mute User" : "Allow Mic"}
              </MenuItem>
              <MenuItem
                icon={cameraStatus ? <BsCameraVideoOff /> : <BsCameraVideo />}
              >
                {cameraStatus ? "Close Camera" : "Allow Camera"}
              </MenuItem>
              <MenuItem color={"red.600"} icon={<GiHighKick />}>
                Kick Out
              </MenuItem>
              <MenuItem icon={<EditIcon />}>Open File...</MenuItem>
            </MenuList>
          ) : null
        ) : null}
      </Menu>
    </>
  );
};

export default Participant;
