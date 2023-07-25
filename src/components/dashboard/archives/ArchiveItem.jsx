"use client";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  Image,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ContextMenu } from "chakra-ui-contextmenu";
import { FaUserGroup } from "react-icons/fa6";

const PropertiesDrawer = ({ status = false, type, title, id, onClose }) => {
  return (
    <>
      <Drawer isOpen={status} onClose={onClose} placement="right" size={'sm'} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>File Name</DrawerHeader>
          <DrawerBody>
            <HStack alignItems={'flex-start'} gap={8}>
              <Image
                src={
                  type == "pdf"
                    ? "/icons/pdf.png"
                    : type == "folder"
                    ? "/icons/folder.png"
                    : type == "image"
                    ? "/icons/photo.png"
                    : type == "audio"
                    ? "/icons/audio.png"
                    : type == "video"
                    ? "/icons/video.png"
                    : "/icons/file.png"
                }
                boxSize={16}
              />
              <Box>
                <HStack>
                  <Text fontSize={'xs'} fontWeight={'semibold'}>Name: </Text>
                  <Text fontSize={'xs'}>File Name</Text>
                </HStack>
                <HStack>
                  <Text fontSize={'xs'} fontWeight={'semibold'}>Type: </Text>
                  <Text fontSize={'xs'}>{type}</Text>
                </HStack>
                <HStack>
                  <Text fontSize={'xs'} fontWeight={'semibold'}>Created At: </Text>
                  <Text fontSize={'xs'}>{new Date().toLocaleString()}</Text>
                </HStack>
              </Box>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const ArchiveItem = ({ id, path, label, isShared, type, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ContextMenu
        renderMenu={() => (
          <MenuList>
            <MenuItem>Open</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Move</MenuItem>
            <MenuItem>{isShared ? "Manage Access" : "Share"}</MenuItem>
            <MenuItem onClick={() => setIsOpen(true)}>Properties</MenuItem>
            <MenuDivider />
            <MenuItem color={"red.400"}>Delete</MenuItem>
          </MenuList>
        )}
      >
        {(ref) => (
          <VStack
            boxSize={36}
            rounded={4}
            pos={"relative"}
            justifyContent={"center"}
            bgColor={"#FFF"}
            _hover={{ bg: "gray.50" }}
            cursor={"pointer"}
            onClick={onClick}
            ref={ref}
          >
            {isShared ? (
              <Icon as={FaUserGroup} pos={"absolute"} top={2} right={2} />
            ) : null}
            <Image
              src={
                type == "pdf"
                  ? "/icons/pdf.png"
                  : type == "folder"
                  ? "/icons/folder.png"
                  : type == "image"
                  ? "/icons/photo.png"
                  : type == "audio"
                  ? "/icons/audio.png"
                  : type == "video"
                  ? "/icons/video.png"
                  : "/icons/file.png"
              }
              boxSize={16}
            />
            <Text fontSize={"sm"}>Folder</Text>
          </VStack>
        )}
      </ContextMenu>

      <PropertiesDrawer status={isOpen} type={type} onClose={()=>setIsOpen(false)} />
    </>
  );
};

export default ArchiveItem;
