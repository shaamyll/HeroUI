import React, { memo } from 'react';
import type { ReactNode } from 'react';
import { 
  Box, 
  DollarSign, 
  Wrench, 
  Activity, 
  Building,
  BarChart3, 
  TrendingUp, 
  Users 
} from 'lucide-react';

// Utility function for conditional classes (clsx alternative)
const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Type definitions
type IconType = React.ComponentType<{ className?: string }>;

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
  icon?: IconType;
  trend?: TrendData;
  statusData?: StatusData;
  badge?: string;
  description?: string;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'gray';
}

// Variant configurations
const sizeVariants = {
  sm: {
    container: 'p-4',
    title: 'text-sm font-medium',
    value: 'text-xl font-bold',
    icon: 'h-4 w-4',
    iconContainer: 'h-8 w-8',
    trend: 'text-xs'
  },
  md: {
    container: 'p-6',
    title: 'text-lg font-semibold',
    value: 'text-3xl font-bold',
    icon: 'h-5 w-5',
    iconContainer: 'h-10 w-10',
    trend: 'text-sm'
  },
  lg: {
    container: 'p-8',
    title: 'text-xl font-semibold',
    value: 'text-4xl font-bold',
    icon: 'h-6 w-6',
    iconContainer: 'h-12 w-12',
    trend: 'text-base'
  }
} as const;

const colorVariants = {
  blue: 'text-blue-600 bg-blue-50',
  green: 'text-green-600 bg-green-50',
  red: 'text-red-600 bg-red-50',
  purple: 'text-purple-600 bg-purple-50',
  orange: 'text-orange-600 bg-orange-50',
  gray: 'text-gray-600 bg-gray-50'
} as const;

const cardVariants = {
  default: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
  elevated: 'bg-white shadow-lg hover:shadow-xl border-0',
  outlined: 'bg-white border-2 border-gray-200 hover:border-gray-300',
  ghost: 'bg-gray-50 hover:bg-white border border-gray-100'
} as const;

export type Size = keyof typeof sizeVariants;
export type ColorVariant = keyof typeof colorVariants;
export type CardVariant = keyof typeof cardVariants;

// Main component props
export interface StatsContainerProps {
  /** Array of stat items to display */
  statsData: StatItemData[]; // Made required - no default data
  /** Size variant for the stats cards */
  size?: Size;
  /** Visual variant for the cards */
  variant?: CardVariant;
  /** Number of columns for different breakpoints */
  columns?: {
    sm?: 1 | 2 | 3;
    md?: 1 | 2 | 3 | 4;
    lg?: 1 | 2 | 3 | 4 | 5 | 6;
  };
  /** Custom className for the container */
  className?: string;
  /** Custom className for individual cards */
  cardClassName?: string;
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: string;
  /** Click handler for stat items */
  onItemClick?: (item: StatItemData, index: number) => void;
  /** Children for custom content */
  children?: ReactNode;
  /** Accessibility label for the container */
  ariaLabel?: string;
  /** Whether to animate the cards on hover */
  animated?: boolean;
  /** Custom render function for stat items */
  renderItem?: (item: StatItemData, index: number) => ReactNode;
}

// Individual stat card component
interface StatCardProps {
  item: StatItemData;
  index: number;
  size: Size;
  variant: CardVariant;
  animated: boolean;
  cardClassName?: string;
  onClick?: (item: StatItemData, index: number) => void;
}

