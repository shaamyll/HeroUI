// types/dashboard.ts
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

export interface DashboardHeaderProps {
  // Basic header info
  title: string;
  subtitle: string;

  // Tabs configuration
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;

  // Action buttons
  actionButtons?: ActionButton[];

  // Mobile configuration
  showMobileNav?: boolean;
  mobileBreakpoint?: number;
  mobileFloatingButtons?: ActionButton[];

  // User permissions
  userPermissions?: string[];

  // Styling
  bgColor?: string;
  bgImage?: string;
  headerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;

  // Additional content
  additionalContent?: ReactNode;

  // Configurations
  dockProps?: DockConfiguration;
  dotGridConfig?: DotGridConfiguration;
}