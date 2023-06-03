'use client'
import { ChakraProvider } from '@chakra-ui/react'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ChakraProvider>
        <body>{children}</body>
      </ChakraProvider>
    </html>
  )
}
