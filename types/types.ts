import { LucideIcon } from "lucide-react";

export interface StarProps {
  top: number;
  left: number;
  size: number;
}

export interface StarsProps {
  count: number;
}

export interface FormData {
  username: string;
  email: string;
  password: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface NavLinkProps {
  href: string;
  icon: React.ReactElement<LucideIcon>;
  label: string;
}

export interface AnimateBtnProps {
  text: string;
}

export interface PricePlan {
  title: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: { text: string }[];
  buttonText: string;
}

export interface LinkCardProps {
  title: string;
  url: string;
  icon: React.ReactElement<LucideIcon>;
  onDelete: () => void;
  onEdit: () => void;
}
