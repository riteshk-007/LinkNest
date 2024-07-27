"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FormData } from "@/types/types";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/app/Graphql/Queries";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const router = useRouter();

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      setIsLoading(false);
      const errorMessage =
        error.graphQLErrors?.[0]?.message ||
        "An error occurred, please try again later";
      toast.error(errorMessage);
      setError(errorMessage);
    },
    onCompleted: () => {
      reset();
      toast.success("Account created successfully");
      setIsLoading(false);
      setIsLogin(true);
    },
  });

  // Submit form
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        // Login logic here
      } else {
        // Register
        await createUser({ variables: data });
      }
    } catch (error) {
      toast.error("An error occurred, please try again later");
      console.error("Error during submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <motion.div
        className="w-full max-w-md p-8 m-4 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md shadow-2xl border border-gray-700"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {isLogin ? "Welcome Back" : "Join Us"}
        </motion.h2>
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="username"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  {...register("username", { required: !isLogin })}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Username"
                />
                {errors.username && (
                  <motion.span
                    className="text-xs text-red-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Username is required
                  </motion.span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div variants={itemVariants}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="you@example.com"
            />
            {errors.email && (
              <motion.span
                className="text-xs text-red-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.email.message}
              </motion.span>
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <div className="flex items-center border border-gray-600 rounded-md bg-gray-700">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message:
                        "Password must be at least 8 characters long and include at least one letter and one number",
                    },
                  })}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
                <motion.div
                  className="pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-white" />
                  ) : (
                    <FiEye className="text-white" />
                  )}
                </motion.div>
              </div>
              {errors.password && (
                <motion.span
                  className="text-xs text-red-400 mt-2 block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.password.message}
                </motion.span>
              )}
            </div>
          </motion.div>
          <motion.button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            {isLoading ? (
              <motion.svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
              </motion.svg>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </motion.button>
        </motion.form>
        <motion.p
          className="mt-8 text-xs text-center text-gray-400"
          variants={itemVariants}
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <motion.button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-blue-400 hover:text-blue-300 focus:outline-none focus:underline transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </motion.button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
