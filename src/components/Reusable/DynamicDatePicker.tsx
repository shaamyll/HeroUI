// components/DynamicDatePicker.tsx
import { DateRangePicker, DatePicker } from '@heroui/react';
import type { RangeValue, DateValue } from '@heroui/react';
import { CalendarDate, parseDate } from '@internationalized/date';

type DatePickerMode = 'single' | 'range';

interface DateRange {
  startDate: string;
  endDate: string;
}

interface DynamicDatePickerProps {
  label?: string;
  description?: string;
  className?: string;
  mode?: DatePickerMode;
  rangeValue?: DateRange | null;
  onRangeChange?: (value: DateRange | null) => void;
  singleValue?: string | undefined;
  onSingleChange?: (value: string | undefined) => void;
  calendarWidth?: number;
  isDisabled?: boolean;
  isRequired?: boolean;
  showDescription?: boolean;
}

// Convert DateValue to ISO string "YYYY-MM-DD"
const dateValueToIso = (dateValue: DateValue | null | undefined): string | undefined => {
  if (!dateValue) return undefined;
  
  // CalendarDate objects have year, month, day properties
  if (typeof dateValue === 'object' && 'year' in dateValue && 'month' in dateValue && 'day' in dateValue) {
    const year = Number(dateValue.year);
    const month = Number(dateValue.month);
    const day = Number(dateValue.day);
    
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return undefined;
    }
    
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }
  
  return undefined;
};

// Convert ISO string to CalendarDate
const isoToDateValue = (isoString: string | null | undefined): CalendarDate | null => {
  if (!isoString) return null;
  
  try {
    const dateOnly = isoString.split('T')[0];
    return parseDate(dateOnly);
  } catch (error) {
    console.warn('Failed to parse ISO date:', isoString);
    return null;
  }
};

function DynamicDatePicker({
  label = 'Pick a Date',
  description = 'Please select a date',
  mode = 'single',
  rangeValue,
  onRangeChange,
  singleValue,
  onSingleChange,
  className,
  calendarWidth = 300,
  isDisabled = false,
  isRequired = false,
  showDescription = false,
}: DynamicDatePickerProps) {
  const commonClassNames = {
    base: `w-full ${className || ''}`,
    label: "font-semibold text-xs text-black",
    inputWrapper: "border-default-300",
    input: "text-xs font-semibold",
    description: "font-medium text-xs text-foreground-400",
    calendar: "shadow-sm",
    calendarContent: "p-1 bg-white text-black border border-gray-200 shadow-md",
    selectorButton: "text-foreground-500 hover:text-primary",
  };

  const selectorIcon = <SelectorIcon className="text-xl" />;

  // Convert ISO strings to CalendarDate for internal use
  const internalSingleValue = isoToDateValue(singleValue);
  
  const internalRangeValue: RangeValue<DateValue> | null = rangeValue
    ? {
        start: isoToDateValue(rangeValue.startDate) as DateValue,
        end: isoToDateValue(rangeValue.endDate) as DateValue,
      }
    : null;

  // Handle single date change - convert to ISO before emitting
  const handleSingleChange = (date: DateValue | null) => {
    const isoString = dateValueToIso(date);
    onSingleChange?.(isoString);
  };

  // Handle range change - convert to ISO object before emitting
  const handleRangeChange = (range: RangeValue<DateValue> | null) => {
    if (!range) {
      onRangeChange?.(null);
      return;
    }
    
    const { start, end } = range;
    const startIso = dateValueToIso(start);
    const endIso = dateValueToIso(end);
    
    if (startIso && endIso) {
      onRangeChange?.({ startDate: startIso, endDate: endIso });
    } else {
      onRangeChange?.(null);
    }
  };

  if (mode === 'range') {
    return (
      <DateRangePicker
        variant="bordered"
        labelPlacement="outside"
        classNames={commonClassNames}
        selectorIcon={selectorIcon}
        label={label}
        aria-label={label}
        description={showDescription ? description : undefined}
        value={internalRangeValue}
        onChange={handleRangeChange}
        calendarWidth={calendarWidth}
        isDisabled={isDisabled}
        isRequired={isRequired}
      />
    );
  }

  return (
    <DatePicker
      variant="bordered"
      labelPlacement="outside"
      classNames={commonClassNames}
      selectorIcon={selectorIcon}
      label={label}
      aria-label={label}
      description={showDescription ? description : undefined}
      value={internalSingleValue}
      onChange={handleSingleChange}
      calendarWidth={calendarWidth}
      isDisabled={isDisabled}
      isRequired={isRequired}
    />
  );
}

export default DynamicDatePicker;
export type { DateRange };

export const SelectorIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M8 2v4m8-4v4" />
        <rect height="18" rx="2" width="18" x="3" y="4" />
        <path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
      </g>
    </svg>
  );
};