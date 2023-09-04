'use client'
import { useState, useEffect, createContext } from "react";
import BackendAxios from "../axios";
import Cookies from "js-cookie";

const UserContext = createContext(null)

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false)
  useEffect(() => { 
    if(Cookies.get("token")){
      fetchUser();
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem("userInfo", JSON.stringify(user))
  },[user])

  const fetchUser = async () => {
    setUserLoading(true)
    await BackendAxios.get(`/api/users/me?populate=*`)
      .then((res) => {
        setUserLoading(false)
        setUser({
          apiStatus: res.status,
          id: res?.data?.id,
          username: res?.data?.username,
          name: res?.data?.name,
          email: res?.data?.email,
          phone: res?.data?.phone,
          totalDonations: res?.data?.totalDonations,
          avatar: res?.data?.avatar ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${res?.data?.avatar?.url}` : null,
          about: res?.data?.about,
          role: res?.data?.role?.name,
          confirmed: res?.data?.confirmed,
          blocked: res?.data?.blocked,
          createdAt: res?.data?.createdAt,
          kcExperience: res?.data?.kcExperience,
          totalDonations: res?.data?.totalDonations,
          active: true,
        });
      })
      .catch((err) => {
        setUserLoading(false)
        setUser({
          active: false,
          apiStatus: err?.response?.status,
          error: err,
        });
      });
  };


  const logout = () => {
    Cookies.remove("token");
    localStorage.clear();
    window.location.replace("/");
  }

  return { user, logout, fetchUser, userLoading, token: Cookies.get("token") };
};

export default useAuth;
export {UserContext}
