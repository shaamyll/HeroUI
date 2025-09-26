// components/DynamicDatePicker.tsx
import { DateRangePicker } from '@heroui/react';
import type { RangeValue } from '@heroui/react';
import { CalendarRange } from 'lucide-react';

interface DynamicDatePickerProps {
    label?: string;
    description?: string;
    className?: string;
    firstDayOfWeek?: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
    value?: RangeValue<Date>;
    onChange?: (value: RangeValue<Date>) => void;
}

function DynamicDatePicker({
    label = 'Stay duration',
    description = 'Please select Date Range',
    className = 'max-w-xs',
    firstDayOfWeek = 'mon',
    onChange,
    value,
}: DynamicDatePickerProps) {
    return (
        <DateRangePicker
            variant='bordered'
            labelPlacement='outside'
            classNames={{
                label: "font-semibold text-xs"
            }}
            selectorIcon={<CalendarRange/>}
            label={label}
            description={description}
            className={className}
            firstDayOfWeek={firstDayOfWeek}
            onChange={onChange}
            value={value}
        />
    );
}

export default DynamicDatePicker;