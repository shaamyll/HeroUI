// index.ts - Single entry point
export { default as StatsContainer } from './statscard/statsContainer';
export { StatCard } from './StatCard';

// Export types for TypeScript users
export type {
  StatsContainerProps,
  StatItemData,
  TrendData,
  StatusData,
  Size,
  ColorVariant,
  CardVariant
} from '../types/StatsTypes';

// Re-export utilities if needed externally
export { cn } from '../constants/statsConstants';