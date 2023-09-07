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
    fetchUser();
  }, []);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(user));
  }, [user]);

  const fetchUser = async () => {
    setUserLoading(true);
    await BackendAxios.get(`/api/users/me?populate=*`)
      .then(async (res) => {
        setUserLoading(false);
        setUser({
          apiStatus: res.status,
          id: res?.data?.id,
          username: res?.data?.username,
          name: res?.data?.name,
          email: res?.data?.email,
          phone: res?.data?.phone,
          totalDonations: res?.data?.totalDonations,
          avatar: res?.data?.avatar ? `${res?.data?.avatar?.url}` : null,
          about: res?.data?.about,
          role: res?.data?.role?.name,
          confirmed: res?.data?.confirmed,
          blocked: res?.data?.blocked,
          createdAt: res?.data?.createdAt,
          kcExperience: res?.data?.kcExperience,
          totalDonations: res?.data?.totalDonations,
          active: true,
        });
        await rcToken();
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

      await rcLogin({
        password: password,
      });
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
      await rcRegister({
        email: email,
        password: password,
        username: username,
      });
      return {
        status: res.status,
        message: "Confirmation mail sent!",
        data: res.data,
      };
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
    if (pathname.includes("dashboard")) {
      window.location.replace("/");
    }
  };

  const rcRegister = async ({ email, password, username }) => {
    await DefaultAxios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rc/register`,
      {
        email: email,
        username: username,
        password: password,
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("err registering to rc", err);
      });
  };

  const rcLogin = async ({ password, username }) => {
    await DefaultAxios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rc/login`,
      {
        password: password,
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("err login to rc", err);
      });
  };

  const rcToken = async () => {
    BackendAxios.get(`/api/rc/token`)
      .then((res) => {
        Cookies.set("rcToken", res.data?.token);
      })
      .catch((err) => {
        console.log("err getting token rc", err);
      });
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
