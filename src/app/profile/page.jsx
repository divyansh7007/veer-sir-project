/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState, useEffect } from "react";

import { account } from "@/appwrite/config";

import { ImSpinner9 } from "react-icons/im";

import Avatar from "react-avatar";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    setLoading(true);
    const promise = await account.get();
    setUserData(promise);
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <ImSpinner9 className="text-9xl animate-spin text-blue-400 text-center" />
      </div>
    );
  }

  return (
    <div className="w-screen items-center justify-center mt-5">
      <div className="img flex items-center justify-center">
        <Avatar
          className="h-32 rounded-full text-xl font-bold"
          name={userData.name}
        />
      </div>

      <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User Name
            </label>
            <div className="flex items-center justify-center mt-2">
              <p className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" ></p>
            </div>
          </div>
    </div>
  );
};

export default page;
