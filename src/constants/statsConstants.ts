// constants.ts
export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const sizeVariants = {
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

export const colorVariants = {
  blue: 'text-blue-600 bg-blue-50',
  green: 'text-green-600 bg-green-50',
  red: 'text-red-600 bg-red-50',
  purple: 'text-purple-600 bg-purple-50',
  orange: 'text-orange-600 bg-orange-50',
  gray: 'text-gray-600 bg-gray-50'
} as const;

export const cardVariants = {
  default: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
  elevated: 'bg-white shadow-lg hover:shadow-xl border-0',
  outlined: 'bg-white border-2 border-gray-200 hover:border-gray-300',
  ghost: 'bg-gray-50 hover:bg-white border border-gray-100'
} as const;