"use client";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

import { account } from "@/appwrite/config";

import { ImSpinner9 } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";

import { useUserStore } from "@/store/useUserStore";

import Avatar from "react-avatar";

import { ToastContainer } from "react-toastify";
import { showToast } from "@/utils/showToast";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [enteredUserData, setEnteredUserData] = useState({});

  const router = useRouter();

  const { isLogin } = useUserStore((state) => state);

  const getUserData = async () => {
    try {
      setLoading(true);
      const promise = await account.get();
      setUserData(promise);
      setEnteredUserData(promise);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    setEmailLoading(true);
    try {
      const data = await account.createVerification(
        `${process.env.NEXT_PUBLIC_DOMAIN}/verifyEmail`
      );
      showToast("Please check your e-mail!");
      setEmailLoading(false);
    } catch (error) {
      console.log(error);
      setEmailLoading(false);
      showToast("Some error occur, please try again after some time!");
    }
  };

  useEffect(() => {
    setLoading(true);
    if (isLogin) {
      getUserData();
    } else {
      router.push("/user/login");
      setLoading(false);
    }
  }, [isLogin, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <ImSpinner9 className="text-9xl animate-spin text-blue-400 text-center" />
      </div>
    );
  }

  const updateEmail = async () => {
    setLoading(true);
    try {
      const req = await fetch("/api/update/email", {
        method: "PUT",
        body: JSON.stringify({
          email: enteredUserData.email,
          id: enteredUserData.$id,
        }),
      });
      getUserData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateUserName = async () => {
    setLoading(true);
    try {
      const req = await fetch("/api/update/userName", {
        method: "PUT",
        body: JSON.stringify({
          name: enteredUserData.name,
          id: enteredUserData.$id,
        }),
      });
      getUserData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updatePhoneNumber = async () => {
    setLoading(true);
    try {
      const req = await fetch("/api/update/phoneNumber", {
        method: "PUT",
        body: JSON.stringify({
          number: enteredUserData.phone,
          id: enteredUserData.$id,
        }),
      }).then(r => r.json());
      if (req.error) {
        showToast(req.error)
      }
      getUserData();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen items-center justify-center mt-5">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="img flex items-center justify-center">
        <Avatar
          className="h-32 rounded-full text-xl font-bold"
          name={enteredUserData.name}
        />
      </div>

      <div>
        <div className="flex items-center justify-center space-x-2 mt-5">
          <label
            htmlFor="userName"
            className="block font-bold text-xl leading-6 text-gray-900"
          >
            User Name:
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input
              type="text"
              id="userName"
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={enteredUserData.name}
              onChange={(e) =>
                setEnteredUserData({
                  ...enteredUserData,
                  name: e.target.value,
                })
              }
            />
          </div>
          {userData.name === enteredUserData.name ? (
            <></>
          ) : (
            <button
              className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white"
              onClick={() => updateUserName()}
            >
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
              <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
                Update
              </span>
            </button>
          )}
        </div>
        <div className="flex items-center justify-center space-x-2 mt-5">
          <label
            htmlFor="email"
            className="block font-bold text-xl leading-6 text-gray-900"
          >
            Email:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={enteredUserData.email}
              onChange={(e) =>
                setEnteredUserData({
                  ...enteredUserData,
                  email: e.target.value,
                })
              }
            />
          </div>
          {userData.email === enteredUserData.email ? (
            <></>
          ) : (
            <button
              className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white"
              onClick={() => updateEmail()}
            >
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
              <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
                Update
              </span>
            </button>
          )}
          {!userData.emailVerification && (
            <button
              className={`rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-${
                emailLoading ? "none" : "pointer"
              } border-2 font-medium border-indigo-600 text-indigo-600 text-white`}
              onClick={() => {
                if (!emailLoading) {
                  verifyEmail();
                }
              }}
            >
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
              <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
                {emailLoading ? (
                  <ImSpinner9 className="text-center text-lg animate-spin" />
                ) : (
                  "Verify Your Email"
                )}
              </span>
            </button>
          )}
        </div>
        <div className="flex items-center justify-center space-x-2 mt-5">
          <label
            htmlFor="phone"
            className="block font-bold text-xl leading-6 text-gray-900"
          >
            Phone Number:
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <FaPhoneAlt className="text-lg text-gray-500 dark:text-gray-400" />
            </span>
            <input
              type="number"
              id="phone"
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={enteredUserData.phone}
              onChange={(e) =>
                setEnteredUserData({
                  ...enteredUserData,
                  phone: e.target.value,
                })
              }
            />
          </div>
          {userData.phone === enteredUserData.phone ? (
            <></>
          ) : (
            <button
              className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white"
              onClick={() => updatePhoneNumber()}
            >
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
              <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
                Update
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
