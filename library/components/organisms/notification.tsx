"use client";
import React, { useState } from "react";

const Notification = ({
  isNotificationOpen,
  setIsNotificationOpen,
}: {
  isNotificationOpen: boolean;
  setIsNotificationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  if (!isNotificationOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#1016304b] md:hidden z-50 flex justify-end`}
      onClick={() => setIsNotificationOpen(false)}
    >
      <div
        className="w-4/5 bg-lightMode-background-main/95 dark:bg-darkMode-background-main/95 backdrop-blur-md shadow-lg p-4 flex flex-col h-full "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <p>Nothing Yet</p>
      </div>
    </div>
  );
};

export default Notification;
