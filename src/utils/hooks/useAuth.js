"use client";
import { useState, useEffect, createContext } from "react";
import BackendAxios, { DefaultAxios, FormAxios } from "../axios";
import Cookies from "js-cookie";

const UserContext = createContext(null);

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  useEffect(() => {
    if (Cookies.get("token")) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(user));
  }, [user]);

  const fetchUser = async () => {
    setUserLoading(true);
    await BackendAxios.get(`/api/users/me?populate=*`)
      .then((res) => {
        setUserLoading(false);
        setUser({
          apiStatus: res.status,
          id: res?.data?.id,
          username: res?.data?.username,
          name: res?.data?.name,
          email: res?.data?.email,
          phone: res?.data?.phone,
          totalDonations: res?.data?.totalDonations,
          avatar: res?.data?.avatar
            ? `${res?.data?.avatar?.url}`
            : null,
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
        if(err?.response?.status > 400){
          logout()
        }
        setUserLoading(false);
        setUser({
          active: false,
          apiStatus: err?.response?.status,
          error: err,
        });
      });
  };

  const login = async ({ identifier, password, remember }) => {
    try {
      const res = await DefaultAxios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`,
        {
          identifier,
          password,
        }
      );
        Cookies.set("token", res.data?.jwt, {
          expires: 3,
          secure: process.env.NODE_ENV === "production",
        });
      
      BackendAxios.defaults.headers.common.Authorization = `Bearer ${res.data?.jwt}`;
      FormAxios.defaults.headers.common.Authorization = `Bearer ${res.data?.jwt}`;
      return {
        status: res.status,
        message:"Login Successful",
        data: res.data
      }
    } catch (error) {
      return {
        status: error?.response?.status,
        message: error?.response?.data?.error?.message || error?.message,
      };
    }
  };


  const register = async ({ email, username, password }) => {
    try {
      const res = await DefaultAxios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/register`,
        {
          email,
          username,
          password,
        }
      );
      return {
        status: res.status,
        message:"Confirmation mail sent!",
        data: res.data
      }
    } catch (error) {
      return {
        status: error?.response?.status,
        message: error?.response?.data?.error?.message || error?.message,
      };
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.clear();
    window.location.replace("/");
  };

  return {
    user,
    logout,
    fetchUser,
    userLoading,
    token: Cookies.get("token"),
    login,
    register,
  };
};

export default useAuth;
export { UserContext };
