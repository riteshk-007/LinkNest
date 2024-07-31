"use client";

import { Camera, Trash2, User, Check } from "lucide-react";
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
import { DELETE_USER, GET_USER } from "@/app/Graphql/Queries";
import { toast } from "sonner";

const UserSetting: React.FC = () => {
  const { data: session } = useSession();

  const sessionData = session as CustomSession | null;

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId: sessionData?.user?.id ? sessionData.user.id : "" },
  });

  const user = data?.user;

  console.log(user);
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Image upload logic here
  };

  const handleDeleteAccount = (userId: string) => {
    deleteUser({ variables: { deleteUserId: userId } });
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
                Member since:{" "}
                {new Date(parseInt(user.createdAt)).toLocaleDateString("en-GB")}
              </p>
              <p className="text-sm mt-2">
                All links: {user.links ? user.links.length : 0}
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
                  value={user.username}
                  readOnly
                  className="bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-md w-full"
                />
                <span className="bg-green-600 mx-2 p-1 rounded-full h-full hover:bg-green-700 transition-colors duration-300">
                  <Check size={10} className="text-white" />
                </span>
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
                  <textarea
                    value={user.desc || ""}
                    readOnly
                    className="bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-l-md w-full resize-none"
                    rows={4}
                  />
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
