import Link from "next/link";
import HeroSection from "./_components/HeroSection";

export default function Home() {
  return (
    <>
      <nav className="backdrop-blur-md border-b  p-2 md:p-3 border-gray-700 sticky top-0 z-50">
        <div className="md:container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <span className="text-2xl font-bold text-white">Link Nest</span>
          </Link>
          {/* Buttons */}
          <div className="space-x-2 md:space-x-4 text-sm">
            <Link
              href={"/authenticate"}
              className="bg-transparent text-white px-4 py-2 rounded  transition duration-300"
            >
              Login
            </Link>
            <Link
              href={"/authenticate"}
              className="bg-[#262626]     text-white px-4 py-2 rounded hover:bg-[#171717] transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      <HeroSection />
    </>
  );
}
