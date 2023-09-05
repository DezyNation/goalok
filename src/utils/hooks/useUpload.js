"use client";
import BackendAxios, { FormAxios } from "@/utils/axios";

const useUpload = () => {
  const uploadFiles = async ({ files, path, entityId, collection, field }) => {
    try {
      const formData = new FormData();
      formData.append("files", files);
      formData.append("path", path);
      formData.append("ref", collection);
      formData.append("refId", entityId);
      formData.append("field", field);
      
      const res = await FormAxios.post(`/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return {
        status: res.status,
        data: res.data,
      };
    } catch (error) {
      return {
        status: error?.response?.status || 408,
        message: error?.response?.data?.error?.message || error?.message,
      };
    }
  };

  const deleteFile = async ({ fileId }) => {
    try {
      const res = await BackendAxios.delete(`/api/upload/files/${fileId}`);
      return {
        status: res.status,
        data: res.data,
      };
    } catch (error) {
      return {
        status: error?.response?.status || 408,
        message: error?.response?.data?.error?.message || error?.message,
      };
    }
  };

  return { uploadFiles, deleteFile };
};

export default useUpload;
