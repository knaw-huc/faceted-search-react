import {ReactNode, useContext} from 'react';
import {useDateFormatter} from 'react-aria';
import {
    Button,
    Popover,
    Select,
    SelectValue,
    ListBox,
    ListBoxItem,
    RangeCalendar,
    CalendarGrid,
    CalendarGridHeader,
    CalendarGridBody,
    CalendarCell,
    CalendarHeaderCell,
    CalendarCellRenderProps,
    RangeCalendarStateContext
} from 'react-aria-components';
import {ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, CheckIcon} from '@heroicons/react/24/solid';
import type {CalendarDate} from '@internationalized/date';

export default function PopoverCalendar({min, max}: { min: CalendarDate, max: CalendarDate }) {
    return (
        <Popover offset={8}
                 className="p-2 bg-white shadow-2xl rounded-xl bg-clip-padding border border-black/10 text-neutral-700 outline-0">
            <RangeCalendar className="w-[calc(9*var(--spacing)*7)] max-w-full @container" minValue={min} maxValue={max}>
                {(min.year < max.year || min.month < max.month) && <CalendarHeader/>}
                <CalendarBody/>
            </RangeCalendar>
        </Popover>
    );
}

function CalendarHeader() {
    const state = useContext(RangeCalendarStateContext)!;

    return (
        <header className="flex items-center justify-between gap-1 pb-4 px-1 border-box">
            <Button slot="previous">
                <ChevronLeftIcon className="w-4 h-4"/>
            </Button>

            <MonthDropdown/>
            {state.minValue!.year < state.maxValue!.year && <YearDropdown/>}

            <Button slot="next">
                <ChevronRightIcon className="w-4 h-4"/>
            </Button>
        </header>
    );
}

function MonthDropdown() {
    const state = useContext(RangeCalendarStateContext)!;
    const formatter = useDateFormatter({month: 'short', timeZone: state.timeZone});

    const months: { id: number, date: CalendarDate, formatted: string }[] = [];
    const numMonths = state.focusedDate.calendar.getMonthsInYear(state.focusedDate);
    for (let i = 1; i <= numMonths; i++) {
        const date = state.focusedDate.set({month: i});
        months.push({
            id: i,
            date,
            formatted: formatter.format(date.toDate(state.timeZone)),
        });
    }

    return (
        <DateSelect value={state.focusedDate.month} data={months}
                    onChange={value => state.setFocusedDate(months[value - 1].date)}/>
    );
}

function YearDropdown() {
    const state = useContext(RangeCalendarStateContext)!;
    const formatter = useDateFormatter({year: 'numeric', timeZone: state.timeZone});

    const start = state.minValue!.year;
    const end = state.maxValue!.year;
    const years: { id: number, date: CalendarDate, formatted: string }[] = [];
    for (let i = start; i <= end; i++) {
        const date = state.focusedDate.set({year: i});
        years.push({
            id: i,
            date,
            formatted: formatter.format(date.toDate(state.timeZone)),
        });
    }

    return (
        <DateSelect value={state.focusedDate.year} data={years}
                    onChange={value => state.setFocusedDate(years.find(y => y.id === value)!.date)}/>
    );
}

function DateSelect({value, data, onChange}: {
    value: number,
    data: { id: number, date: CalendarDate, formatted: string }[],
    onChange: (value: number) => void
}) {
    return (
        <Select aria-label="Month" className="flex w-fit" value={value}
                onChange={key => typeof key === 'number' && onChange(key)}>

            <Button
                className="flex items-center gap-4 border border-black/10 rounded-lg pl-3 pr-2 transition bg-neutral-50 [-webkit-tap-highlight-color:transparent]">
                <SelectValue className="flex-1 text-sm"/>
                <ChevronDownIcon aria-hidden className="w-4 h-4"/>
            </Button>

            <Popover
                className="min-w-(--trigger-width) bg-white shadow-2xl rounded-xl bg-clip-padding border border-black/10 text-neutral-700 outline-0">
                <ListBox items={data}
                         className="outline-hidden box-border p-1 max-h-[inherit] overflow-auto [clip-path:inset(0_0_0_0_round_.75rem)]">
                    {item => <ListBoxItem
                        className="group flex items-center gap-4 py-2 pl-3 pr-3 cursor-pointer selected:pr-1 rounded-lg text-sm no-underline [-webkit-tap-highlight-color:transparent] pressed:bg-neutral-100 hover:bg-(--color-support-002) hover:text-white">
                        {({isSelected}) => <DateSelectItem isSelected={isSelected}>
                            {item.formatted}
                        </DateSelectItem>}
                    </ListBoxItem>}
                </ListBox>
            </Popover>
        </Select>
    );
}

function DateSelectItem({isSelected, children}: { isSelected: boolean, children: ReactNode }) {
    return (
        <>
            <span className="flex-1 gap-2 font-normal truncate group-selected:font-semibold">
              {children}
            </span>

            <span className="w-5">
              {isSelected && <CheckIcon className="w-4 h-4"/>}
            </span>
        </>
    );
}

function CalendarBody() {
    return (
        <CalendarGrid className="[&_td]:px-0 [&_td]:py-px border-spacing-0">
            <CalendarGridHeader>
                {day => (
                    <CalendarHeaderCell className="text-xs text-neutral-500 font-semibold">
                        {day}
                    </CalendarHeaderCell>
                )}
            </CalendarGridHeader>

            <CalendarGridBody>
                {date => (
                    <CalendarCell date={date}
                                  className="w-[calc(100cqw/7)] aspect-square text-sm outline-0 cursor-default outside-month:text-neutral-300 selected:text-white selected:bg-(--color-support-002) [td:first-child_&]:rounded-s-full selection-start:rounded-s-full [td:last-child_&]:rounded-e-full selection-end:rounded-e-full">
                        {cellProps => (
                            <CalendarCellSpan {...cellProps}/>
                        )}
                    </CalendarCell>
                )}
            </CalendarGridBody>
        </CalendarGrid>
    );
}

function CalendarCellSpan({formattedDate, isSelected, isSelectionStart, isSelectionEnd}: CalendarCellRenderProps) {
    const isCap = isSelected && (isSelectionStart || isSelectionEnd);

    const classes = 'w-full h-full flex items-center justify-center rounded-full text-neutral-900 group-hover:bg-neutral-200 group-pressed:bg-neutral-300';
    const capClasses = 'text-white';
    const selectedClasses = 'text-white group-hover:bg-blue-200 group-pressed:bg-blue-300';

    return (
        <span className={`${classes} ${isCap ? capClasses : ''} ${isSelected ? selectedClasses : ''}`}>
            {formattedDate}
        </span>
    );
}
