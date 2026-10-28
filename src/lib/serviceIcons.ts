import React from "react";
import {
  ShieldCheck,
  Sparkles,
  Leaf,
  Users,
  Building,
  Briefcase,
  HardHat,
  Wrench,
  Shield,
  Award,
  CheckCircle,
  Truck,
  HeartPulse,
  Camera,
  Warehouse,
  Flame,
  UserCheck,
  Clock,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

export interface IconOption {
  name: string;
  label: string;
  icon: LucideIcon;
}

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Sparkles,
  Leaf,
  Users,
  Building,
  Briefcase,
  HardHat,
  Wrench,
  Shield,
  Award,
  CheckCircle,
  Truck,
  HeartPulse,
  Camera,
  Warehouse,
  Flame,
  UserCheck,
  Clock,
};

export const SERVICE_ICON_OPTIONS: IconOption[] = [
  { name: "ShieldCheck", label: "Shield Check (Security)", icon: ShieldCheck },
  { name: "Sparkles", label: "Sparkles (Housekeeping)", icon: Sparkles },
  { name: "Leaf", label: "Leaf (Gardening)", icon: Leaf },
  { name: "Users", label: "Users (Manpower)", icon: Users },
  { name: "Building", label: "Building (Corporate)", icon: Building },
  { name: "Briefcase", label: "Briefcase (Commercial)", icon: Briefcase },
  { name: "HardHat", label: "Hard Hat (Industrial)", icon: HardHat },
  { name: "Wrench", label: "Wrench (Maintenance)", icon: Wrench },
  { name: "Shield", label: "Shield (Protection)", icon: Shield },
  { name: "Camera", label: "Camera (CCTV)", icon: Camera },
  { name: "Warehouse", label: "Warehouse (Facility)", icon: Warehouse },
  { name: "UserCheck", label: "User Check (Supervision)", icon: UserCheck },
  { name: "Flame", label: "Flame (Fire Safety)", icon: Flame },
  { name: "Truck", label: "Truck (Logistics)", icon: Truck },
  { name: "HeartPulse", label: "Heart Pulse (Healthcare)", icon: HeartPulse },
  { name: "Award", label: "Award (Quality)", icon: Award },
  { name: "CheckCircle", label: "Check Circle (Verified)", icon: CheckCircle },
  { name: "Clock", label: "Clock (24/7 Operations)", icon: Clock },
];

export function getServiceIcon(iconName: string): LucideIcon {
  return SERVICE_ICONS[iconName] || ShieldCheck || HelpCircle;
}
