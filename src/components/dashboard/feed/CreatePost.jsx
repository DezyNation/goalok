"use client";
import { UserContext } from "@/utils/hooks/useAuth";
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { BsImages, BsPencilSquare, BsSendFill } from "react-icons/bs";
import { FaLocationDot, FaUserTag } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const CreatePost = () => {

  const { user } = useContext(UserContext);

  return (
    <>
      <Box w={"full"} p={3} rounded={4} bgColor={"#FFF"}>

        <HStack p={[0, 3]} alignItems={"flex-start"} justifyContent={"flex-start"}>
          <Avatar
            name={user?.name || user?.username}
            src={user?.avatar}
            size={"sm"}
          />
          <Textarea
            fontSize={['12', "sm"]}
            w={"full"}
            h={[16, 12]}
            variant={"unstyled"}
            placeholder={`Share your thoughts, ${user?.name ? user?.name?.split(" ")[0] : user?.username}`}
            _placeholder={{fontSize: '12'}}
            mb={2}
            resize={"none"}
          />
        </HStack>
        <HStack py={2} pb={0} gap={6} w={"full"} overflowX={"scroll"}>

          <HStack rounded={"full"} gap={0} bgColor={"gray.100"}>
            <IconButton
              size={"sm"}
              color={"#FFF"}
              rounded={"full"}
              icon={<BsImages />}
              bgColor={"purple.500"}
            />
            <Text w={['28', 'auto']} pr={3} pl={2} fontSize={"xs"}>
              Insert Media
            </Text>
          </HStack>

          {/* <HStack rounded={"full"} gap={0} bgColor={"gray.100"}>
            <IconButton
              size={"sm"}
              color={"#FFF"}
              rounded={"full"}
              icon={<FaLocationDot />}
              bgColor={"pink.400"}
            />
            <Text w={['28', 'auto']} pr={3} pl={2} fontSize={"xs"}>
              Share Location
            </Text>
          </HStack>

          <HStack rounded={"full"} gap={0} bgColor={"gray.100"}>
            <IconButton
              size={"sm"}
              color={"#FFF"}
              rounded={"full"}
              icon={<FaUserTag />}
              bgColor={"yellow.500"}
            />
              <Text w={['28', 'auto']} pr={3} pl={2} fontSize={"xs"}>Tag People</Text>
          </HStack> */}

        </HStack>
        <br />
        <HStack p={2} justifyContent={"flex-end"}>
          <Button
            colorScheme="pink"
            bgColor={"fuchsia"}
            rightIcon={<IoSend />}
            rounded={"full"}
            size={["sm", "md"]}
            boxShadow={["sm", "md"]}
          >
            Share
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default CreatePost;
