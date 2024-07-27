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
import { LayoutProps, NavLinkProps } from "@/types/types";
import Logo from "../_components/Logo";
import { motion } from "framer-motion";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-gray-950">
      <div className="hidden border-r border-gray-900 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
          <motion.div
            className="flex h-16 items-center border-b border-gray-900 bg-gray-900 px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo />
          </motion.div>
          <div className="flex-1 overflow-auto py-2">
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
          <UpgradeCard />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 bg-gray-900 border-b border-gray-900 sticky top-0 px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden bg-gray-900 text-white border-gray-700 hover:bg-gray-700 hover:text-white"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col bg-gray-900 border-gray-900 text-white"
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
              <UpgradeCard />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <div className="md:hidden block">
              <Logo />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-gray-900 hover:bg-gray-700 border-0 outline-none focus:ring-0"
              >
                <CircleUser className="h-6 w-6 text-white" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-gray-900 border-gray-900 text-white"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-900" />
              <DropdownMenuItem className="focus:bg-gray-900 focus:text-white cursor-pointer">
                Support
              </DropdownMenuItem>
              <Link href="/admin/setting">
                <DropdownMenuItem className="focus:bg-gray-900 focus:text-white cursor-pointer">
                  Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-gray-900" />
              <Link className="cursor-pointer" href="/authenticate">
                <DropdownMenuItem className="text-red-400 focus:bg-red-900 focus:text-white">
                  Logout
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-6 bg-gray-950">{children}</main>
      </div>
    </div>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ href, icon, label }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 bg-neutral-900 transition-all hover:bg-neutral-700 text-lg my-1 group relative overflow-hidden"
    >
      <span className="absolute inset-0 w-1 bg-cyan-500 transition-all duration-[250ms] ease-out group-hover:w-full group-hover:bg-opacity-10"></span>
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
      className="flex items-center gap-4 bg-gray-900 rounded px-4 py-2 transition-all hover:bg-gray-700 text-base group relative overflow-hidden"
    >
      <span className="absolute inset-0 w-1 bg-cyan-500 transition-all duration-[250ms] ease-out group-hover:w-full group-hover:bg-opacity-10"></span>
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
      <Card className="bg-gradient-to-br from-purple-600 to-pink-500 text-white border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="mr-2" /> Upgrade to Pro
          </CardTitle>
          <CardDescription className="text-purple-100">
            Unlock amazing features and supercharge your experience!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href={"/admin/upgrade"}>
            <Button
              size="sm"
              className="w-full bg-white text-purple-600 hover:bg-purple-100 transition-all duration-200"
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