const StatCard = memo<StatCardProps>(({ 
  item, 
  index, 
  size, 
  variant, 
  animated, 
  cardClassName, 
  onClick 
}) => {
  const sizeConfig = sizeVariants[size];
  const IconComponent = item.icon || Box;
  const colorClass = item.color ? colorVariants[item.color] : colorVariants.gray;
  
  const handleClick = () => {
    if (onClick) {
      onClick(item, index);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(item, index);
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-lg transition-all duration-300 ease-in-out',
        cardVariants[variant],
        sizeConfig.container,
        animated && 'hover:-translate-y-1',
        onClick && 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        cardClassName
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-labelledby={`stat-title-${index}`}
      aria-describedby={item.description ? `stat-desc-${index}` : undefined}
    >
      {/* Header with title and icon */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <h3 
            id={`stat-title-${index}`}
            className={cn(sizeConfig.title, 'text-gray-900')}
          >
            {item.title}
          </h3>
          {item.description && (
            <p 
              id={`stat-desc-${index}`}
              className="text-xs text-gray-500 mt-1"
            >
              {item.description}
            </p>
          )}
        </div>
        <div className={cn(
          'flex items-center justify-center rounded-lg',
          sizeConfig.iconContainer,
          colorClass
        )}>
          <IconComponent className={cn(sizeConfig.icon)} />
        </div>
        {item.badge && (
          <span className="absolute -top-2 -right-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {item.badge}
          </span>
        )}
      </div>

      {/* Main value */}
      <div className={cn(sizeConfig.value, 'text-gray-900 mb-2')}>
        {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
      </div>

      {/* Trend data */}
      {item.trend && (
        <div className={cn(
          'flex items-center font-medium mb-4',
          sizeConfig.trend,
          item.trend.isPositive ? 'text-green-600' : 'text-red-600'
        )}>
          <svg
            className={cn(
              'h-4 w-4 mr-1',
              item.trend.isPositive ? 'rotate-0' : 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          <span className="font-semibold">
            {item.trend.percentage}%
          </span>
          <span className="text-gray-400 text-xs ml-1">
            {item.trend.period}
          </span>
        </div>
      )}

      {/* Status data */}
      {item.statusData && (
        <div className="pt-3 border-t border-gray-100">
          <div className="flex justify-between text-sm">
            <div className="text-center">
              <div className="text-gray-500 text-xs mb-1">Active</div>
              <div className="font-semibold text-gray-900">{item.statusData.active}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 text-xs mb-1">Inactive</div>
              <div className="font-semibold text-gray-900">{item.statusData.inactive}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 text-xs mb-1">Not In Use</div>
              <div className="font-semibold text-gray-900">{item.statusData.notInUse}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

StatCard.displayName = 'StatCard';

// Loading skeleton component
const LoadingSkeleton = memo<{ size: Size; count?: number }>(({ size, count = 3 }) => {
  const sizeConfig = sizeVariants[size];
  
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'animate-pulse bg-gray-200 rounded-lg',
            sizeConfig.container
          )}
          role="status"
          aria-label="Loading statistics"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className={cn('bg-gray-300 rounded', sizeConfig.iconContainer)}></div>
          </div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      ))}
    </>
  );
});

LoadingSkeleton.displayName = 'LoadingSkeleton';

// Main component
const StatsContainer = memo<StatsContainerProps>(({
  statsData,
  size = 'md',
  variant = 'default',
  columns = { sm: 1, md: 2, lg: 3 },
  className,
  cardClassName,
  loading = false,
  error,
  onItemClick,
  children,
  ariaLabel = 'Statistics dashboard',
  animated = true,
  renderItem
}) => {
  // Grid column classes
  const gridCols = cn(
    'grid gap-4',
    columns.sm && `grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`
  );

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div 
          className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800"
          role="alert"
          aria-live="polite"
        >
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn('max-w-4xl mx-auto p-4', className)}
      role="region"
      aria-label={ariaLabel}
    >
      <div className={gridCols}>
        {loading ? (
          <LoadingSkeleton size={size} count={statsData.length} />
        ) : (
          statsData.map((item, index) => 
            renderItem ? (
              <div key={item.id || index}>
                {renderItem(item, index)}
              </div>
            ) : (
              <StatCard
                key={item.id || index}
                item={item}
                index={index}
                size={size}
                variant={variant}
                animated={animated}
                cardClassName={cardClassName}
                onClick={onItemClick}
              />
            )
          )
        )}
        {children}
      </div>
    </div>
  );
});

StatsContainer.displayName = 'StatsContainer';

// Export everything
export default StatsContainer;
export { StatCard, LoadingSkeleton };