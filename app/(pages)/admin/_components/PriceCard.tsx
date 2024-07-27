"use client";
import React, { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { PricePlan } from "@/types/types";
import { Switch } from "@/components/ui/switch";

const PriceCard: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans: PricePlan[] = [
    {
      title: "Free Plan",
      monthlyPrice: "Free",
      yearlyPrice: "Free",
      features: [
        { text: "Access to all social links in one place" },
        { text: "Basic analytics and insights" },
        { text: "Responsive design for mobile devices" },
      ],
      buttonText: "Get Started for Free",
    },
    {
      title: "Premium Plan",
      monthlyPrice: "₹149",
      yearlyPrice: "₹1,499",
      features: [
        { text: "Customizable design themes" },
        { text: "Advanced analytics and insights" },
        { text: "Priority support" },
        { text: "Early access to new features" },
      ],
      buttonText: "Upgrade Now",
    },
  ];

  return (
    <section className="py-16 px-4 z-0">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Join Link Nest today and streamline your online presence with our
            exclusive plans.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-lg font-medium text-gray-300">Monthly</span>
            <Switch
              checked={isYearly}
              onCheckedChange={() => setIsYearly(!isYearly)}
              className="data-[state=checked]:bg-sky-500 bg-neutral-800"
            />
            <span className="text-lg font-medium text-gray-300">Yearly</span>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-2 animate-fade-in-up">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-sky-900 to-slate-900 rounded-3xl shadow-2xl p-8 transition-all duration-300  hover:shadow-sky-500/20 border border-sky-500/20"
            >
              <h3 className="text-3xl font-bold text-white mb-2 text-center">
                {plan.title}
              </h3>
              <p className="text-4xl font-bold text-sky-400 mb-2 text-center">
                {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </p>
              <p className="text-lg text-gray-300 mb-6 text-center">
                {plan.title !== "Free Plan" &&
                  (isYearly ? "per year" : "per month")}
              </p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start">
                    <IoMdArrowDropright className="text-sky-400 text-2xl flex-shrink-0 mr-2 mt-1" />
                    <span className="text-gray-300 text-lg">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <Button
                  variant="outline"
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/50"
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PriceCard;
