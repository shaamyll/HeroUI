// components/common/CustomButton.tsx
import type { ReactNode } from "react";
import { Button } from "@heroui/react";

export interface ButtonProps {
  label?: string;
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  variant?: "solid" | "faded" | "bordered" | "light" | "flat" | "ghost" | "shadow";
  endContent?: ReactNode;
  startContent?: ReactNode;
  className?: string;
  onPress?: () => void;
  onClick?: () => void;
}

export default function CustomButton({
  label = "Button",
  isDisabled = false,
  size = "md",
  radius = "md",
  color = "default",
  variant = "solid",
  endContent,
  startContent,
  className = "",
  onPress,
  onClick
}: ButtonProps) {
  return (
    <Button
      isDisabled={isDisabled}
      size={size}
      radius={radius}
      color={color}
      variant={variant}
      endContent={endContent}
      startContent={startContent}
      className={className}
      onPress={onPress}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}