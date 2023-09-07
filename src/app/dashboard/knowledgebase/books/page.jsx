"use client";
import { DefaultAxios } from "@/utils/axios";
import useApiHandler from "@/utils/hooks/useApiHandler";
import React, { useEffect } from "react";

const page = () => {
  const [books, setBooks] = useState([]);
  const { handleError } = useApiHandler();

  useEffect(() => {
    fetchBooks();
  }, []);

  function fetchBooks() {
    DefaultAxios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/knowledgebase/books`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        handleError(err, "Error while fetching books");
      });
  }

  return <></>;
};

export default page;
