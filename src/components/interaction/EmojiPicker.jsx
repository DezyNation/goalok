"use client";
import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { LuSmilePlus } from "react-icons/lu";

const CustomEmojiPicker = ({ onEmojiSelect, onClose, onClick, isOpen }) => {
  return (
    <>
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <IconButton
            bgColor={"transparent"}
            rounded={"full"}
            onClick={onClick}
            icon={<LuSmilePlus size={'28'} />}
            fontSize={'sm'}
            color={"gray.400"}
          />
        </PopoverTrigger>
        <PopoverContent>
            <Picker data={data} onEmojiSelect={onEmojiSelect} previewPosition={'none'} />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CustomEmojiPicker;
