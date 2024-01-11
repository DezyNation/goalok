"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Krishna Consciousness Society</title>
      </head>
      <body>
        <ChakraProvider
          toastOptions={{ defaultOptions: { position: "top-right" } }}
        >
          <ProgressBar height="4px" color="#F8DE22" />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
