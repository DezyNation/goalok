"use client";
import { DefaultAxios } from "@/utils/axios";
import useApiHandler from "@/utils/hooks/useApiHandler";
import React, { useEffect } from "react";

const page = () => {
  const [items, setItems] = useState([]);
  const { handleError } = useApiHandler();

  useEffect(() => {
    fetchItems();
  }, []);

  function fetchItems() {
    DefaultAxios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/knowledgebase/latest`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        handleError(err, "Error while fetching items");
      });
  }

  return <>
  </>;
};

export default page;
