"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosAuth } from "@/library/api/axios";
import {
  DashboardNavDesktop,
  DashboardNavMobile,
} from "../organisms/dashboard-nav";
import { ThemeSwitch } from "../atoms/theme-switch";
import { Bell, Menu } from "lucide-react";
import Notification from "../organisms/notification";
import { useRouter } from "next/navigation";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  account_number: string;
  bank: string;
  avatar: string;
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      } else {
        setIsCheckingToken(false);
      }
    };

    checkToken();
  }, [router]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery<UserData, Error>({
    queryKey: ["userData"],
    queryFn: async () => {
      const { data } = await axiosAuth.get<UserData>("/auth/me/");
      return data;
    },
    enabled: !isCheckingToken, // Only run the query after token check
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const formatDate = () => {
    return new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (isCheckingToken) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  return (
    <div className="flex h-screen bg-lightMode-background-alternate dark:bg-darkMode-background-alternate text-lightMode-text-heading dark:text-darkMode-text-heading">
      {/* Sidebar */}
      <DashboardNavDesktop />
      <DashboardNavMobile
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-lightMode-background-main dark:bg-darkMode-background-main border-b border-gray-200 dark:border-gray-800 z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            {isLoading ? (
              <div>Loading...</div>
            ) : isError ? (
              <div>Error loading user data</div>
            ) : userData ? (
              <div className="flex gap-5 items-center">
                <Image
                  src={"/images/dashboard/avatar.jpg"}
                  alt="User Avatar"
                  width={60}
                  height={60}
                  className="rounded-full w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
                />
                <div>
                  <p className="mr-2 text-lightMode-text-heading dark:text-darkMode-text-heading font-semibold">
                    {getGreeting()}, {userData.first_name}
                  </p>
                  <p className="text-xs mt-1 text-lightMode-text-main dark:text-darkMode-text-main">
                    {formatDate()}
                  </p>
                </div>
              </div>
            ) : null}
            <div className="flex items-center space-x-4">
              <ThemeSwitch />
              <button
                onClick={toggleNotification}
                className="p-2 rounded-full hover:bg-gray-200 md:hidden"
              >
                <Bell className="h-6 w-6" />
              </button>
              <button className="lg:hidden" onClick={toggleSidebar}>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Notification panel */}
      {isNotificationOpen && (
        <Notification
          isNotificationOpen={isNotificationOpen}
          setIsNotificationOpen={setIsNotificationOpen}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
