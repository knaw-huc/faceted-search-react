import {startTransition, useEffect, useState} from 'react';
import {DateRangePicker, I18nProvider} from 'react-aria-components';
import {CalendarDate, parseDate} from '@internationalized/date';
import {CalendarIcon} from '@heroicons/react/16/solid';
import RangeSlider from './RangeSlider';
import RangeInput from './RangeInput';
import DateInputSlot from './DateInputSlot';
import PopoverCalendar from './PopoverCalendar';

export interface DateRangeFacetProps {
    min: string;
    max: string;
    curMin?: string;
    curMax?: string;
    onChange: (min: string, max: string) => void;
}

export default function DateRangeFacet({
                                           min,
                                           max,
                                           curMin = min,
                                           curMax = max,
                                           onChange
                                       }: DateRangeFacetProps) {
    const minDate = parseDate(min);
    const maxDate = parseDate(max);
    const days = getDateDiff(minDate, maxDate);

    const [curMinMax, setCurMinMax] = useState<[CalendarDate, CalendarDate]>(() => [parseDate(curMin), parseDate(curMax)]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurMinMax([parseDate(curMin), parseDate(curMax)]);
    }, [curMin, curMax]);

    const curMinMaxDays: [number, number] = [
        getDateDiff(minDate, curMinMax[0]),
        getDateDiff(minDate, curMinMax[1])
    ];

    function getMinMax(min: number, max: number): [CalendarDate, CalendarDate] {
        return [minDate.add({days: min}), minDate.add({days: max})];
    }

    function onRangeChange({start, end}: { start: CalendarDate, end: CalendarDate }) {
        setCurMinMax([start, end]);
        startTransition(() => onChange(start.toString(), end.toString()));
    }

    function onRangeChangeDays(min: number, max: number) {
        const minMax = getMinMax(min, max);
        onRangeChange({start: minMax[0], end: minMax[1]});
    }

    return (
        <RangeSlider min={0} max={days} step={1} curMinMax={curMinMaxDays}
                     setCurMinMax={([min, max]) => setCurMinMax(getMinMax(min, max))}
                     onChange={onRangeChangeDays}>
            <I18nProvider locale="en-US">
                <DateRangePicker className="flex flex-col gap-1" aria-label="Date range picker"
                                 minValue={minDate} maxValue={maxDate}
                                 value={{start: curMinMax[0], end: curMinMax[1]}}
                                 onChange={range => range && onRangeChange(range)}>
                    <RangeInput
                        fromElement={<DateInputSlot slot="start"/>}
                        toElement={<DateInputSlot slot="end"/>}
                        buttonIcon={<CalendarIcon className="w-4 h-4"/>}/>

                    <PopoverCalendar min={minDate} max={maxDate}/>
                </DateRangePicker>
            </I18nProvider>
        </RangeSlider>
    );
}

function getDateDiff(start: CalendarDate, end: CalendarDate) {
    const a = new Date(start.toString()).getTime();
    const b = new Date(end.toString()).getTime();
    return Math.round((b - a) / (24 * 60 * 60 * 1000));
}
