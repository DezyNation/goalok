"use client";
import { useToast } from "@chakra-ui/react";


const Toast = ({ title, description, status, duration }) => {
  const CustomToast = useToast({ position: "top-right" });
  return CustomToast({
    status: status,
    title: title,
    description: description,
    duration: duration || 3000
  });
};

export default Toast;
