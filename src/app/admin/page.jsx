/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { account } from "@/appwrite/config";

import { useUserStore } from "@/store/useUserStore";

import { ImSpinner9 } from "react-icons/im";
import { BsTrash } from "react-icons/bs";
import Link from "next/link";
import Premium from "@/components/Premium";
import AdminPanel from "@/components/AdminPanel";

const page = () => {
  const router = useRouter();

  const { isLogin, isAdmin } = useUserStore((state) => state);

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataType, setDataType] = useState("admin");

  const getUserData = async () => {
    setLoading(true);
    const data = await fetch("/api/getAllUsers", {
      method: "GET",
    }).then(async (r) => await r.json());
    setAllUsers(data.promise?.users);
    setLoading(false);
  };

  const onClickPremium = async (id) => {
    setLoading(true);
    const res = await fetch(`/api/addPremium/${id}`, {
      method: "GET",
    });
    getUserData();
  };

  const deleteUser = async (id) => {
    setLoading(true);
    const promise = await fetch(`/api/deleteUser/${id}`, {
      method: "GET",
    });
    getUserData();
  };

  const onClickAddAdmin = async (id) => {
    setLoading(true);
    const res = await fetch(`/api/addAdmin/${id}`, {
      method: "GET",
    });
    getUserData();
  };

  const removePremium = async (id) => {
    setLoading(true);
    const res = await fetch(`/api/removePremium/${id}`, {
      method: "GET",
    });
    getUserData();
  };

  const removeAdmin = async (id) => {
    setLoading(true);
    const res = await fetch(`/api/removeAdmin/${id}`, {
      method: "GET",
    });
    getUserData();
  };

  useEffect(() => {
    if (isAdmin && isLogin) {
      getUserData();
    } else {
      router.push("/");
    }
  }, [isLogin, isAdmin]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <ImSpinner9 className="text-center animate-spin text-9xl text-blue-400" />
      </div>
    );
  }

  return (
    <>
    <div className="w-screen flex flex-col items-center justify-center">
      <div className="w-screen bg-blue-50 rounded-md mt-5 h-20 flex items-center justify-center text-orange-400 hover:text-orange-600 hover:font-extrabold">
        <div className="Heading flex items-center justify-center text-center text-2xl font-bold space-x-5">
          <button
            onClick={() => setDataType("admin")}
            className="first cursor-pointer hover:underline"
          >
            Admin Panel
          </button>
          <button
            onClick={() => setDataType("premium")}
            className="second cursor-pointer hover:underline"
          >
            Premium
          </button>
        </div>
      </div>
      {dataType === "admin" ? (
        <AdminPanel
          allUsers={allUsers}
          setLoading={setLoading}
          deleteUser={deleteUser}
          onClickAddAdmin={onClickAddAdmin}
          removeAdmin={removeAdmin}
        />
      ) : (
        <Premium
          allUsers={allUsers}
          setLoading={setLoading}
          deleteUser={deleteUser}
          onClickPremium={onClickPremium}
          removePremium={removePremium}
        />
      )}
    </div>
    </>
  );
};

export default page;
