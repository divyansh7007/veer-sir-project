"use client";

import AdminPanel from "@/components/AdminPanel";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { useRouter } from 'next/navigation';

import { FiTrash } from "react-icons/fi";
import { ImSpinner3 } from "react-icons/im";
import { AiOutlineArrowRight } from "react-icons/ai";

import {useUserStore} from '@/store/useUserStore';

function Page() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isAdmin } = useUserStore((state) => state)

  const getData = async () => {
    setLoading(true);
    try {
      const Data = await fetch("/api/user/getAllUsers", {
        method: "PATCH",
        cache: "no-cache",
      }).then((r) => r.json());
      const filteredUsers = await Data.users.filter((user) => {
        if (!(user.labels.includes('admin'))) {
          return user;
        }
      })
      console.log(filteredUsers);
      setUsers(filteredUsers);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      getData();
    }else {
      router.push('/')
    }
  }, [isAdmin, router]);

  const onRemovePremium = async (id) => {
    setLoading(true);
    try {
      const data = await fetch(`/api/premium/remove/${id}`, {
        method: "POST",
        cache: "no-cache",
      }).then((r) => r.json());
      getData();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onAddPremium = async (id) => {
    setLoading(true);
    try {
      const data = await fetch(`/api/premium/add/${id}`, {
        method: "POST",
        cache: "no-cache",
      }).then((r) => r.json());
      getData();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onDeleteUser = async (id) => {
    setLoading(true);
    try {
      const data = await fetch(`/api/user/deleteUser/${id}`, {
        method: "POST",
        cache: "no-cache",
      }).then((r) => r.json());
      getData();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      {loading ? (
        <ImSpinner3 className="text-blue-400 animate-spin text-center w-screen h-[25vh] mt-36" />
      ) : (
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-full w-full mx-auto overflow-auto">
            {
              users.length === 0 ? <div className="text-center text-blue-400 text-xl">No User Found!</div> : <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    User Name
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    E-mail
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Admin
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Delete User
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user.$id}>
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        {user.labels.includes("premium") ? (
                          <button
                            className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                            onClick={() => onRemovePremium(user.$id)}
                          >
                            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                            <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                              <span
                                className="relative text-white md:text-xs"
                              >
                                Remove Premium
                              </span>
                            </span>
                          </button>
                        ) : (
                          <button
                            className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                            onClick={() => onAddPremium(user.$id)}
                          >
                            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                            <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                              <span className="relative text-white md:text-xs">
                                Add Premium
                              </span>
                            </span>
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3 text-lg text-gray-900">
                        <FiTrash
                          className="cursor-pointer"
                          onClick={() => onDeleteUser(user.$id)}
                        />
                      </td>
                      <td className="w-10 text-center"></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            }
          </div>
        </div>
      )}
      <div className="text-center flex items-center justify-center -z-10">
        <Link
          href={"/admin/panel"}
          className="text-blue-200 flex hover:text-blue-500 absolute top-24 right-28"
        >
          Go To Admin Panel <AiOutlineArrowRight className="text-xl" />{" "}
        </Link>
      </div>
    </section>
  );
}

export default Page;
