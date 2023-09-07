"use client";
import BookViewer from "@/components/dashboard/knowledgebase/BookViewer";
import BackendAxios from "@/utils/axios";
import useApiHandler from "@/utils/hooks/useApiHandler";
import { Text } from "@chakra-ui/react";
import { useState } from "react";

const MyPdfPage = (params) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const { slug } = params;
  const { handleError } = useApiHandler();
  useEffect(() => {
    if (slug) {
      fetchBookInfo();
    }
  }, [slug]);

  function fetchBookInfo() {
    BackendAxios.get(`/api/knowledgebase/books/${slug}/url`)
      .then((res) => {
        pdfUrl(res.data);
      })
      .catch((err) => {
        handleError(err, "Error while fetching book info");
      });
  }
  return (
    <div>
      <Text py={4}>PDF Viewer with Page Flip {slug}</Text>
      <BookViewer pdfUrl={pdfUrl} />
    </div>
  );
};

export default MyPdfPage;
