"use client";
import React, { useEffect, useState } from "react";

import { BsTrash } from "react-icons/bs";
import Link from "next/link";

const AdminPanel = ({ allUsers, setLoading, onClickAddAdmin, deleteUser, removeAdmin }) => {
  const [adminUser, setAdminUser] = useState([]);
  const [notAdminUser, setNoAdminUser] = useState([]);

  const renderData = async () => {
    const admin = await allUsers.filter((user) => {
      return user.labels.includes("admin");
    });

    const notAdmin = await allUsers.filter((user) => {
      return !user.labels.includes("admin");
    });

    setAdminUser(admin);

    setNoAdminUser(notAdmin);
  };

  useEffect(() => {
    renderData();
  }, []);

  return (
    <>
      <h1 className="text-2xl text-red-400 font-bold mt-8">Admin</h1>

      <div className="relative overflow-x-auto w-[95vw] mt-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Remove Admin
              </th>
              <th scope="col" className="px-6 py-3">
                Remove User
              </th>
            </tr>
          </thead>
          <tbody>
            {adminUser.map((user) => {
              return (
                <tr
                  key={user.$id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user?.name}
                  </th>
                  <td className="px-6 py-4">{user?.email}</td>
                  <td className="px-6 py-4">
                    <button
                      role="button"
                      className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
                      onClick={() => removeAdmin(user.$id)}
                    >
                      <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-purple-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
                      <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
                      <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-purple-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
                      <span className="relative text-purple-600 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
                        Remove Admin
                      </span>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <BsTrash
                      className="text-xl cursor-pointer"
                      onClick={() => deleteUser(user.$id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h1 className="text-2xl text-red-400 font-bold mt-8">Add Admin</h1>

      <div className="relative overflow-x-auto w-[95vw] mt-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Add Admin
              </th>
              <th scope="col" className="px-6 py-3">
                Remove User
              </th>
            </tr>
          </thead>
          <tbody>
            {notAdminUser.map((user) => {
              return (
                <tr
                  key={user.$id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user?.name}
                  </th>
                  <td className="px-6 py-4">{user?.email}</td>
                  <td className="px-6 py-4">
                    <button
                      role="button"
                      className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
                      onClick={() => onClickAddAdmin(user.$id)}
                    >
                      <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-purple-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
                      <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
                      <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-purple-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
                      <span className="relative text-purple-600 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
                        Add Admin
                      </span>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <BsTrash
                      className="text-xl cursor-pointer"
                      onClick={() => deleteUser(user.$id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {notAdminUser.length === 0 && (
          <h1 className="text-lg text-center text-orange-300 font-bold mt-5">
            No any User found that does not have subscription
          </h1>
        )}
      </div>
    </>
  );
};

export default AdminPanel;
