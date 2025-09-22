// StatsContainer.tsx
import React, { memo } from 'react';
import { cn, sizeVariants } from '../../constants/statsConstants';
import { StatCard } from './statsCard';
import type { StatsContainerProps, Size } from '../../types/StatsTypes';

// Loading skeleton as internal component
const LoadingSkeleton = ({ size, count = 3 }: { size: Size; count?: number }) => {
  const sizeConfig = sizeVariants[size];
  
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={cn('animate-pulse bg-gray-200 rounded-lg', sizeConfig.container)}
          role="status"
          aria-label="Loading statistics"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 bg-gray-300 rounded w-1/3" />
            <div className={cn('bg-gray-300 rounded', sizeConfig.iconContainer)} />
          </div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-300 rounded w-1/4" />
        </div>
      ))}
    </>
  );
};

// Error component as internal component  
const ErrorState = ({ error }: { error: string }) => (
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

export const StatsContainer = memo<StatsContainerProps>(({
  statsData,
  size = 'md',
  variant = 'default',
  columns = { sm: 1, md: 2, lg: 4 },
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
  const gridCols = cn(
    'grid gap-4',
    columns.sm && `grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`
  );

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div 
      className={cn('max-w-4xl mx-auto p-4', className)}
      role="region"
      aria-label={ariaLabel}
    >
      <div className={gridCols}>
        {loading ? (
          <LoadingSkeleton size={size} count={statsData.length || 3} />
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

// Default export for easier imports
export default StatsContainer;