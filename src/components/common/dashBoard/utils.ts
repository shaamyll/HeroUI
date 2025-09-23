// dashboard/utils.ts - ONLY utility functions, NO React components!
import type { ActionButton } from '../../../types/dashBoardTypes';

// SSR-safe utilities
export const isSSR = typeof window === 'undefined';
export const safeWindow = isSSR ? null : window;
export const safeDocument = typeof document !== 'undefined' ? document : null;
export const safeNavigator = typeof navigator !== 'undefined' ? navigator : null;

/**
 * Validates if a URL is safe for image loading
 */
export const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'data:' || 
           urlObj.protocol === 'blob:' || 
           urlObj.protocol === 'https:' ||
           (urlObj.protocol === 'http:' && urlObj.hostname === 'localhost');
  } catch {
    return false;
  }
};

/**
 * Filters action buttons based on user permissions
 */
export const filterButtonsByPermissions = (
  buttons: ActionButton[], 
  userPermissions: string[]
): ActionButton[] => {
  return buttons.filter(button => {
    if (!button.permissions || button.permissions.length === 0) return true;
    return button.permissions.some(permission => userPermissions.includes(permission));
  });
};

/**
 * Checks if the current device has low power capabilities
 */
export const checkDeviceCapabilities = (): boolean => {
  if (!safeWindow || !safeNavigator) return false;
  
  return (
    safeWindow.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    (safeNavigator.hardwareConcurrency && safeNavigator.hardwareConcurrency <= 2) ||
    ('connection' in safeNavigator && (safeNavigator as any).connection?.effectiveType === 'slow-2g')
  );
};

/**
 * Debounces a function call
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Checks if current screen size is mobile based on breakpoint
 */
export const checkIsMobile = (breakpoint: number = 768): boolean => {
  if (!safeWindow) return false;
  return safeWindow.innerWidth < breakpoint;
};

/**
 * Creates a resize observer with debouncing
 */
export const createDebouncedResizeHandler = (
  callback: () => void,
  delay: number = 100
) => {
  const debouncedCallback = debounce(callback, delay);
  
  return {
    handler: debouncedCallback,
    cleanup: () => {
      if (!safeWindow) return;
      safeWindow.removeEventListener('resize', debouncedCallback);
    }
  };
};

/**
 * Safely gets element dimensions
 */
export const getElementDimensions = (element: HTMLElement | null) => {
  if (!element) return { width: 0, height: 0 };
  
  const rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height
  };
};
