import { LucideIcon } from "lucide-react";
import { ISODateString } from "next-auth";

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
  desc: string;
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
  image?: string;
  onDelete: () => void;
  onEdit: () => void;
}

export interface CustomSession {
  user?: CustomUser | null;
  expires: ISODateString | null;
}

export interface CustomUser {
  createdAt: string;
  desc: string | null;
  email: string;
  id: string;
  image: string | null;
  isPremium: boolean;
  password: string;
  themeId: string | null;
  updatedAt: string;
  username: string;
}

export interface FormInputs {
  url: string;
  title: string;
  icon?: SocialIcon;
}

export interface SocialIcon {
  name: string;
  imageUrl: string;
}

export interface CreateLinkDialogProps {
  buttonText?: string;
  user: CustomSession;
}

export interface PhoneMockupProps {
  children: React.ReactNode;
}

export interface LinkItem {
  icon: React.ElementType;
  title: string;
  url: string;
}

export interface UserProfileProps {
  backgroundColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  username?: string;
}

export interface Link {
  id: string;
  image: string;
  title: string;
  url: string;
  userId: string;
  __typename: string;
}

export interface User {
  id: string;
  username: string;
  desc: string;
  image: string;
  links: Link[];
  __typename: string;
}

export type ShareProps = {
  username: string;
};

export interface Theme {
  id: string;
  image?: string;
  isPremium: boolean;
  gradientFrom: string;
  gradientTo: string;
  angle: number;
}

export interface ThemeCardProps {
  theme: Theme;
  isSelected: boolean;
  onSelect: (theme: Theme) => void;
}
