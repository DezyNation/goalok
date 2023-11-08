"use client";
import ReceivedMessage from "@/components/interaction/ReceivedMessage";
import SentMessage from "@/components/interaction/SentMessage";
import BackendAxios from "@/utils/axios";
import pusher from "@/utils/helpers/pusher";
import useApiHandler from "@/utils/hooks/useApiHandler";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ScaleFade,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiRupee, BiSolidParty } from "react-icons/bi";
import {
  BsChatFill,
  BsCheckCircle,
  BsCheckCircleFill,
  BsEmojiHeartEyes,
  BsHeartFill,
  BsQuestion,
  BsTrash2Fill,
  BsX,
} from "react-icons/bs";
import { IoSend } from "react-icons/io5";

const UpdateButtons = ({
  messageId,
  beingAnswered,
  isAnswered,
  justifyContent,
  onAction,
}) => {
  const { handleError } = useApiHandler();
  function update({ data }) {
    if (!messageId) return;
    BackendAxios.put(`/api/sessions/questions/update/${messageId}`, {
      data: data,
    })
      .then((res) => {
        onAction(() => true);
      })
      .catch((err) => {
        handleError(err, "Error updating message");
      });
  }

  function deleteMessage(messageId) {
    if (!messageId) return;
    BackendAxios.delete(`/api/questions/${messageId}`)
      .then((res) => {
        onAction(() => true);
      })
      .catch((err) => {
        handleError(err, "Error deleting message");
      });
  }
  return (
    <>
      <HStack w={"full"} justifyContent={justifyContent}>
        <IconButton
          p={0}
          bg={"transparent"}
          color={beingAnswered ? "twitter.500" : "twitter.200"}
          icon={<BsCheckCircle size={12} />}
          onClick={() =>
            update({
              messageId: messageId,
              data: {
                beingAnswered: beingAnswered ? false : true,
              },
            })
          }
        />
        <IconButton
          p={0}
          bg={"transparent"}
          color={isAnswered ? "whatsapp.500" : "whatsapp.200"}
          icon={<BsCheckCircleFill size={12} />}
          onClick={() =>
            update({
              messageId: messageId,
              data: {
                isAnswered: isAnswered ? false : true,
              },
            })
          }
        />
        <IconButton
          p={0}
          bg={"transparent"}
          color={"red"}
          icon={<BsTrash2Fill size={12} />}
          onClick={() => deleteMessage(messageId)}
        />
      </HStack>
    </>
  );
};

