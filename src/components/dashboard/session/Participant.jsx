import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsCameraVideo, BsCameraVideoOff, BsMic, BsMicMute } from "react-icons/bs";
import { GiHighKick } from "react-icons/gi";

const Participant = ({ avatar, username, name, showSensitiveControls }) => {
  const [micStatus, setMicStatus] = useState(false);
  const [cameraStatus, setCameraStatus] = useState(false);
  return (
    <>
      <Menu>
        <MenuButton
          as={<Avatar name={username || name} src={avatar} />}
          rounded={"full"}
          roundedBottomRight={0}
        />
        {showSensitiveControls ? <MenuList>
          <MenuItem icon={micStatus ? <BsMicMute /> : <BsMic />}>{micStatus ? "Mute User" : "Allow Mic"}</MenuItem>
          <MenuItem icon={cameraStatus ? <BsCameraVideoOff /> : <BsCameraVideo />}>{micStatus ? "Close Camera" : "Allow Camera"}</MenuItem>
          <MenuItem color={'red.600'} icon={<GiHighKick />}>Kick Out</MenuItem>
          <MenuItem icon={<EditIcon />}>Open File...</MenuItem>
        </MenuList> : null}
      </Menu>
    </>
  );
};

export default Participant;
