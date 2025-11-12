import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/api";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const handleLogin = async () => {
    try {
      const res = await axiosClient.post(`/api/auth/signin`, {
        email,
        password,
      });
      if (res.status === 200) {
        const {user } = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/app";
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <section className="min-h-screen flex  justify-center  text-white">
      <Link
        to={`/`}
        className="font-extralight absolute left-16 top-8 flex items-center gap-2 text-neutral-400"
      >
        <ArrowLeft
          size={16}
          strokeWidth={2}
          className="transition-transform duration-500 group-hover:translate-x-2"
        />
        Home
      </Link>
      <div className="flex w-fit h-fit items-center justify-center mt-4 px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-8 relative  rounded-2xl overflow-hidden  border-neutral-900 border">
        <div className="xl:mx-auto w-md z-20">
          <h2 className="text-center text-2xl font-light leading-tight text-white  mb-16">
            Welcome Back
          </h2>
          <div className="pace-y-3">
            <button
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-light text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              type="button"
            >
              <span className="mr-2 inline-block">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-rose-500"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </span>
              Sign in with Google
            </button>
          </div>
          <div className="flex items-center justify-center my-8">
            <div className="flex-1 border-t border-gray-500"></div>
            <span className="mx-4 text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-500"></div>
          </div>
          <form className="mt-8" method="POST" action="#">
            <div className="space-y-5">
              <div>
                <label className="text-extralight text-sm">Email</label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="john.doe@example.com"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="text-extralight text-sm">Password</label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="•••••••••••••"
                    type={showPasswordInput ? "text" : "password"}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordInput(!showPasswordInput)}
                    className="absolute right-3 top-0 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswordInput ? (
                      <div className="flex items-center gap-2">
                        Hide <EyeOff size={18} />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Show <Eye size={18} />
                      </div>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <button
                  onClick={handleLogin}
                  className="cursor-pointer inline-flex w-full items-center justify-center rounded-md bg-neutral-950 px-3.5 py-2.5 font-extralight leading-7 text-white hover:bg-neutral-900"
                  type="button"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <div className="mt-8 flex justify-center items-center gap-2 text-neutral-600 font-extralight">
            <span>Dont have an account?</span>
            <Link to={`/register`} className="text-neutral-400 underline">
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
