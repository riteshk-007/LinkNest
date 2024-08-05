"use client";
import Link from "next/link";
import {
  Bolt,
  CircleUser,
  Home,
  Menu,
  Palette,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomSession, LayoutProps, NavLinkProps } from "@/types/types";
import Logo from "../_components/Logo";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { Share } from "../_components/Share";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/app/Graphql/Queries";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();
  const sessionData = session as CustomSession | null;

  const { data } = useQuery(GET_USER, {
    variables: { userId: sessionData?.user?.id ? sessionData.user.id : "" },
  });

  const isPremium = data?.user?.isPremium || false;
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-black">
      <div className="hidden border-r border-gray-800 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
          <div className="flex h-16 items-center border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black px-6">
            <Logo />
          </div>
          <div className="flex-1 overflow-auto py-2 bg-gradient-to-b from-gray-900 to-black">
            <nav className="grid items-start px-4 text-sm font-medium">
              <NavLink
                href="/admin"
                icon={<Home className="h-5 w-5" />}
                label="Links"
              />
              <NavLink
                href="/admin/appearance"
                icon={<Palette className="h-5 w-5" />}
                label="Appearance"
              />
              <NavLink
                href="/admin/setting"
                icon={<Bolt className="h-5 w-5" />}
                label="Settings"
              />
            </nav>
          </div>
          {!isPremium && <UpgradeCard />}
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 sticky top-0 px-6 z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden bg-gray-800 text-white border-gray-700 hover:bg-gray-700 hover:text-white"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col bg-gradient-to-b from-gray-900 to-black border-gray-800 text-white"
            >
              <nav className="grid gap-4 text-lg font-medium">
                <Logo />
                <MobileNavLink
                  href="/admin"
                  icon={<Home className="h-5 w-5" />}
                  label="Links"
                />
                <MobileNavLink
                  href="/admin/appearance"
                  icon={<Palette className="h-5 w-5" />}
                  label="Appearance"
                />
                <MobileNavLink
                  href="/admin/setting"
                  icon={<Bolt className="h-5 w-5" />}
                  label="Settings"
                />
              </nav>
              {!isPremium && <UpgradeCard />}
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <div className="md:hidden block">
              <Logo />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Share />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-800 hover:bg-gray-700 border-0 outline-none focus:ring-0"
                >
                  <CircleUser className="h-6 w-6 text-white" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-gradient-to-b from-gray-900 to-black border-gray-800 text-white"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="focus:bg-gray-800 focus:text-white cursor-pointer">
                  Support
                </DropdownMenuItem>
                <Link href="/admin/setting">
                  <DropdownMenuItem className="focus:bg-gray-800 focus:text-white cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-gray-800" />
                <Link
                  className="cursor-pointer"
                  href="/"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <DropdownMenuItem className="text-red-400 focus:bg-red-900 focus:text-white cursor-default">
                    Logout
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 md:p-6 bg-black">{children}</main>
      </div>
    </div>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ href, icon, label }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-900 transition-all hover:from-gray-700 hover:to-gray-800 text-lg my-1 group relative overflow-hidden"
    >
      <span className="absolute inset-0 w-1 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-[250ms] ease-out group-hover:w-full group-hover:opacity-10"></span>
      <span className="relative text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200">
        {icon}
      </span>
      <span className="relative text-white group-hover:text-cyan-300 transition-colors duration-200">
        {label}
      </span>
    </Link>
  </motion.div>
);

const MobileNavLink: React.FC<NavLinkProps> = ({ href, icon, label }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      className="flex items-center gap-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded px-4 py-2 transition-all hover:from-gray-700 hover:to-gray-800 text-base group relative overflow-hidden"
    >
      <span className="absolute inset-0 w-1 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-[250ms] ease-out group-hover:w-full group-hover:opacity-10"></span>
      <span className="relative text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200">
        {icon}
      </span>
      <span className="relative text-white group-hover:text-cyan-300 transition-colors duration-200">
        {label}
      </span>
    </Link>
  </motion.div>
);

const UpgradeCard: React.FC = () => (
  <div className="mt-auto p-4">
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="mr-2" /> Upgrade to Pro
          </CardTitle>
          <CardDescription className="text-purple-200">
            Unlock amazing features and supercharge your experience!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href={"/admin/upgrade"}>
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transition-all duration-200"
            >
              <Sparkles className="mr-2 h-4 w-4" /> Upgrade Now
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  </div>
);

export default Layout;
