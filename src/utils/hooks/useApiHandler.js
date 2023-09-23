'use client'
import Toast from '@/components/global/Toast'
import useAuth from './useAuth'

const useApiHandler = () => {
    const {logout} = useAuth()
    
    const handleError = (error, title) => {
        if (error?.response?.status == 401) {
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
            ...(title && {title: title}),
            description: error?.response?.data?.error?.message || error?.response?.data?.message || error?.message,
        })
    }

    return {
        handleError
    }
}

export default useApiHandler