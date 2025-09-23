// types/toastProps.ts
import type{ ReactNode } from "react";

export interface ToastProps {
  title?: string;
  description?: string;
  hideIcon?: boolean;
  promise?: Promise<any>;
  endContent?: ReactNode;
  startContent?: ReactNode;
  timeout?: number;
  shouldShowTimeoutProgress?: boolean;
  icon?: ReactNode;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  variant?: "solid" | "faded" | "bordered" | "light" | "flat" | "ghost" | "shadow";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  placement?: ToastPlacement;
}

export interface ToastConfig extends ToastProps {
  id?: string;
}