import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-500">
        Link
        <span className="mx-1">Nest</span>
      </span>
    </Link>
  );
};

export default Logo;
