"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";

type FormInputs = {
  name: string;
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

const CheckoutForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("Form submitted:", data);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-t from-gray-900 to-black p-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl p-8 border border-gray-700"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl font-bold text-white mb-6 text-center"
          variants={childVariants}
        >
          Checkout
        </motion.h2>

        <motion.div className="mb-6" variants={childVariants}>
          <label
            htmlFor="name"
            className="block text-gray-300 mb-2 font-medium"
          >
            Full Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </motion.div>

        <motion.div className="mb-6" variants={childVariants}>
          <label
            htmlFor="email"
            className="block text-gray-300 mb-2 font-medium"
          >
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </motion.div>

        <motion.div className="mb-6" variants={childVariants}>
          <label
            htmlFor="cardNumber"
            className="block text-gray-300 mb-2 font-medium"
          >
            Card Number
          </label>
          <input
            {...register("cardNumber", {
              required: "Card number is required",
              pattern: {
                value: /^[0-9]{16}$/,
                message: "Invalid card number",
              },
            })}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="1234 5678 9012 3456"
            maxLength={16}
          />
          {errors.cardNumber && (
            <p className="text-red-500 mt-1">{errors.cardNumber.message}</p>
          )}
        </motion.div>

        <motion.div className="flex mb-6 space-x-4" variants={childVariants}>
          <div className="w-1/2">
            <label
              htmlFor="expiryDate"
              className="block text-gray-300 mb-2 font-medium"
            >
              Expiry Date
            </label>
            <input
              {...register("expiryDate", {
                required: "Expiry date is required",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: "Invalid expiry date (MM/YY)",
                },
              })}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="MM/YY"
            />
            {errors.expiryDate && (
              <p className="text-red-500 mt-1">{errors.expiryDate.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <label
              htmlFor="cvv"
              className="block text-gray-300 mb-2 font-medium"
            >
              CVV
            </label>
            <input
              {...register("cvv", {
                required: "CVV is required",
                pattern: {
                  value: /^[0-9]{3,4}$/,
                  message: "Invalid CVV",
                },
              })}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="123"
            />
            {errors.cvv && (
              <p className="text-red-500 mt-1">{errors.cvv.message}</p>
            )}
          </div>
        </motion.div>

        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          variants={childVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Pay Now
        </motion.button>
      </motion.form>
    </div>
  );
};

export default CheckoutForm;
