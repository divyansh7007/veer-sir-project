"use client";
import { useUserStore } from "@/store/useUserStore";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";
import { TbNotes } from "react-icons/tb";

function Page({ params }) {
  const { premium, isAdmin, isLogin } = useUserStore((state) => state);

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [findError, setFindError] = useState(false);

  const getSubjects = async () => {
    setLoading(true);
    try {
      const data = await fetch(`/api/database/getSubjects/${params.class}`, {
        method: "PATCH",
      }).then((r) => r.json());
      if (data.error === "Database not found") {
        setFindError(true);
      }
      setData(data?.promise?.collections || []);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLogin) {
      return router.push("/");
    } else if (premium || isAdmin) {
      getSubjects();
    } else if (!premium) {
      return router.push("/notes");
    }
  }, [isLogin, premium, isAdmin, router]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <ImSpinner2 className="text-center text-9xl animate-spin text-blue-500" />
      </div>
    );
  }

  if (findError) {
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            <p className="leading-relaxed text-lg">
              Sorry, We could not found data. Please visit the notes section to find our notes. <Link className="text-xl text-blue-400 hover:text-blue-500 hover:underline" href={'/notes'}>Go To Notes</Link>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            Select Your Subject
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {data.map(function (c) {
            return (
              <Link
                href={`/notes/${params.class}/${c.$id}`}
                key={c.$id}
                className="p-4 md:w-1/3"
              >
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center justify-center mb-3 text-center">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <TbNotes className="text-xl" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">{c.name}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Page;
