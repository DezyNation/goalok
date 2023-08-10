"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>ISKCON Inc.</title>
      </head>
      <body>
        <ChakraProvider>
        <ProgressBar height="4px" color="#F8DE22" />
          {children}  
        </ChakraProvider>
      </body>
    </html>
  );
}
