import Link from "next/link";
import HeroSection from "./_components/HeroSection";
import Image from "next/image";
import Logo from "./_components/Logo";

export default function Home() {
  return (
    <>
      <nav className="backdrop-blur-md border-b  p-2 md:p-3 border-gray-700 sticky top-0 z-50">
        <div className="md:container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Logo />
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
              className="bg-[#262626]  text-white px-4 py-2 rounded hover:bg-[#171717] transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      <HeroSection />
      <section className="py-14 bg-gradient-to-b overflow-hidden from-neutral-900 to-black">
        <div className="max-w-screen-xl mx-auto md:px-8">
          <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
            <div className="flex-1 sm:hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1601972602237-8c79241e468b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="md:max-w-lg sm:rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:rotate-2"
                alt="banner"
                width={774}
                height={516}
              />
            </div>
            <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl ">
              <h3 className="text-indigo-600 font-semibold">Expert Services</h3>
              <p className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 text-3xl font-semibold sm:text-4xl">
                Effortlessly Craft Your Link Nest
              </p>
              <p className="mt-3 text-gray-400">
                Simplify your digital life by consolidating all your social
                media links into a single, easily shareable link. Get started
                with Link Nest and enhance your online identity today.
              </p>
              <Link
                href={"/authenticate"}
                className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-black overflow-hidden ">
        <div className="max-w-screen-xl mx-auto md:px-8">
          <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
            <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl ">
              <h3 className="text-indigo-600 font-semibold">
                Unify Your Online Presence
              </h3>
              <p className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 text-3xl font-semibold sm:text-4xl">
                Centralize Your Social Links for Easy Sharing
              </p>
              <p className="mt-3 text-gray-400">
                Embed your Link Nest link across all your digital platforms,
                from Instagram to TikTok, ensuring your audience can connect
                with you everywhere. Leverage your unique QR code to seamlessly
                bridge your online and offline worlds.
              </p>
              <Link
                href={"/authenticate"}
                className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex-1 sm:hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1601972605341-b039a4f3ada7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="md:max-w-lg sm:rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:rotate-2"
                alt="banner"
                width={774}
                height={516}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 ">
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-gray-300 justify-between gap-24 lg:flex md:px-8">
          <div className="max-w-xl">
            <h3 className="text-white text-3xl font-semibold sm:text-4xl">
              Simplify Your Digital Footprint
            </h3>
            <p className="mt-3">
              Navigate the digital world with ease. Our platform allows you to
              consolidate your online profiles into one manageable hub.
            </p>
          </div>
          <div className="mt-12 lg:mt-0">
            <ul className="grid gap-8 sm:grid-cols-2">
              {features.map((item, idx) => (
                <li key={idx} className="flex gap-x-4">
                  <div className="flex-none w-12 h-12 bg-gray-700 text-blue-600 rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-100 font-semibold">
                      {item.title}
                    </h4>
                    <p className="mt-3">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="absolute inset-0 max-w-md mx-auto h-72 blur-[118px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
          }}
        ></div>
      </section>

      <footer className="bg-black border-t border-neutral-800">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-4 flex-col">
            <Logo />
          </div>

          <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
            &copy; 2024 Link Nest. All rights reserved.
          </p>
          <p className="mx-auto mt-2 max-w-md text-center leading-relaxed text-gray-500">
            Made with ❤️ by{" "}
            <a
              href="https://twitter.com/Riteshk_007"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline"
            >
              @Riteshk_007
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    title: "Instant Updates",
    desc: "Experience lightning-fast updates with our cutting-edge technology, ensuring your digital hub remains current and engaging.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    title: "Robust Security",
    desc: "Keep your social links safe with our top-tier security measures, designed to protect your information and privacy at all times.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
        />
      </svg>
    ),
    title: "Customizable Platform",
    desc: "Create a unique and personalized hub that reflects your brand. Our platform offers extensive customization options to match your style.",
  },
];
