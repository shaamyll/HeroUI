// components/DynamicDatePicker.tsx
import { DateRangePicker, DatePicker } from '@heroui/react';
import type { RangeValue, DateValue } from '@heroui/react';

type DatePickerMode = 'single' | 'range';

interface DynamicDatePickerProps {
    label?: string;
    description?: string;
    className?: string;
    mode?: DatePickerMode;
    // For range mode
    rangeValue?: RangeValue<DateValue>;
    onRangeChange?: (value: RangeValue<DateValue>) => void;
    // For single mode
    singleValue?: DateValue;
    onSingleChange?: (value: DateValue) => void;
    // Common props
    calendarWidth?: number;
    isDisabled?: boolean;
    isRequired?: boolean;
    placeholder?: string;
}

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
    placeholder,
}: DynamicDatePickerProps) {
    const commonClassNames = {
        base: `w-full ${className || ''}`,
        label: "font-semibold text-xs text-black",
        inputWrapper: "border-default-300 hover:border-primary",
        input: "text-xs font-semibold",
        description: "font-medium text-xs text-foreground-400",
        calendar: "shadow-md",
        calendarContent: "p-1",
        selectorButton: "text-foreground-500 hover:text-primary",
    };

    const selectorIcon = <SelectorIcon className="text-xl" />;

    if (mode === 'range') {
        return (
            <DateRangePicker
                variant="bordered"
                labelPlacement="outside"
                classNames={commonClassNames}
                selectorIcon={selectorIcon}
                label={label}
                description={description}
                value={rangeValue}
                onChange={onRangeChange}
                calendarWidth={calendarWidth}
                isDisabled={isDisabled}
                isRequired={isRequired}
                placeholder={placeholder}
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
            description={description}
            value={singleValue}
            onChange={onSingleChange}
            calendarWidth={calendarWidth}
            isDisabled={isDisabled}
            isRequired={isRequired}
            placeholder={placeholder}
        />
    );
}

export default DynamicDatePicker;

// Icon component
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