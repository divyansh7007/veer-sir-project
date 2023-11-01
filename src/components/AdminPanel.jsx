import React from "react";

import { FiTrash } from "react-icons/fi";

function AdminPanel() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-full w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
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
              <tr>
                <td className="px-4 py-3">Divyansh Sahu</td>
                <td className="px-4 py-3">divyanshsahuji7007@gmail.com</td>
                <td className="px-4 py-3">
                  <button
                    className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                  >
                    <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                    <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                      <span className="relative text-white md:text-xs">Add Admin</span>
                    </span>
                  </button>
                </td>
                <td className="px-4 py-3 text-lg text-gray-900">
                  <FiTrash />
                </td>
                <td className="w-10 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AdminPanel;
