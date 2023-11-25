"use client";

import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

// Next Components and funcations
import Link from "next/link";
import { usePathname } from "next/navigation";

// zustand store
import { useUserStore } from "@/store/useUserStore";

// Avatar
import Avatar from "react-avatar";
import { account } from "@/appwrite/config";

// React Icons
import { CgSpinnerAlt } from 'react-icons/cg';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  const {
    isLogin,
    isAdmin,
    userName,
    setUserName,
    setEmail,
    setLogin,
    setAdmin,
    setPremium,
    setUserId,
  } = useUserStore((state) => state);

  const navigation = [
    { name: "Home", href: "/", current: pathname === "/" },
    { name: "Notes", href: "/notes", current: pathname === "/notes" },
  ];

  const getUserData = async () => {
    setLoading(true);
    if (isLogin) {
      try {
        const userData = await account.get();
        setEmail(userData.email);
        setUserName(userData.name);
        setUserId(userData.$id)
        if (userData.labels.includes('admin')){
          setAdmin(true);
        }
        if (userData.labels.includes('premium')){
          setPremium(true);
        }
        setLoading(false);
      } catch (error) {
        if (error.type === "general_unauthorized_scope") {
          setLogin(false);
          setLoading(false);
          return;
        } else {
          console.log(error.message);
          setLogin(false);
          return error;
        }
      }
    } else {
      return setLoading(false);
    }
  };

  const onLogOut = async () => {
    setLogin(false);
    setEmail("");
    setUserName("");
    const logout = await account.deleteSessions();
  };

  useEffect(() => {
    const data = getUserData();
  }, [isLogin]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link href={"/"} className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto rounded-full"
                    src="https://cloud.appwrite.io/v1/storage/buckets/6561ba5cf2ba2dbc3d32/files/6561ba8b37ce9ac55037/view?project=6540ae3adcb32868f4c2&mode=admin"
                    alt="Your Company"
                  />
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {isLogin ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {
                          loading ? <CgSpinnerAlt className="rounded-full avatar text-xl font-bold animate-spin text-blue-300" /> : <Avatar
                          className="h-8 rounded-full avatar text-xl font-bold"
                          name={userName}
                        />

                        }
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        {isAdmin && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={"/admin/panel"}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Admin Panel
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() => onLogOut()}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="flex items-center justify-center w-full space-x-2">
                    <Link
                      href="/user/login"
                      className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                    >
                      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                      <span className="relative px-3 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                        <span className="relative text-white">Log In</span>
                      </span>
                    </Link>
                    <Link
                      href="/user/signup"
                      className="hidden lg:inline-flex relative p-0.5 items-center justify-center font-bold overflow-hidden group rounded-md"
                    >
                      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                      <span className="relative px-3 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                        <span className="relative text-white">Sign Up</span>
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
