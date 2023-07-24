'use client'
import { Box } from '@chakra-ui/react'
import React from 'react'

const BlankSpacer = ({height}) => {
  return (
    <>
    <Box w={'full'} h={height || 24}></Box>
    </>
  )
}

export default BlankSpacer