'use client'
import React, { useContext } from 'react'
import { UserContext } from '@/utils/hooks/useAuth';

const page = () => {
  const { user, logout } = useContext(UserContext);
  return (
    <>
        
    </>
  )
}

export default page