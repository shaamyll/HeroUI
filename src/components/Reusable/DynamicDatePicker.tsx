// components/DynamicDatePicker.tsx
import { DateRangePicker } from '@heroui/react';
import type { RangeValue } from '@heroui/react';
import { CalendarRange } from 'lucide-react';

interface DynamicDatePickerProps {
    label?: string;
    description?: string;
    className?: string;
    value?: RangeValue<Date>;
    onChange?: (value: RangeValue<Date>) => void;
}

function DynamicDatePicker({
    label = 'Stay duration',
    description = 'Please select Date Range',
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
            onChange={onChange}
            value={value}
        />
    );
}

export default DynamicDatePicker;