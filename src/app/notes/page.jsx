"use client";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/store/useUserStore";

import React, { useEffect, useState } from "react";

import { TbNotes } from 'react-icons/tb';
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";

function Page() {
  const router = useRouter();

  const { premium, isAdmin, isLogin } = useUserStore((state) => state);

  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  const getClassData = async () => {
    setLoading(true);
    try {
      const data = await fetch("/api/database/getClasses", {
        method: "PATCH"
      }).then(r => r.json());
      setClasses(data.classes.databases);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isLogin) {
      return router.push('/')
    }else if (premium || isAdmin) {
      getClassData();
    }
  }, [isLogin, premium, isAdmin, router]);

  if (loading) {
    return (<div className="w-screen h-screen flex items-center justify-center"><ImSpinner2 className="text-center text-9xl animate-spin text-blue-500" /></div>)
  }

  if (premium || isAdmin) {
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
              WelCome to PCC
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Select Your Class
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            {
              classes.map(function (c) {
                return <Link href={`/notes/${c.$id}`} key={c.$id} className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center justify-center mb-3 text-center">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <TbNotes className="text-xl" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">
                      {c.name}
                    </p>
                  </div>
                </div>
              </Link>
              })
            }
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
      <p className="leading-relaxed text-lg">Sorry, You cannot access the notes because you did not have premium member ship to claim it contact us on {process.env.NEXT_PUBLIC_PHONE_NUMBER}</p>
    </div>
  </div>
</section>
  )
}

export default Page;
