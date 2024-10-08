"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { signIn, getCsrfToken } from "next-auth/react";

const Page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    async function fetchCsrfToken() {
      const token = await getCsrfToken();
      setCsrfToken(token);
    }
    fetchCsrfToken();
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoginInProgress(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Login failed:", result.error);
    }
    setLoggedIn(true);
    setLoginInProgress(false);
  }

  return (
    <section>
      <Navbar />
      <form
        className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-[10%]"
        onSubmit={handleFormSubmit}
      >
        <input name="csrfToken" type="hidden" value={csrfToken} />
        <h2 className="text-2xl font-bold mb-4 text-center text-[#973131]">
          Login
        </h2>
        <div className="mb-4">
          <input
            type="text" // Change to "text" for username input
            placeholder="Username"
            value={username}
            disabled={loginInProgress}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] disabled:bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            disabled={loginInProgress}
            onChange={(ev) => setEmail(ev.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] disabled:bg-gray-200"
          />
        </div>
        <div className="mb-9">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            disabled={loginInProgress}
            onChange={(ev) => setPassword(ev.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] disabled:bg-gray-200"
          />
        </div>
        <button
          type="submit"
          disabled={loginInProgress}
          className="w-full bg-[#973131] text-white rounded-lg py-2 px-4 transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-50"
        >
          {loginInProgress ? "Logging in..." : loggedIn ? "Logged in" : "Login"}
        </button>
        <div className="text-center mt-6 text-gray-500 border-t pt-4">
          Don't have an account?{" "}
          <Link
            className="underline text-[#973131] hover:text-[#761d1d]"
            href="/register"
          >
            Register here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Page;
