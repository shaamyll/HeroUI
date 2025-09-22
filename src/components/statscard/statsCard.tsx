// StatCard.tsx
import React, { memo } from 'react';
import { Box } from 'lucide-react';
import { cn, sizeVariants, colorVariants, cardVariants } from '../../constants/statsConstants';
import type { StatItemData, Size, CardVariant } from '../../types/StatsTypes';

interface StatCardProps {
  item: StatItemData;
  index: number;
  size: Size;
  variant: CardVariant;
  animated: boolean;
  cardClassName?: string;
  onClick?: (item: StatItemData, index: number) => void;
}

// Internal components as pure functions (not separate files)
const StatHeader = ({ item, size, index }: { item: StatItemData; size: Size; index: number }) => {
  const sizeConfig = sizeVariants[size];
  const IconComponent = item.icon || Box;
  const colorClass = item.color ? colorVariants[item.color] : colorVariants.gray;

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex-1">
        <h3 id={`stat-title-${index}`} className={cn(sizeConfig.title, 'text-gray-900')}>
          {item.title}
        </h3>
        {item.description && (
          <p id={`stat-desc-${index}`} className="text-xs text-gray-500 mt-1">
            {item.description}
          </p>
        )}
      </div>
      <div className={cn('flex items-center justify-center rounded-lg', sizeConfig.iconContainer, colorClass)}>
        <IconComponent className={cn(sizeConfig.icon)} />
      </div>
      {item.badge && (
        <span className="absolute -top-2 -right-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {item.badge}
        </span>
      )}
    </div>
  );
};

const StatValue = ({ value, size }: { value: number | string; size: Size }) => {
  const sizeConfig = sizeVariants[size];
  return (
    <div className={cn(sizeConfig.value, 'text-gray-900 mb-2')}>
      {typeof value === 'number' ? value.toLocaleString() : value}
    </div>
  );
};

const StatTrend = ({ trend, size }: { trend: NonNullable<StatItemData['trend']>; size: Size }) => {
  const sizeConfig = sizeVariants[size];
  return (
    <div className={cn(
      'flex items-center font-medium mb-4',
      sizeConfig.trend,
      trend.isPositive ? 'text-green-600' : 'text-red-600'
    )}>
      <svg
        className={cn('h-4 w-4 mr-1', trend.isPositive ? 'rotate-0' : 'rotate-180')}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
      <span className="font-semibold">{trend.percentage}%</span>
      <span className="text-gray-400 text-xs ml-1">{trend.period}</span>
    </div>
  );
};

const StatStatus = ({ statusData }: { statusData: NonNullable<StatItemData['statusData']> }) => (
  <div className="pt-3 border-t border-gray-100">
    <div className="flex justify-between text-sm">
      {[
        { label: 'Active', value: statusData.active },
        { label: 'Inactive', value: statusData.inactive },
        { label: 'Not In Use', value: statusData.notInUse }
      ].map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-gray-500 text-xs mb-1">{stat.label}</div>
          <div className="font-semibold text-gray-900">{stat.value}</div>
        </div>
      ))}
    </div>
  </div>
);

export const StatCard = memo<StatCardProps>(({ 
  item, 
  index, 
  size, 
  variant, 
  animated, 
  cardClassName, 
  onClick 
}) => {
  const sizeConfig = sizeVariants[size];
  
  const handleClick = () => onClick?.(item, index);
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
      <StatHeader item={item} size={size} index={index} />
      <StatValue value={item.value} size={size} />
      {item.trend && <StatTrend trend={item.trend} size={size} />}
      {item.statusData && <StatStatus statusData={item.statusData} />}
    </div>
  );
});

StatCard.displayName = 'StatCard';