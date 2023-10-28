"use client";

// Next Components and funcations
import Link from "next/link";
import { useRouter } from 'next/navigation';

// React components
import { useState, useEffect } from "react";

// React Icons
import { MdEmail } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";

// React Toastiy
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "@/utils/showToast";
import { login } from "@/utils/login";

// userStore
import { useUserStore } from '@/store/useUserStore';

const LogIn = () => {
  const { isLogin, setLogin, setEmail } = useUserStore((state) => state)
  const router = useRouter();

  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    if (!logInData.email || !logInData.password) {
      setLoading(false)
      return showToast("Please fill all the fields!");
    }

    const { email, password } = logInData;
    try {
      const data = await login(email, password);
      setLogin(true);
      setEmail(email);
      setLoading(false);
      router.push('/');
    }catch (error) {
      if (error.type === 'user_invalid_credentials') {
        setLoading(false);
        return showToast('Invalid Credentials!')
      }else {
        setLoading(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
  }, []);

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
        <form className="space-y-6" action="#" method="POST">
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
                  logInData.email.length > 0 ? "hidden" : ""
                } text-gray-300 relative text-2xl left-7`}
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={logInData.email}
                onChange={(e) =>
                  setLogInData({
                    ...logInData,
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
              <div className="text-sm">
                <Link
                  href="/user/forgotPassword"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center mt-2">
              <BsThreeDots
                className={`${
                  logInData.password.length > 0 ? "hidden" : ""
                } text-gray-300 relative text-2xl left-7`}
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={logInData.password}
                onChange={(e) =>
                  setLogInData({
                    ...logInData,
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
              onClick={() => onLogin()}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? (
                <ImSpinner9 className="animate-spin text-2xl" />
              ) : (
                "Log in"
              )}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/user/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up Now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
