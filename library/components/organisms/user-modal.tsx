import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/library/api/axios";
import { CustomToaster } from "@/library/components/atoms/custom-toaster";
import toast from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";

interface User {
  full_name: string;
  username: string;
  last_login: string | null;
  role: string;
  role_association_timestamp: string;
}

interface ManageUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetNumber: string;
}
const ManageUsersModal: React.FC<ManageUsersModalProps> = ({
  isOpen,
  onClose,
  assetNumber,
}) => {
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users", assetNumber],
    queryFn: async () => {
      const { data } = await axiosAuth.get(`/assets/${assetNumber}/users/`);
      return data;
    },
  });

  const inviteUserMutation = useMutation({
    mutationFn: async ({ email, role }: { email: string; role: string }) => {
      const { data } = await axiosAuth.post(`/assets/invite/${assetNumber}/`, {
        email,
        role,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("User invited successfully");
      queryClient.invalidateQueries({ queryKey: ["users", assetNumber] });
      setNewUserEmail("");
      setNewUserRole("");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.error || "Failed to invite user";
      toast.error(errorMessage);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data } = await axiosAuth.post(`/assets/kick/${assetNumber}/`, {
        email,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("User removed successfully");
      queryClient.invalidateQueries({ queryKey: ["users", assetNumber] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.error || "Failed to remove user";
      toast.error(errorMessage);
    },
  });

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    inviteUserMutation.mutate({ email: newUserEmail, role: newUserRole });
  };

  const handleDeleteUser = (email: string) => {
    deleteUserMutation.mutate(email);
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className=" bg-lightMode-background-main dark:bg-darkMode-background-main p-8 rounded-3xl max-w-3xl w-full m-4 flex flex-col md:flex-row gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" md:w-1/3 md:order-1">
          <h3 className="text-lg font-semibold mb-2">Invite Users</h3>

          <form onSubmit={handleInviteUser} className="space-y-4">
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
              <label className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix text-sm placeholder:text-sm bg-transparent"
                required
              />
            </div>
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
              <label className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading">
                Role
              </label>
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
                className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix text-sm placeholder:text-sm bg-transparent"
                required
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 w-full bg-lightMode-button-background dark:bg-darkMode-button-background text-lightMode-button-text dark:text-darkMode-button-text hover:bg-lightMode-button-background/90 dark:hover:bg-darkMode-button-background/90 focus:outline-none focus:ring-2 focus:ring-lightMode-button-background dark:focus:ring-darkMode-button-background disabled:opacity-50 rounded-full flex items-center justify-center"
              disabled={inviteUserMutation.isPending}
            >
              {inviteUserMutation.isPending && (
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
              Invite User
            </button>
          </form>
        </div>
        <div className="md:w-2/3 ">
          <h3 className="text-lg font-semibold mb-2">Invited Users</h3>
          {isLoading && <p>Loading users...</p>}
          {isError && <p>Error loading users</p>}
          {users?.length == 0 && (
            <p>
              You don't have any collaboration, start by inviting users to join
              you!
            </p>
          )}
          {users && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {users.map((user) => (
                <div
                  key={user.username}
                  className="p-3 border rounded-md hover:bg-gray-100 transition-colors relative group"
                >
                  <p className="font-semibold">{user.full_name}</p>
                  <p className="text-sm text-lightMode-text-main dark:text-darkMode-text-main">
                    {user.username}
                  </p>
                  <p className="text-xs text-lightMode-text-main dark:text-darkMode-text-main capitalize">
                    {user.role}
                  </p>
                  <button
                    onClick={() => handleDeleteUser(user.username)}
                    className="absolute bottom-0 text-xs right-0 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity tooltip"
                    data-tooltip="Warning: This action is immediate and cannot be undone!"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .tooltip {
          position: relative;
        }
        .tooltip::before {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 100%;
          right: 0;
          background-color: #333;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s, visibility 0.3s;
        }
        .tooltip:hover::before,
        .tooltip:focus::before {
          opacity: 1;
          visibility: visible;
        }
        @media (hover: none) {
          .tooltip:active::before {
            opacity: 1;
            visibility: visible;
          }
        }
      `}</style>
    </div>
  );
};

export default ManageUsersModal;
