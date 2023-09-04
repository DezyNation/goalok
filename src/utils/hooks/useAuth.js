import { useState, useEffect } from "react";
import BackendAxios from "../axios";
import Cookies from "js-cookie";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      await BackendAxios.get(`/api/users/me?populate=*`)
        .then((res) => {
          setUser({
            token: res?.data?.jwt,
            id: res?.data?.id,
            email: res?.data?.email,
            username: res?.data?.username,
            name: res?.data?.name,
            avatar: res?.data?.avatar ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${res?.data?.avatar?.url}` : null,
            role: res?.data?.role?.name,
            confirmed: res?.data?.confirmed,
            blocked: res?.data?.blocked,
            createdAt: res?.data?.createdAt,
            apiStatus: res.status,
            active: true,
          });
        })
        .catch((err) => {
          setUser({
            active: false,
            apiStatus: err?.response?.status,
            error: err,
          });
        });
    };
    fetchUser();
  }, []);

  const logout = () => {
    Cookies.remove("token");
    localStorage.clear();
    window.location.replace("/");
  }

  return { user, logout };
};

export default useAuth;
