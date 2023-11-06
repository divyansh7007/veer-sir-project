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
  const [data, setData] = useState('');
  const [findError, setFindError] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const getSubjects = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        `/api/database/getPdf/${params.class}/${params.subject}/${params.id}`,
        {
          method: "PATCH",
        }
      ).then((r) => r.json());
      if (data.error === "Database not found") {
        setFindError(true);
      }
      setData(data?.promise?.pdfUrl);
      setTotalResults(data?.promise?.total)
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
              Sorry, We could not found data. Please visit the notes section to
              find our notes.{" "}
              <Link
                className="text-xl text-blue-400 hover:text-blue-500 hover:underline"
                href={"/notes"}
              >
                Go To Notes
              </Link>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <iframe src={data} className="h-screen w-screen"></iframe>
  );
}

export default Page;
