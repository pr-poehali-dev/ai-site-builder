
import React from "react";
import * as LucideIcons from "lucide-react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof LucideIcons;
  size?: number;
  fallback?: keyof typeof LucideIcons;
}

const Icon: React.FC<IconProps> = ({ name, fallback = "CircleAlert", size = 24, ...props }) => {
  const LucideIcon = LucideIcons[name] || LucideIcons[fallback];
  
  return <LucideIcon size={size} {...props} />;
};

export default Icon;
