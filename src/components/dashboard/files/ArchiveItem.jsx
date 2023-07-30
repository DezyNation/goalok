"use client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
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

const DeleteAlert = ({status, onClose}) => {
  const cancelRef = React.useRef()

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={status}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete File?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this file?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

const ArchiveItem = ({ id, path, label, isShared, type, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false)

  return (
    <>
      <ContextMenu
        renderMenu={() => (
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Move</MenuItem>
            <MenuItem>{isShared ? "Manage Access" : "Share"}</MenuItem>
            <MenuItem onClick={() => setIsOpen(true)}>Properties</MenuItem>
            <MenuDivider />
            <MenuItem color={"red.400"} onClick={()=>setShowDelete(true)}>Delete</MenuItem>
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
      <DeleteAlert status={showDelete} onClose={()=>setShowDelete(false)} />
    </>
  );
};

export default ArchiveItem;
