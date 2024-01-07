"use client";
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
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";

const ReviewModal = ({ isOpen, onClose }) => {
  const [emotion, setEmotion] = useState("");
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Review this session</ModalHeader>
          <ModalBody>
            <Text fontSize={"sm"}>
              How much did you like this counselling session?
            </Text>
            <HStack py={2} gap={4} justifyContent={"center"}>
              <Box
                p={2}
                rounded={"full"}
                cursor={"pointer"}
                boxSize={"8"}
                bgColor={emotion == "sad" ? "yellow.200" : "gray.50"}
                onClick={() => setEmotion("sad")}
                display={"grid"}
                placeContent={"center"}
              >
                <Text>😔</Text>
              </Box>
              <Box
                p={2}
                rounded={"full"}
                cursor={"pointer"}
                boxSize={"8"}
                bgColor={emotion == "below average" ? "yellow.200" : "gray.50"}
                onClick={() => setEmotion("below average")}
                display={"grid"}
                placeContent={"center"}
              >
                <Text>😐</Text>
              </Box>
              <Box
                p={2}
                rounded={"full"}
                cursor={"pointer"}
                boxSize={"8"}
                bgColor={emotion == "average" ? "yellow.200" : "gray.50"}
                onClick={() => setEmotion("average")}
                display={"grid"}
                placeContent={"center"}
              >
                <Text>😊</Text>
              </Box>
              <Box
                p={2}
                rounded={"full"}
                cursor={"pointer"}
                boxSize={"8"}
                bgColor={emotion == "good" ? "yellow.200" : "gray.50"}
                onClick={() => setEmotion("good")}
                display={"grid"}
                placeContent={"center"}
              >
                <Text>😄</Text>
              </Box>
              <Box
                p={2}
                rounded={"full"}
                cursor={"pointer"}
                boxSize={"8"}
                bgColor={emotion == "wonderful" ? "yellow.200" : "gray.50"}
                onClick={() => setEmotion("wonderful")}
                display={"grid"}
                placeContent={"center"}
              >
                <Text>😍</Text>
              </Box>
            </HStack>
            <br />
            <Text fontSize={"sm"}>Who talked to you?</Text>
            <Select placeholder="Please select" my={2}>
              <option value="Srimukhi Devi Dasi">Srimukhi Devi Dasi</option>
              <option value="Radha Rani Devi Dasi">Radha Rani Devi Dasi</option>
              <option value="Radha Kripa Devi Dasi">
                Radha Kripa Devi Dasi
              </option>
              <option value="Bhakti Priya Devi Dasi">
                Bhakti Priya Devi Dasi
              </option>
              <option value="Ananga Manjari Devi Dasi">
                Ananga Manjari Devi Dasi
              </option>
              <option value="Priyaji Devi Dasi">Priyaji Devi Dasi</option>
              <option value="Cherish Devi Dasi">Cherish Devi Dasi</option>
              <option value="Vraj Sundari Devi Dasi">
                Vraj Sundari Devi Dasi
              </option>
              <option value="Subal Das">Subal Das</option>
              <option value="Rama Das">Rama Das</option>
              <option value="Yashodanandan Das">Yashodanandan Das</option>
              <option value="Mukund Das">Mukund Das</option>
              <option value="Vaishnav Das">Vaishnav Das</option>
              <option value="Ankit Govind Prabhu">Ankit Govind Prabhu</option>
              <option value="Sacchidanand Das">Sacchidanand Das</option>
            </Select>
            <br />
            <Text fontSize={"sm"}>Your reviews</Text>
            <Textarea
              w={"full"}
              fontSize={"sm"}
              h={24}
              resize={"none"}
              placeholder="Tell us what you liked, disliked and how we can improve?"
            />
          </ModalBody>
          <ModalFooter>
            <HStack w={"full"} justifyContent={"flex-end"}>
              <Button fontSize={"sm"} colorScheme="whatsapp">
                Submit
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewModal;
