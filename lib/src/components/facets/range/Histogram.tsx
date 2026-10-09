import {extent} from 'd3-array';
import {scaleBand, scaleLinear, type ScaleBand, type ScaleLinear} from 'd3-scale';
import {TooltipTrigger, Tooltip, Focusable} from 'react-aria-components/Tooltip';
import {CalendarDate, getLocalTimeZone} from '@internationalized/date';
import classes from './Histogram.module.css';

import type {Term} from './RangeSlider';

const width = 300;
const height = 150;
const marginTop = 16;
const marginBottom = 8;

function isActive(term: Term, selection: [number | CalendarDate, number | CalendarDate]): boolean {
    const termStart = typeof term.start == 'string' ? new Date(term.start) : term.start as number;
    const termEnd = typeof term.end == 'string' ? new Date(term.end) : term.end as number;

    const start = selection[0] instanceof Date ? (selection[0] as CalendarDate).toDate(getLocalTimeZone()) : selection[0] as number;
    const end = selection[1] instanceof Date ? (selection[1] as CalendarDate).toDate(getLocalTimeZone()) : selection[1] as number;

    return termStart <= end && termEnd >= start;
}

export default function Histogram({terms, selection}: {
    terms: Term[],
    selection: [number | CalendarDate, number | CalendarDate]
}) {
    const dataYears = terms.map((item) => item.start);
    const dataAmounts = terms.map((item) => item.count);

    const x = scaleBand(dataYears, [0, width]).padding(0);
    const y = scaleLinear(extent(dataAmounts) as [number, number], [height - marginBottom, marginTop]);

    return (
        <svg className="mx-3 mb-3" viewBox={`0 0 ${width} ${height}`}>
            {terms.map((term) =>
                <Term key={`${term.start}-${term.count}`} term={term} x={x} y={y} selection={selection}/>)}
        </svg>
    );
}

function Term({term, x, y, selection}: {
    term: Term,
    x: ScaleBand<string | number>,
    y: ScaleLinear<number, number>,
    selection: [number | CalendarDate, number | CalendarDate]
}) {
    const start = x(term.start)!;
    const end = y(term.count);
    const active = isActive(term, selection);

    return (
        <TooltipTrigger delay={0} closeDelay={0}>
            <Focusable>
                <g className={`${classes.barchartBar} ${active ? classes.active : ''}`} role="button">
                    <rect className={classes.background}
                          x={Math.floor(start)} y={marginTop}
                          width={Math.ceil(x.bandwidth())} height={height - marginTop - marginBottom}/>

                    <rect className={classes.fill}
                          x={Math.floor(start)} y={Math.round(end)}
                          width={Math.ceil(x.bandwidth())} height={Math.round(height - end)}/>
                </g>
            </Focusable>

            <TermTooltip term={term} offset={50 - end}/>
        </TooltipTrigger>
    );
}

function TermTooltip({term, offset}: { term: Term, offset: number }) {
    const startReadable = typeof term.start == 'string' ? new Date(term.start).toDateString() : term.start;
    const endReadable = typeof term.end == 'string' ? new Date(term.end).toDateString() : term.end;

    return (
        <Tooltip className={classes.tooltip} offset={offset}>
            <div className={classes.range}>{startReadable} - {endReadable}</div>
            {term.count} results
        </Tooltip>
    );
}
