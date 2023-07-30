'use client'
import ChatWindow from '@/components/interaction/ChatWindow'
import LeftPanel from '@/components/interaction/LeftPanel'
import { HStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const page = () => {
    const [selectedChatRoom, setSelectedChatRoom] = useState({
        chatRoomId: "",
        chatRoomType: "private"
    })
  return (
    <>
    <HStack w={'full'} alignItems={'flex-start'} justifyContent={'flex-start'}>
        <LeftPanel onRoomClick={(chatRoomId, chatRoomType) => setSelectedChatRoom({chatRoomId: chatRoomId, chatRoomType: chatRoomType})} />
        <ChatWindow chatRoomId={selectedChatRoom.chatRoomId} chatRoomType={selectedChatRoom.chatRoomType} />
    </HStack>
    </>
  )
}

export default page