import type { ReactNode } from "react";
import { Chip } from "@heroui/react";

export interface ChipProps {
  children?: ReactNode;
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "dot";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  avatar?: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
  isDisabled?: boolean;
  isCloseable?: boolean;
  classNames?: Partial<Record<"base" | "content" | "dot" | "avatar" | "closeButton", string>>;
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
}

export default function CustomChip({
  children,
  variant = "solid",
  color = "default",
  size = "md",
  radius = "full",
  avatar,
  startContent,
  endContent,
  isDisabled = false,
  isCloseable = false,
  classNames,
  onClose,
  onClick,
  className = ""
}: ChipProps) {
  
  return (
    <Chip
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      avatar={avatar}
      startContent={startContent}
      endContent={endContent}
      isDisabled={isDisabled}
      onClose={isCloseable ? onClose : undefined}
      classNames={classNames}
      onClick={onClick}
      className={className}
    >
      {children}
    </Chip>
  );
}