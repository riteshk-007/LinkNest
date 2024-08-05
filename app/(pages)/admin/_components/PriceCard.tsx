"use client";
import React from "react";
import { CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const PriceCards = () => {
  const plans = [
    {
      title: "Free Plan",
      price: "Free",
      features: [
        "Access to all social links in one place",
        "Basic analytics and insights",
        "Responsive design for mobile devices",
        "Up to 5 custom link pages",
      ],
      buttonText: "Get Started",
      popular: false,
      link: "/admin",
    },
    {
      title: "Premium Plan",
      price: "₹1,999",
      features: [
        "All features from Free Plan",
        "Unlimited custom link pages",
        "Advanced analytics and insights",
        "Priority support",
        "Custom domain support",
        "Ad-free experience",
      ],
      buttonText: "Upgrade Now",
      popular: true,
      link: "/admin/upgrade/checkout",
    },
  ];

  return (
    <section className="py-20 px-4  text-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-text">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Elevate your online presence with Link Nest&apos;s tailored plans.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`bg-gradient-to-b from-gray-900 to-black border-gray-700 overflow-hidden transform transition-all duration-300  hover:shadow-2xl ${
                plan.popular
                  ? "hover:shadow-purple-500/30"
                  : "hover:shadow-blue-500/30"
              } relative`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 mr-1" /> Popular
                </div>
              )}
              <CardHeader
                className={`p-6 ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-600 to-pink-600"
                    : "bg-gradient-to-r from-blue-600 to-cyan-600"
                }`}
              >
                <CardTitle className="text-3xl font-bold text-center text-white">
                  {plan.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-5xl font-bold text-center mb-6 text-gray-200">
                  {plan.price}
                  {plan.title === "Premium Plan" && (
                    <span className="text-lg font-normal text-gray-300">
                      {" "}
                      one-time
                    </span>
                  )}
                </p>
                <ul className="space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center space-x-3">
                      <CheckCircle2
                        className={`h-5 w-5 ${
                          plan.popular ? "text-purple-400" : "text-blue-400"
                        } flex-shrink-0`}
                      />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className=" p-6">
                <Link href={plan.link} className="w-full">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    } text-white font-bold py-4 px-6 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PriceCards;
