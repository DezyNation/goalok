"use client";
import { useState, useEffect, createContext } from "react";
import BackendAxios, { DefaultAxios, FormAxios } from "../axios";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

const UserContext = createContext(null);

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser(userInfo);
      return;
    }
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setUserLoading(true);
    await BackendAxios.get(`/api/users/me?populate=*`)
      .then(async (res) => {
        setUserLoading(false);
        const data = {
          apiStatus: res.status,
          id: res?.data?.id,
          email: res?.data?.email,
          username: res?.data?.username,
          name: res?.data?.name,
          gender: res?.data?.gender,
          spiritualName: res?.data?.spiritualName,
          telegramId: res?.data?.telegramId,
          country: res?.data?.country,
          state: res?.data?.state,
          zipCode: res?.data?.zipCode,
          phone: res?.data?.phone,
          totalDonations: res?.data?.totalDonations,
          avatar: res?.data?.avatar?.url,
          about: res?.data?.about,
          qualification: res?.data?.qualification,
          role: res?.data?.role?.name,
          confirmed: res?.data?.confirmed,
          blocked: res?.data?.blocked,
          createdAt: res?.data?.createdAt,
          kcExperience: res?.data?.kcExperience,
          totalDonations: res?.data?.totalDonations,
          active: true,
        };
        setUser(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
      })
      .catch((err) => {
        if (err?.response?.status > 400) {
          logout();
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
        message: "Login Successful",
        data: res.data,
      };
    } catch (error) {
      return {
        status: error?.response?.status,
        message: error?.response?.data?.error?.message || error?.message,
      };
    }
  };

  const register = async ({ email, name, password }) => {
    try {
      const res = await DefaultAxios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/register`,
        {
          email,
          username: email?.split("@")[0],
          password,
          name: name,
        }
      );
      return {
        status: res.status,
        message: "Confirmation mail sent!",
        data: res.data,
      };
    } catch (error) {
      throw new Error(error?.response?.data?.error?.message || error?.message);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.clear();
    if (pathname.includes("dashboard")) {
      window.location.replace("/");
    }
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
