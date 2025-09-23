// types/dashBoardTypes.ts - Updated interface
import type { ReactNode } from 'react';

export interface Tab {
  id: string;
  name: string;
  icon?: ReactNode;
  path: string;
  isActive?: boolean;
}

export interface ActionButton {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  permissions?: string[];
}

export interface DockConfiguration {
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: {
    mass?: number;
    stiffness?: number;
    damping?: number;
  };
  offsetTop?: number;
}

export interface DotGridConfiguration {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  shockRadius?: number;
  shockStrength?: number;
  resistance?: number;
  returnDuration?: number;
  opacity?: number;
  enabled?: boolean;
}

// UPDATED: DashboardHeaderProps now includes activeTab and onTabChange
export interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  actionButtons?: ActionButton[];
  bgColor?: string;
}

// Supporting interfaces for internal components (not part of main props)
export interface HeaderBackgroundProps {
  dotGridConfig: DotGridConfiguration;
  isLowPowerDevice: boolean;
}

export interface DesktopDockNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  dockProps: DockConfiguration;
  isMobile: boolean;
}

export interface SimpleMobileNavProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export interface MobileActionMenuProps {
  buttons: ActionButton[];
  userPermissions: string[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export interface ActionButtonComponentProps {
  button: ActionButton;
  userPermissions: string[];
  className?: string;
  onClick?: () => void;
}

// Hook return type
export interface DashboardState {
  isMobile: boolean;
  isActionMenuOpen: boolean;
  isLowPowerDevice: boolean;
  toggleActionMenu: () => void;
  closeActionMenu: () => void;
}