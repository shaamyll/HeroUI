// hooks/useToast.ts
import { useCallback } from "react";
import { addToast } from "@heroui/react";
import type { ToastConfig } from "../components/common/ToastButton";

export const UseToast = () => {
  const showToast = useCallback((config: ToastConfig) => {
    addToast({
      title: config.title || "Notification",
      description: config.description,
      hideIcon: config.hideIcon || false,
      promise: config.promise,
      endContent: config.endContent,
      startContent: config.startContent,
      timeout: config.timeout || 5000,
      shouldShowTimeoutProgress: config.shouldShowTimeoutProgress || false,
      icon: config.icon,
      color: config.color || "default",
      variant: config.variant || "solid",
      radius: config.radius || "md",
    });
  }, []);

  return { showToast };
};