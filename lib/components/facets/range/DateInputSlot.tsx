import {DateInput, DateSegment} from 'react-aria-components';

export default function DateInputSlot({slot}: { slot: string }) {
    return (
        <DateInput slot={slot}
                   className="inline px-3 leading-8.5 min-w-30 whitespace-nowrap overflow-x-auto text-sm text-center">
            {segment =>
                <DateSegment segment={segment}
                             className="inline p-0.5 whitespace-nowrap rounded-xs caret-transparent text-neutral-800 [-webkit-tap-highlight-color:transparent]"/>}
        </DateInput>
    );
}
