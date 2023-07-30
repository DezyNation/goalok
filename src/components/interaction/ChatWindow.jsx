"use client";
import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import { LuSmilePlus } from "react-icons/lu";
import { IoSend } from "react-icons/io5";
import CustomEmojiPicker from "./EmojiPicker";

const ChatWindow = ({ chatRoomId, chatRoomType }) => {
  const [chatRoomTitle, setChatRoomTitle] = useState("Chat Title");
  const [chatRoomDesc, setChatRoomDesc] = useState("");
  const [message, setMessage] = useState("");

  const [emojiPickerStatus, setEmojiPickerStatus] = useState(false);

  useEffect(() => {
    setChatRoomDesc(
      chatRoomType == "group"
        ? "ISKCON Inc. Coordinators Group"
        : "Last active 5 hours ago"
    );
  }, [chatRoomType]);

  return (
    <>
      <Box flex={3} p={4} bgColor={"#FFF"} rounded={4} boxShadow={"md"}>
        <Text fontSize={"xl"} className="messiri">
          {chatRoomTitle}
        </Text>
        <Text fontSize={"xs"} pb={2}>
          {chatRoomDesc}
        </Text>
        <hr />
        <Box h={"65vh"} overflowY={"scroll"} w={"full"} py={4}>
          <ReceivedMessage />
          <SentMessage />
        </Box>
        <HStack alignItems={"flex-start"} gap={[16]}>
          <InputGroup px={2}>
            <Textarea
              placeholder="Type your message..."
              w={"full"}
              resize={"vertical"}
              variant={"flushed"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fontSize={"md"}
            />
            <InputRightAddon
              bgColor={"transparent"}
              border={"none"}
              children={
                <CustomEmojiPicker
                  onClick={() => setEmojiPickerStatus(true)}
                  isOpen={emojiPickerStatus}
                  onClose={() => setEmojiPickerStatus(false)}
                  onEmojiSelect={(emojiData) =>
                    setMessage(`${message}${emojiData?.native}`)
                  }
                />
              }
            />
          </InputGroup>
          <Button
            colorScheme="pink"
            bgColor={"fuchsia"}
            rightIcon={<IoSend />}
            rounded={"full"}
            boxShadow={"md"}
          >
            Send
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default ChatWindow;
