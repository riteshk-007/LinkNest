import { Metadata } from "next";
import React from "react";
import CheckoutForm from "../../_components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout Plan - Link Nest: All Your Social Links in One Place",
  description:
    "Join Link Nest today and easily access all your social media profiles with one link. Enhance your online presence with our premium features.",
};
const Checkout = () => {
  return <CheckoutForm />;
};

export default Checkout;
