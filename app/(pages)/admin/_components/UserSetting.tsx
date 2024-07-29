"use client";

import React, { useState, useRef, useEffect } from "react";
import { Camera, Edit2, Trash2, Save, User } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/types/types";
import Image from "next/image";

const UserSetting: React.FC = () => {
  const { data: session, status } = useSession();

  const sessionData = session as CustomSession | null;
  const user = sessionData?.user;

  const [editingUsername, setEditingUsername] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [tempUsername, setTempUsername] = useState(user?.username || "");
  const [tempDesc, setTempDesc] = useState(user?.desc || "");

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const descTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editingUsername && usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
    if (editingDesc && descTextareaRef.current) {
      descTextareaRef.current.focus();
    }
  }, [editingUsername, editingDesc]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Image upload logic here
  };

  const handleUsernameEdit = () => {
    if (editingUsername) {
      console.log("New username:", tempUsername);
      // Reset the tempUsername after saving
      setTempUsername("");
    } else {
      // Set the tempUsername to the current username when starting to edit
      setTempUsername(user?.username || "");
    }
    setEditingUsername(!editingUsername);
  };

  const handleDescriptionEdit = () => {
    if (editingDesc) {
      console.log("New description:", tempDesc);
      // Reset the tempDesc after saving
      setTempDesc("");
    } else {
      setTempDesc(user?.desc || "");
    }
    setEditingDesc(!editingDesc);
  };

  const wordCount = tempDesc.trim().split(/\s+/).length;
  const isWordLimitExceeded = wordCount > 20;

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDesc = e.target.value;
    const newWordCount = newDesc.trim().split(/\s+/).length;
    if (newWordCount <= 20) {
      setTempDesc(newDesc);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-300"></div>
      </div>
    );
  }

  if (status === "unauthenticated" || !user) {
    return <div>Please log in to view your account settings.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-neutral-800 to-zinc-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Account Settings
        </h1>

        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-8 mb-6 shadow-2xl border border-gray-700">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="relative mb-4 md:mb-0">
              {user.image ? (
                <Image
                  width={128}
                  height={128}
                  src={user.image}
                  alt="User"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-blue-400 shadow-lg">
                  <User size={48} className="text-white" />
                </div>
              )}
              <label
                htmlFor="image-upload"
                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-colors duration-300"
              >
                <Camera size={20} />
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <div className="md:ml-8 text-center md:text-left">
              <h2 className="text-2xl font-semibold mb-1">{user.username}</h2>
              <p className="text-blue-400">{user.email}</p>
              <p className="text-sm mt-2">
                Member since: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-300">
                Username
              </label>
              <div className="flex items-center">
                {editingUsername ? (
                  <input
                    ref={usernameInputRef}
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    className="bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                ) : (
                  <input
                    type="text"
                    value={user.username}
                    readOnly
                    className="bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-l-md w-full"
                  />
                )}
                <button
                  onClick={handleUsernameEdit}
                  className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors duration-300"
                >
                  {editingUsername ? <Save size={18} /> : <Edit2 size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-blue-300">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-md w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-blue-300">
                Description
              </label>
              <div className="flex flex-col">
                <div className="flex items-start">
                  {editingDesc ? (
                    <textarea
                      ref={descTextareaRef}
                      value={tempDesc}
                      onChange={handleDescChange}
                      className="bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-l-md w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      rows={4}
                    />
                  ) : (
                    <textarea
                      value={user.desc || ""}
                      readOnly
                      className="bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-l-md w-full resize-none"
                      rows={4}
                    />
                  )}
                  <button
                    onClick={handleDescriptionEdit}
                    className="bg-blue-600 px-4 py-2 rounded-r-md h-full hover:bg-blue-700 transition-colors duration-300"
                  >
                    {editingDesc ? <Save size={18} /> : <Edit2 size={18} />}
                  </button>
                </div>
                {editingDesc && (
                  <div
                    className={`text-sm mt-2 ${
                      isWordLimitExceeded ? "text-red-400" : "text-gray-400"
                    }`}
                  >
                    {wordCount}/20 words
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm">
                Account type:{" "}
                <span
                  className={
                    user.isPremium
                      ? "text-yellow-400 font-semibold"
                      : "text-gray-400"
                  }
                >
                  {user.isPremium ? "Premium" : "Free"}
                </span>
              </p>
              {user.isPremium && (
                <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  PRO
                </span>
              )}
            </div>
          </div>

          <div className="mt-8">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-red-700 transition-colors duration-300">
                  <Trash2 size={18} className="mr-2" />
                  Delete Account
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="text-white bg-gray-800 border border-gray-700 rounded-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl font-bold">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-300">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600 hover:bg-red-700 transition-colors duration-300 px-4 py-2 rounded-md">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
