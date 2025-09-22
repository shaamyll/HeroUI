// utils.ts
import { useState, useEffect, useCallback } from 'react';
import type { DockConfiguration, DotGridConfiguration } from '../../../types/dashBoardTypes';
// SSR Utils
export const isSSR = typeof window === 'undefined';
export const safeWindow = isSSR ? null : window;
export const safeDocument = typeof document !== 'undefined' ? document : null;
export const safeNavigator = typeof navigator !== 'undefined' ? navigator : null;

// Constants
export const DEFAULT_DOCK_CONFIG: DockConfiguration = {
  distance: 250, panelHeight: 80, baseItemSize: 48, dockHeight: 400,
  magnification: 80, spring: { mass: 0.1, stiffness: 150, damping: 12 }, offsetTop: -20
};

export const DEFAULT_DOT_GRID_CONFIG: DotGridConfiguration = {
  dotSize: 2, gap: 9, baseColor: '#FAF5F7', activeColor: '#FAF5F7',
  proximity: 100, shockRadius: 250, shockStrength: 5, resistance: 750,
  returnDuration: 1.5, opacity: 0.2, enabled: true
};

export const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['data:', 'blob:', 'https:', 'http:'].includes(urlObj.protocol);
  } catch { return false; }
};

// Hooks
export const useMobileDetection = (breakpoint: number) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (!safeWindow) return;
    const check = () => setIsMobile(safeWindow!.innerWidth < breakpoint);
    check();
    safeWindow.addEventListener('resize', check);
    return () => safeWindow.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
};

export const useDeviceCapabilities = () => {
  const [isLowPower, setIsLowPower] = useState(false);
  useEffect(() => {
    if (!safeWindow || !safeNavigator) return;
    const lowPower = safeWindow.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      (safeNavigator.hardwareConcurrency && safeNavigator.hardwareConcurrency <= 2);
    setIsLowPower(lowPower);
  }, []);
  return isLowPower;
};

export const useActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isActionMenuOpen: isOpen,
    toggleActionMenu: useCallback(() => setIsOpen(!isOpen), [isOpen]),
    closeActionMenu: useCallback(() => setIsOpen(false), []),
    setIsActionMenuOpen: setIsOpen
  };
};

export const usePermissionFilter = (userPermissions: string[]) => {
  return useCallback((buttons: any[]) => {
    return buttons.filter(button => 
      !button.permissions?.length || 
      button.permissions.some((p: string) => userPermissions.includes(p))
    );
  }, [userPermissions]);
};