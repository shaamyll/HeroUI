// components/common/ToastProvider.tsx
'use client';

import { ToastProvider, addToast } from "@heroui/react";
import type { ReactNode } from "react";

interface ToastProviderProps {
  children: ReactNode;
  placement?: ToastPlacement;
  toastOffset?: number;
}

export default function ToastProvider({ 
  children, 
  placement = "top-right", 
  toastOffset = 60 
}: ToastProviderProps) {
  return (
    <>
      <ToastProvider placement={placement} toastOffset={toastOffset} />
      {children}
    </>
  );
}