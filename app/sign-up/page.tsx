"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/library/components/atoms/logo";
import { Eye, EyeOff } from "lucide-react";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { useMutation } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import { CustomToaster } from "@/library/components/atoms/custom-toaster";
import axios, { AxiosError } from "axios";
import { axiosInstance } from "@/library/api/axios";

interface SignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<SignUpData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const router = useRouter();

  const signUpMutation = useMutation<void, Error, SignUpData>({
    mutationFn: async (data: SignUpData) => {
      const url = "/auth/register/";
      return axiosInstance.post(url, data);
    },
    onSuccess: () => {
      toast.success("Sign-up successful!");
      router.push("/overview");
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response?.data?.errors) {
          const errors = axiosError.response.data.errors;
          Object.entries(errors).forEach(([field, message]) => {
            toast.error(`${field}: ${message}`);
          });
        } else if (axiosError.response?.data?.detail) {
          toast.error(axiosError.response.data.detail);
        } else if (error.message) {
          toast.error(error.message);
        } else {
          toast.error(
            `An error occurred during sign-up. Status: ${axiosError.response?.status}`
          );
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    signUpMutation.mutate(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightMode-background-secondary dark:bg-darkMode-background-secondary p-4 transition-colors duration-300">
      <CustomToaster />

      <div className="w-full max-w-7xl h-auto md:h-[80vh] bg-lightMode-background-main dark:bg-darkMode-background-main rounded-3xl overflow-hidden md:shadow-2xl flex flex-col md:flex-row transition-colors duration-300">
        {/* Left side - Sign-up form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 md:py-12 md:px-20 flex flex-col justify-between items-center">
          <div className="flex flex-col items-center mb-6 md:mb-0">
            <p className="text-sm text-lightMode-text-main dark:text-darkMode-text-main transition-colors duration-300">
              WELCOME TO
            </p>
            <Logo width={"180px"} className="md:w-[200px]" />
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {/* First Name input */}
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
              <label
                htmlFor="first_name"
                className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading"
              >
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                className="autofill-fix w-full border-none text-xs text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-2 placeholder-gray-400 bg-transparent"
                placeholder="Enter First Name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </div>
            {/* Last Name input */}
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
              <label
                htmlFor="last_name"
                className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading"
              >
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                className="w-full border-none text-xs text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-2 placeholder-gray-400 bg-transparent autofill-fix"
                placeholder="Enter Last Name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </div>
            {/* Email input */}
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
              <label
                htmlFor="email"
                className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border-none text-xs text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-2 bg-transparent autofill-fix"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            {/* Password input */}
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
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
                className="px-0 py-2 w-full border-none text-xs text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none transition-colors duration-300 bg-transparent autofill-fix"
                placeholder="Enter Password (min. 8 characters)"
                value={formData.password}
                onChange={handleInputChange}
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
            {/* Confirm Password input */}
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
              <label
                htmlFor="confirm_password"
                className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading"
              >
                Confirm Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="px-0 py-2 w-full border-none text-xs text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none transition-colors duration-300 bg-transparent autofill-fix"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lightMode-text-main dark:text-darkMode-text-main transition-colors duration-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full h-[45px] md:h-[50px] bg-lightMode-button-background dark:bg-darkMode-button-background text-lightMode-button-text dark:text-darkMode-button-text py-2 px-4 rounded-full focus:outline-none transition-colors duration-300 text-base dark:hover:bg-darkMode-button-background/90 hover:bg-lightMode-button-background/90 disabled:opacity-40 flex items-center justify-center"
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              Sign Up
            </button>
          </form>

          <div className="w-full flex flex-col items-center gap-2 mt-4 md:mt-0">
            <div className="text-center text-sm text-lightMode-text-main dark:text-darkMode-text-main transition-colors duration-300">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-lightMode-text-accent dark:text-darkMode-text-accent hover:text-lightMode-button-background/90 dark:hover:text-darkMode-button-background/90 transition-colors duration-300"
              >
                Log in
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

export default SignUpPage;
