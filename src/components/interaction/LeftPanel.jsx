"use client";
import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const LeftPanel = ({onRoomClick}) => {
  const [chatRooms, setChatRooms] = useState([
    {
      name: "Gauranga Sundar",
      lastMessage: "Hare Krishna guru ji, how are you?",
      lastMessageFrom: { name: "Sangam", userId: "1" },
      chatRoomId: "1234",
      chatRoomType: "private",
    },
    {
      name: "Subal Das",
      lastMessage: "Hare Krishna prabhu ji, what's the progress?",
      lastMessageFrom: { name: "Subal", userId: "1" },
      chatRoomId: "1234",
      chatRoomType: "private",
    },
    {
      name: "Coordinators Group",
      lastMessage: "And when are we going to start the project?",
      lastMessageFrom: { name: "Govinda", userId: "1" },
      chatRoomId: "1234",
      chatRoomType: "group",
    },
  ]);
  return (
    <>
    <Text fontSize={'xl'}>Chat with others</Text>
      <Box
        flex={1}
        bgColor={"#FFF"}
        rounded={4}
        display={"flex"}
        flexDir={"column"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        boxShadow={'md'}
      >
        {chatRooms?.map((room, key) => (
          <HStack p={4} w={"full"} alignItems={"center"} key={key} _hover={{bgColor: 'gray.100'}} cursor={'pointer'} onClick={()=>onRoomClick(room?.chatRoomId, room?.chatRoomType)}>
            <Avatar name={room?.name} boxSize={"10"} />
            <Box>
              <Text fontSize={"sm"}>{room?.name}</Text>
              <Text fontSize={8}>
                {room?.lastMessageFrom?.name}: {room?.lastMessage}
              </Text>
            </Box>
          </HStack>
        ))}
      </Box>
    </>
  );
};

export default LeftPanel;
