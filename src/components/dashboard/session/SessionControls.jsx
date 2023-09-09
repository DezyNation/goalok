"use client";
import BackendAxios from "@/utils/axios";
import useApiHandler from "@/utils/hooks/useApiHandler";
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";

const SessionControls = ({
  cameraStatus,
  microphoneStatus,
  qnaStatus,
  donationStatus,
  sessionId,
}) => {
  const Toast = useToast({
    position: "top-right",
  });
  const { handleError } = useApiHandler();
  const { isOpen, onToggle } = useDisclosure();

  function updateSessionData(data) {
    if (!sessionId) return;
    BackendAxios.put(`/api/sessions/update-session`, {
      data: data,
      sessionId: sessionId,
    })
      .then((res) => {
        Toast({
          status: "success",
          description: "Session updated!",
        });
      })
      .catch((err) => {
        handleError(err, "Err while updating session");
      });
  }

  function endSession() {
    BackendAxios.post(`/api/sessions/stop-session`, {
      sessionId: sessionId,
    })
      .then((res) => {
        Toast({
          status: "success",
          title: "Session Closed",
          description: "Let's meet again soon!",
        });
        setTimeout(() => {
          window.location.replace(`/dashboard?active_side_item=dashboard`);
        }, 1000);
      })
      .catch((err) => {
        handleError(err, "Err while closing session");
      });
  }

  return (
    <>
      <HStack
        alignItems={"center"}
        justifyContent={["center", "flex-start"]}
        flexWrap={"wrap"}
        gap={8}
      >
        <HStack p={4} rounded={12} bgColor={"#FFF"}>
          <Text fontSize={["sm", "lg"]} fontWeight={"semibold"}>
            Camera Status
          </Text>
          <Switch
            defaultChecked={cameraStatus}
            size={["sm", "md", "lg"]}
            onChange={(e) =>
              updateSessionData({ videoStatus: e.target.checked })
            }
          />
        </HStack>
        <HStack p={4} rounded={12} bgColor={"#FFF"}>
          <Text fontSize={["sm", "lg"]} fontWeight={"semibold"}>
            Mic Status
          </Text>
          <Switch
            defaultChecked={microphoneStatus}
            size={["sm", "md", "lg"]}
            onChange={(e) =>
              updateSessionData({ audioStatus: e.target.checked })
            }
          />
        </HStack>
        <HStack p={4} rounded={12} bgColor={"#FFF"}>
          <Text fontSize={["sm", "lg"]} fontWeight={"semibold"}>
            QnA Status
          </Text>
          <Switch
            defaultChecked={qnaStatus}
            size={["sm", "md", "lg"]}
            onChange={(e) => updateSessionData({ qnaStatus: e.target.checked })}
          />
        </HStack>
        <HStack p={4} rounded={12} bgColor={"#FFF"}>
          <Text fontSize={["sm", "lg"]} fontWeight={"semibold"}>
            Donation Status
          </Text>
          <Switch
            defaultChecked={donationStatus}
            size={["sm", "md", "lg"]}
            onChange={(e) => updateSessionData({ qnaStatus: e.target.checked })}
          />
        </HStack>
        <Spacer />
        <Button colorScheme="red" size={"lg"} onClick={onToggle}>
          End Session
        </Button>
      </HStack>

      {/* End condirmation modal */}
      <Modal isCentered isOpen={isOpen} onClose={onToggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>End Session</ModalHeader>
          <ModalBody>
            <Text textAlign={"center"}>Are you sure to end this session?</Text>
          </ModalBody>
          <ModalFooter justifyContent={"flex-end"} gap={6}>
            <Button onClick={onToggle}>Cancel</Button>
            <Button colorScheme="red" onClick={endSession}>
              Yes End Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SessionControls;
