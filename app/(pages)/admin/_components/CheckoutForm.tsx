"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormInput } from "@/types/types";
import { toast } from "sonner";

const CheckoutForm: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setScriptLoaded(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    if (scriptLoaded) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
        amount: 1999 * 100,
        currency: "INR",
        name: "Link Nest",
        description: "A collection of all social media links in one place.",
        image: "../../../opengraph-image.png",
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
          method: "card",
          "card[number]": data.cardNumber.replace(/\s/g, ""),
          "card[expiry]": data.expiryDate,
          "card[cvv]": data.cvv,
        },
        handler: function(response: any) {
          toast.success("Payment successful!");
        },
        modal: {
          ondismiss: function() {
            toast.error("Payment cancelled");
          },
        },
        theme: {
          color: "#111827",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function(response: any) {
        toast.error("Payment failed. Please try again.");
      });
      rzp.open();
    } else {
      console.error("Razorpay script not loaded");
      toast.error("Unable to load payment gateway. Please try again later.");
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
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
    <div className="flex items-center justify-center bg-gradient-to-t from-gray-900 to-black p-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-gradient-to-b from-gray-900 to-black rounded-md shadow-2xl p-8 border border-gray-700"
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
            htmlFor="phone"
            className="block text-gray-300 mb-2 font-medium"
          >
            Phone Number
          </label>
          <input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number",
              },
            })}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </motion.div>

        <motion.div className="mb-6" variants={childVariants}>
          <label
            htmlFor="cardNumber"
            className="block text-gray-300 mb-2 font-medium"
          >
            Card Number
          </label>
          <Controller
            name="cardNumber"
            control={control}
            rules={{
              required: "Card number is required",
              pattern: {
                value: /^(\d{4}\s?){4}$/,
                message: "Invalid card number",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                onChange={(e) =>
                  field.onChange(formatCardNumber(e.target.value))
                }
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            )}
          />
          {errors.cardNumber && (
            <p className="text-red-500 mt-1">{errors.cardNumber.message}</p>
          )}
        </motion.div>

        <div className="flex mb-6 space-x-4">
          <motion.div className="w-1/2" variants={childVariants}>
            <label
              htmlFor="expiryDate"
              className="block text-gray-300 mb-2 font-medium"
            >
              Expiry Date
            </label>
            <Controller
              name="expiryDate"
              control={control}
              rules={{
                required: "Expiry date is required",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: "Invalid expiry date (MM/YY)",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  onChange={(e) =>
                    field.onChange(formatExpiryDate(e.target.value))
                  }
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              )}
            />
            {errors.expiryDate && (
              <p className="text-red-500 mt-1">{errors.expiryDate.message}</p>
            )}
          </motion.div>
          <motion.div className="w-1/2" variants={childVariants}>
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
              maxLength={4}
            />
            {errors.cvv && (
              <p className="text-red-500 mt-1">{errors.cvv.message}</p>
            )}
          </motion.div>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-gray-900 to-gray-950 text-white py-3 px-4 rounded-lg font-semibold hover:from-gray-950 hover:to-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300"
          variants={childVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Proceed to Payment
        </motion.button>
      </motion.form>
    </div>
  );
};

export default CheckoutForm;
