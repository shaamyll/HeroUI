// types.ts
import type { ReactNode } from 'react';

export interface TrendData {
  percentage: number;
  period: string;
  isPositive: boolean;
}

export interface StatusData {
  active: number;
  inactive: number;
  notInUse: number;
}

export interface StatItemData {
  id?: string;
  title: string;
  value: number | string;
  icon?: React.ComponentType<{ className?: string }>;
  trend?: TrendData;
  statusData?: StatusData;
  badge?: string;
  description?: string;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'gray';
}

export type Size = 'sm' | 'md' | 'lg';
export type ColorVariant = 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'gray';
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'ghost';

export interface StatsContainerProps {
  statsData: StatItemData[];
  size?: Size;
  variant?: CardVariant;
  columns?: {
    sm?: 1 | 2 | 3;
    md?: 1 | 2 | 3 | 4;
    lg?: 1 | 2 | 3 | 4 | 5 | 6;
  };
  className?: string;
  cardClassName?: string;
  loading?: boolean;
  error?: string;
  onItemClick?: (item: StatItemData, index: number) => void;
  children?: ReactNode;
  ariaLabel?: string;
  animated?: boolean;
  renderItem?: (item: StatItemData, index: number) => ReactNode;
}