'use client'
import {
    useToast
} from '@chakra-ui/react'
import useAuth from './useAuth'

const useApiHandler = () => {
    const {logout} = useAuth()
    const Toast = useToast({
        position: 'top-right'
    })
    const handleError = (error) => {
        if (error?.response?.status == 401 || error?.response?.status == 403) {
            Toast({
              status: "warning",
              title: "Your session expired!",
              description: "Please login again",
            });
            logout();
            return;
          }
        Toast({
            status: 'error',
            description: error?.response?.data?.error?.message || error?.message,
        })
    }

    return {
        handleError
    }
}

export default useApiHandler