"use client";

import { Camera, Trash2, User, Save, Edit2 } from "lucide-react";
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
import { signOut, useSession } from "next-auth/react";
import { CustomSession } from "@/types/types";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER, GET_USER, UPDATE_USER } from "@/app/Graphql/Queries";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { IoMdLink } from "react-icons/io";
import { UploadButton } from "@/utils/uploadthing";

const WORD_LIMIT = 20;

const UserSetting: React.FC = () => {
  const { data: session } = useSession();
  const sessionData = session as CustomSession | null;

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId: sessionData?.user?.id ? sessionData.user.id : "" },
  });

  const [UpdateUser, { loading: loadData }] = useMutation(UPDATE_USER, {
    refetchQueries: [
      {
        query: GET_USER,
        variables: { userId: sessionData?.user?.id ? sessionData.user.id : "" },
      },
    ],
    onCompleted: () => {
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const user = data?.user;

  const [editingUsername, setEditingUsername] = useState<boolean>(false);
  const [editingDesc, setEditingDesc] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const descTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (data?.user) {
      setUsername(data.user.username || "");
      setDesc(data.user.desc || "");
      setWordCount(countWords(data.user.desc || ""));
    }
  }, [data]);

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => {
      toast.success("Account deleted successfully");
      setTimeout(() => {
        signOut({
          callbackUrl: "/",
        });
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleImageUpload = () => {
    document.getElementById("image-upload")?.click();
  };

  const handleImageChange = (res: any) => {
    if (res && res.length > 0) {
      const uploadedImageUrl = res[0].url;
      setImageUrl(uploadedImageUrl);

      console.log(res);
    }
  };

  const handleDeleteAccount = (userId: string) => {
    deleteUser({ variables: { deleteUserId: userId } });
  };

  const handleEditUsername = () => {
    setEditingUsername(true);
    setTimeout(() => {
      usernameInputRef.current?.focus();
    }, 0);
  };

  const handleEditDesc = () => {
    setEditingDesc(true);
    setTimeout(() => {
      descTextareaRef.current?.focus();
    }, 0);
  };

  const handleSaveUsername = () => {
    setEditingUsername(false);
    UpdateUser({
      variables: {
        updateUserId: user.id,
        username,
      },
    });
  };

  const handleSaveDesc = () => {
    setEditingDesc(false);
    UpdateUser({
      variables: {
        updateUserId: user.id,
        desc,
      },
    });
  };

  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).length;
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDesc = e.target.value;
    const words = countWords(newDesc);
    if (words <= WORD_LIMIT) {
      setDesc(newDesc);
      setWordCount(words);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-300"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Please log in to view your account settings.
      </div>
    );
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
              {user.image || imageUrl ? (
                <Image
                  width={128}
                  height={128}
                  src={imageUrl || user.image}
                  alt="User"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-blue-400 shadow-lg">
                  <User size={48} className="text-white" />
                </div>
              )}
              <label htmlFor="image-upload" onClick={handleImageUpload}>
                <UploadButton
                  endpoint="imageUploader"
                  className="mt-3 text-xs"
                  onClientUploadComplete={(res) => {
                    handleImageChange(res);
                    toast.success("Image uploaded successfully");
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(error.message);
                  }}
                />
              </label>
            </div>
            <div className="md:ml-8 text-center md:text-left">
              <h2 className="text-2xl font-semibold mb-1 capitalize">
                {user.username}
              </h2>
              <p className="text-blue-400">{user.email}</p>
              <p className="text-sm mt-2">
                <strong>Member since:</strong>{" "}
                {new Date(parseInt(user.createdAt)).toLocaleDateString(
                  "en-GB",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              <p className="text-sm mt-2">
                <strong>Updated:</strong>{" "}
                {new Date(parseInt(user.updatedAt)).toLocaleString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-sm mt-2 flex items-center">
                <IoMdLink className="mr-1 text-blue-500" size={20} />
                <span>All links: {user.links ? user.links.length : 0}</span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-300">
                Username
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={username}
                  readOnly={!editingUsername}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-md w-full"
                  ref={usernameInputRef}
                />
                {loadData ? (
                  <div className="bg-blue-600 ml-2 p-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-300"></div>
                  </div>
                ) : editingUsername ? (
                  <button
                    onClick={handleSaveUsername}
                    className="bg-green-600 ml-2 p-2 rounded-full hover:bg-green-700 transition-colors duration-300"
                  >
                    <Save size={20} className="text-white" />
                  </button>
                ) : (
                  <button
                    onClick={handleEditUsername}
                    className="bg-blue-600 ml-2 p-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                  >
                    <Edit2 size={20} className="text-white" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-blue-300">
                Description
              </label>
              <div className="flex flex-col">
                <div className="flex items-start">
                  <textarea
                    value={desc}
                    readOnly={!editingDesc}
                    onChange={handleDescChange}
                    className="bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-l-md w-full resize-none"
                    rows={4}
                    ref={descTextareaRef}
                  />
                  {loadData ? (
                    <div className="bg-blue-600 ml-2 p-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-300"></div>
                    </div>
                  ) : editingDesc ? (
                    <button
                      onClick={handleSaveDesc}
                      className="bg-green-600 ml-2 p-2 rounded-full hover:bg-green-700 transition-colors duration-300"
                    >
                      <Save size={20} className="text-white" />
                    </button>
                  ) : (
                    <button
                      onClick={handleEditDesc}
                      className="bg-blue-600 ml-2 p-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                    >
                      <Edit2 size={20} className="text-white" />
                    </button>
                  )}
                </div>
                <div
                  className={`text-sm mt-1 ${
                    wordCount >= WORD_LIMIT ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {wordCount}/{WORD_LIMIT} words
                </div>
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
                  <AlertDialogAction
                    onClick={() => handleDeleteAccount(user.id)}
                    className="bg-red-600 hover:bg-red-700 transition-colors duration-300 px-4 py-2 rounded-md"
                  >
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
