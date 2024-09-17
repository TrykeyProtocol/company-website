"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/library/components/atoms/logo";
import { Eye, EyeOff } from "lucide-react";
import { SiGoogle } from "@icons-pack/react-simple-icons";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightMode-background-secondary dark:bg-darkMode-background-secondary p-4 transition-colors duration-300">
      <div className="w-full max-w-7xl h-auto md:h-[80vh] bg-lightMode-background-main dark:bg-darkMode-background-main rounded-3xl overflow-hidden md:shadow-2xl flex flex-col md:flex-row transition-colors duration-300">
        {/* Left side - Login form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 md:py-16 md:px-20 flex flex-col justify-between items-center">
          <div className="flex flex-col items-center mb-6 md:mb-0">
            <p className="text-sm text-lightMode-text-main dark:text-darkMode-text-main transition-colors duration-300">
              WELCOME TO
            </p>
            <Logo width={"180px"} className="md:w-[200px]" />
          </div>

          <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4 w-full mb-4 md:mb-0">
            <label
              htmlFor="username"
              className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full border-none text-base text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-2 placeholder-gray-400"
              placeholder="Enter Username"
            />
          </div>

          <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4 w-full mb-4 md:mb-0">
            <label
              htmlFor="password"
              className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="px-0 py-2 w-full border-none text-base text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none transition-colors duration-300"
              placeholder="Enter Password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lightMode-text-main dark:text-darkMode-text-main transition-colors duration-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-[45px] md:h-[50px] bg-lightMode-button-background dark:bg-darkMode-button-background text-lightMode-button-text dark:text-darkMode-button-text py-2 px-4 rounded-full focus:outline-none transition-colors duration-300 text-base dark:hover:bg-darkMode-button-background/90 hover:bg-lightMode-button-background/90"
            onClick={() => router.push("/dashboard")}
          >
            Log In
          </button>
          <div className="w-full flex flex-col items-center gap-3 mt-4 md:mt-0">
            <div className="text-center text-sm text-lightMode-text-main dark:text-darkMode-text-main transition-colors duration-300">
              Don&apos;t have an account?{" "}
              <a
                href="/sign-up"
                className="font-medium text-lightMode-text-accent dark:text-darkMode-text-accent hover:text-lightMode-button-background/90 dark:hover:text-darkMode-button-background/90 transition-colors duration-300"
              >
                Sign up
              </a>
            </div>

            <div className="relative flex items-center w-4/5">
              <div className="flex-grow border-t border-lightMode-text-main dark:border-darkMode-text-main"></div>
              <span className="px-2 text-sm text-lightMode-text-main dark:text-darkMode-text-main">
                Or
              </span>
              <div className="flex-grow border-t border-lightMode-text-main dark:border-darkMode-text-main"></div>
            </div>
            <div className="text-center text-sm text-lightMode-text-main dark:text-darkMode-text-main">
              Continue with
            </div>

            <button className="w-4/5 flex items-center justify-center px-4 py-2 border border-lightMode-text-main hover:border-lightMode-brand-accent dark:border-darkMode-text-main hover:dark:border-darkMode-brand-accent rounded-md text-sm font-medium text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none transition-colors duration-300">
              <SiGoogle className="h-5 w-5 mr-2" />
              Google
            </button>
          </div>
        </div>

        {/* Right side - Image and text overlay */}
        <div className="hidden md:block md:w-1/2 relative overflow-hidden">
          <Image
            src="/images/landing/login.png"
            alt="Investment background"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-lightMode-brand-primary opacity-50 transition-colors duration-300"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-darkMode-text-heading transition-colors duration-300">
            <Image
              src={"/images/landing/logo-vertical.svg"}
              width={180}
              height={175}
              alt={""}
              className="md:w-[200px] md:h-[195px]"
            />
            <p className="text-sm mt-4 font-semibold text-center">
              YOUR INVESTMENT DESERVES BETTER <br /> LET TRYKEY SECURE YOUR
              PROFITS ON INFRASTURE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
