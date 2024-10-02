"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  DashboardNavDesktop,
  DashboardNavMobile,
} from "../organisms/dashboard-nav";
import { ThemeSwitch } from "../atoms/theme-switch";
import { Bell, Menu } from "lucide-react";
import Notification from "../organisms/notification";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);

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
            <div className="flex gap-5 items-center">
              <Image
                src="/images/dashboard/pfp.png"
                alt="User Avatar"
                width={60}
                height={60}
                className="rounded-full w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
              />
              <div>
                <p className="mr-2 text-lightMode-text-heading dark:text-darkMode-text-heading font-semibold">
                  Good evening, Olu
                </p>
                <p className="text-xs mt-1 text-lightMode-text-main dark:text-darkMode-text-main">
                  Thursday, 26-09-2024
                </p>
              </div>
            </div>
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
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
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