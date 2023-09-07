'use client'
// components/ChakraPageFlip.js
import React, { useState } from 'react';
import PageFlip from 'react-pageflip';
import { Box, IconButton, VStack } from '@chakra-ui/react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const BookViewer = ({ pdfUrl }) => {
  const [page, setPage] = useState(1);

  const handlePageChange = (e) => {
    setPage(e);
  };

  const nextPage = () => {
    if (page < 2) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <VStack spacing={4} align="center">
      <Box position="relative">
        <PageFlip
          width={400}
          height={600}
          onFlip={handlePageChange}
          className="page-flip"
        >
          {/* Left Page */}
          <div className="page" data-page={page}>
          <iframe
              title="pdf-view"
              src={pdfUrl}
              width="100%"
              height="100%"
              style={{
                width: "100%",
                height: "100%",
                border: "0"
              }}
            />
          </div>

          {/* Right Page */}
          <div className="page" data-page={page + 1}>
            <iframe
              title="pdf-view"
              src={pdfUrl}
              width="100%"
              height="100%"
              style={{
                width: "100%",
                height: "100%",
                border: "0"
              }}
            />
          </div>
        </PageFlip>
      </Box>
      <IconButton
        aria-label="Previous Page"
        icon={<BsArrowLeft size={20} />}
        onClick={prevPage}
        isDisabled={page === 1}
      />
      <IconButton
        aria-label="Next Page"
        icon={<BsArrowRight size={20} />}
        onClick={nextPage}
        isDisabled={page === 2}
      />
    </VStack>
  );
};

export default BookViewer;
