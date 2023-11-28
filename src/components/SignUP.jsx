"use client";

// Next Components and funcations
import Link from "next/link";
import { useRouter } from "next/navigation";

// React components
import { useState } from "react";

// React Icons
import { BiSolidUserCircle } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";

// React Toastiy
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "@/utils/showToast";

// Utils
import { login } from "@/utils/login";

// appwrite configs
import { account, ID } from "@/appwrite/config";

// zustand
import { useUserStore } from "@/store/useUserStore";
import InformationProvider from "./InformationProvider";

const SignUp = () => {
  const { setLogin } = useUserStore((state) => state);

  const [signUpData, setSignUpData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const onSignUp = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { userName, email, password } = signUpData;

    if ((!userName || !email, !password)) {
      setLoading(false);
      return showToast("Please fill all the fields!");
    }

    if (password.length < 8) {
      setLoading(false);
      return showToast("Please enter minimum 8 characters for password!");
    }

    try {
      const promise = await account
        .create(ID.unique(), email, password, userName)
        .then(() => login(email, password));
      setLogin(true);
      router.push("/");
    } catch (error) {
      setLoading(false);
      if (error.type === "user_already_exists") {
        return showToast("Email Id is already exists!");
      }else if(error.type === 'user_email_already_exists') {
        setLoading(false);
        return showToast('Email Id is already registered!')
      }
      setLoading(false)
      return console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User Name
            </label>
            <div className="flex items-center justify-center mt-2">
              <BiSolidUserCircle
                className={`${
                  signUpData.userName.length > 0 ? "hidden" : ""
                } text-gray-300 relative text-2xl left-7`}
              />
              <input
                id="userName"
                name="userName"
                type="userName"
                autoComplete="userName"
                required
                className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={signUpData.userName}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    userName: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="flex items-center justify-center mt-2">
              <MdEmail
                className={`${
                  signUpData.email.length > 0 ? "hidden" : ""
                } text-gray-300 relative text-2xl left-7`}
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={signUpData.email}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="flex items-center justify-center mt-2">
              <BsThreeDots
                className={`${
                  signUpData.password.length > 0 ? "hidden" : ""
                } text-gray-300 relative text-2xl left-7`}
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={signUpData.password}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    password: e.target.value,
                  })
                }
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword(!showPassword)}
                  className="relative right-8 text-2xl cursor-pointer"
                />
              ) : (
                <AiFillEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="relative right-8 text-2xl cursor-pointer"
                />
              )}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={(e) => onSignUp(e)}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? (
                <ImSpinner9 className="animate-spin text-2xl" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have a account?{" "}
          <Link
            href="/user/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            LogIn Now!
          </Link>
        </p>
      </div>
      <InformationProvider />
    </div>
  );
};

export default SignUp;
