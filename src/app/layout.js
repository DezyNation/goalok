"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import "./globals.css";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>ISKCON Inc.</title>
      </head>
      <body>
        <ChakraProvider
          toastOptions={{ defaultOptions: { position: "top-right" } }}
        >
          <ProgressBar height="4px" color="#F8DE22" />
          {children}
        </ChakraProvider>

        <TawkMessengerReact propertyId="6564dcb01db16644c55521b1" widgetId="1hg8vs518" />
      </body>
    </html>
  );
}