const QnaBox = ({ onClose, sessionId, userId, canUpdate }) => {
  const { handleError } = useApiHandler();
  const [showReactions, setShowReactions] = useState(false);

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const channel = pusher.subscribe(`session-${sessionId}`);
    channel.bind("messageUpdate", (data) => {
      fetchMessages();
    });
    return () => {
      channel.unbind("messageUpdate");
      pusher.unsubscribe(`session-${sessionId}`);
    };
  }, []);

  async function fetchMessages() {
    if (!sessionId) return;
    await BackendAxios.get(`/api/sessions/questions/${sessionId}`)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        handleError(err, "Error while fetching questions");
      });
  }

  function ask() {
    if (!question) return;
    BackendAxios.post(`/api/sessions/questions/${sessionId}`, {
      question,
    })
      .then((res) => {
        setQuestion(() => "");
        setMessages([...messages, res.data]);
      })
      .catch((err) => {
        handleError(err, "Error while asking question");
      });
  }

  return (
    <>
      <Box flex={1} h={"full"} rounded={[0, 12]} bg={"#FFF"} boxShadow={"lg"}>
        <HStack
          w={"full"}
          justifyContent={"space-between"}
          py={3}
          px={4}
          roundedTop={12}
          bgColor={"#333"}
        >
          <Text
            className="messiri"
            fontSize={["lg", "lg"]}
            fontWeight={"semibold"}
            color={"#FFF"}
          >
            Ask Your Questions Here
          </Text>
          <IconButton
            bgColor={"transparent"}
            color={"#FFF"}
            icon={<BsX size={20} />}
            onClick={onClose}
          />
        </HStack>
        {/* QnA area */}
        <VStack
          w={"full"}
          p={4}
          gap={6}
          minH={["md"]}
          maxH={["md"]}
          overflowY={"scroll"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          transition={"all .3s ease"}
          id={"messages-wrapper"}
        >
          <Box p={4}>
            <Text fontSize={"xs"} textAlign={"center"}>
              Experimental feature. Might break sometimes.
            </Text>
          </Box>
          {messages?.map((msg, key) =>
            msg?.user?.id == userId ? (
              <Box w={"full"} key={key}>
                {canUpdate ? (
                  <UpdateButtons
                    messageId={msg?.id}
                    beingAnswered={msg?.beingAnswered}
                    isAnswered={msg?.isAnswered}
                    justifyContent={"flex-end"}
                    onAction={() => fetchMessages()}
                  />
                ) : null}
                <SentMessage
                  message={msg?.question}
                  timestamp={msg?.createdAt}
                  avatar={msg?.user?.avatar?.url || ""}
                  name={msg?.user?.username}
                  blueTick={msg?.beingAnswered}
                  greenTick={msg?.isAnswered}
                />
              </Box>
            ) : (
              <Box w={"full"} key={key}>
                {canUpdate ? (
                  <UpdateButtons
                    messageId={msg?.id}
                    beingAnswered={msg?.beingAnswered}
                    isAnswered={msg?.isAnswered}
                    justifyContent={"flex-start"}
                  />
                ) : null}
                <ReceivedMessage
                  key={key}
                  message={msg?.question}
                  timestamp={msg?.createdAt}
                  avatar={msg?.user?.avatar?.url || ""}
                  name={msg?.user?.username}
                  blueTick={msg?.beingAnswered}
                  greenTick={msg?.isAnswered}
                />
              </Box>
            )
          )}
          <div id="messages-anchor"></div>
        </VStack>
        <HStack
          py={3}
          w={"full"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Box
            p={3}
            roundedLeft={"full"}
            boxShadow={"lg"}
            border={"1px"}
            borderColor={"blackAlpha.100"}
            borderRight={0}
            transition={"all .3s ease"}
          >
            <HStack gap={2}>
              <IconButton
                icon={<BiRupee />}
                boxSize={8}
                rounded={"full"}
                _hover={{ bgColor: "twitter.500", color: "#FFF" }}
              />
              <IconButton
                icon={<BsEmojiHeartEyes />}
                boxSize={8}
                rounded={"full"}
                _hover={{ bgColor: "yellow.400" }}
                bgColor={showReactions ? "yellow.400" : "gray.100"}
                onClick={() => setShowReactions(!showReactions)}
              />
              {showReactions ? (
                <HStack gap={2} transition={"all .2s ease"}>
                  <IconButton
                    bg={"#FFF"}
                    icon={<BsHeartFill />}
                    boxSize={8}
                    rounded={"full"}
                    color={"tomato"}
                  />
                  <Box
                    bg={"#FFF"}
                    w={10}
                    h={8}
                    rounded={"full"}
                    color={"yellow.500"}
                    display={"grid"}
                    placeContent={"center"}
                    _hover={{ bgColor: "gray.200" }}
                    cursor={"pointer"}
                  >
                    🎉
                  </Box>
                  <Box
                    bg={"#FFF"}
                    w={10}
                    h={8}
                    rounded={"full"}
                    color={"yellow.500"}
                    display={"grid"}
                    placeContent={"center"}
                    _hover={{ bgColor: "gray.200" }}
                    cursor={"pointer"}
                  >
                    🙏
                  </Box>
                  <Box
                    bg={"#FFF"}
                    w={10}
                    h={8}
                    rounded={"full"}
                    color={"yellow.500"}
                    display={"grid"}
                    placeContent={"center"}
                    _hover={{ bgColor: "gray.200" }}
                    cursor={"pointer"}
                  >
                    😍
                  </Box>
                </HStack>
              ) : null}
            </HStack>
          </Box>
        </HStack>
        <HStack p={3} w={"full"}>
          <InputGroup>
            <Input
              px={2}
              noOfLines={99}
              fontSize={"xs"}
              variant={"flushed"}
              placeholder="Type here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  ask();
                }
              }}
            />
            <InputRightElement
              children={
                <IoSend
                  color="#999"
                  style={{ cursor: "pointer" }}
                  onClick={ask}
                />
              }
            />
          </InputGroup>
        </HStack>
      </Box>
    </>
  );
};

const QnaButton = ({ sessionId, userId, canUpdate }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <IconButton
        display={isOpen ? "none" : "flex"}
        boxSize={16}
        bgColor={"#333"}
        color={"#FFF"}
        _hover={{ bgColor: "#666", color: "#FFF" }}
        rounded={"full"}
        roundedTopLeft={0}
        icon={<BsQuestion size={28} />}
        pos={"fixed"}
        bottom={4}
        left={4}
        onClick={onToggle}
        zIndex={99}
      />
      <HStack
        pos={"fixed"}
        top={0}
        left={0}
        w={"full"}
        h={"100vh"}
        p={[0, 4]}
        display={isOpen ? "flex" : "none"}
        alignItems={"center"}
        justifyContent={["center", "flex-start"]}
        bgColor={"blackAlpha.700"}
        zIndex={99}
      >
        <ScaleFade initialScale={0.9} in={isOpen}>
          <Box w={["100vw", "sm"]} h={["100vh", "auto"]}>
            <QnaBox
              sessionId={sessionId}
              userId={userId}
              onClose={onToggle}
              canUpdate={canUpdate}
            />
          </Box>
        </ScaleFade>
      </HStack>
    </>
  );
};

export default QnaButton;
