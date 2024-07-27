import React from "react";
import { Metadata } from "next";
import AuthForm from "./Authenticate";

export const metadata: Metadata = {
  title: "Authentication Link Nest",
  description: "Authentication Link Nest for all your social media needs",
};
const authenticate = () => {
  return <AuthForm />;
};

export default authenticate;
