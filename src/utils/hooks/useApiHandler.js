'use client'

import { useToast } from '@chakra-ui/react'
import useAuth from './useAuth'
import {API_BASE_URL} from '@/utils/constants'
import Cookies from 'js-cookie'
import axios from 'axios'

const useApiHandler = () => {
    const {logout, user} = useAuth()
    const Toast = useToast()
    
    const handleError = (error, title) => {
        if (error?.response?.status == 401) {
            Toast({
              status: "warning",
              title: "Your session expired!",
              description: "Please login again",
            });
            logout();
            return;
          }
        Toast({
            status: 'error',
            ...(title && {title: title}),
            description: error?.response?.data?.error?.message || error?.response?.data?.message || error?.message,
        })
    }


  const uploadAndAttachMedia = async ({
    files,
    path,
    entryId,
    field,
    modelName,
  }) => {
    try {
      if (!files.length) {
        Toast({status: "error", description: "No files selected"});
        throw new Error("No files selected");
      }
      if (!entryId) {
        Toast({status: "error", description: "No entity ID for uploading"});
        throw new Error("Entry ID is required");
      }
      const form = new FormData();
      for (let i = 0; i < files?.length; i++) {
        const file = files[i];
        form.append("files", file);
      }
    //   form.append("path", `/user_${user?.id}/${path}`);
      form.append("field", field);
      form.append("refId", entryId);
      form.append("ref", modelName);
      const res = await axios.post(`${API_BASE_URL}/upload`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      });
      console.log(res.data);
      return {
        message: `${field} Files uploaded successfully!`,
        data: res.data,
      };
    } catch (error) {
      Toast({status: "error", description: "Error uploading media"});
      console.log(error)
      throw new Error(`Error uploading ${field}`);
    }
  };


    return {
        handleError,
        uploadAndAttachMedia
    }
}

export default useApiHandler