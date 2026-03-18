import {scaleBand, scaleLinear} from 'd3-scale';
import {extent} from 'd3-array';
import classes from './Histogram.module.css';
import {useRef, useState} from "react";
import {Term} from "./RangeSlider";
import {CalendarDate, getLocalTimeZone} from "@internationalized/date";

const width = 300;
const height = 150;

const marginLeft = 0;
const marginRight = 0;
const marginTop = 16;
const marginBottom = 8;

interface TooltipData {
    x: number;
    y: number;
    term: Term | null;
}

interface Selection {
    start: number | CalendarDate;
    end: number | CalendarDate;
}

export default function Histogram({terms, selection}: { terms: Term[], selection: Selection }) {
    const [tooltipData, setTooltipData] = useState<TooltipData>({x: 0, y: 0, term: null});

    return (
        <div className="mx-3 mb-3">
            <HistogramVisualization terms={terms} setTooltipData={setTooltipData} selection={selection} />
            <Tooltip {...tooltipData}/>
        </div>
    );
}

function isActive(term: Term, selection: Selection): boolean {

    function inRange(val: number | Date): boolean {
        let start, end;
        if (val instanceof Date) {
            start = (selection.start as CalendarDate).toDate(getLocalTimeZone());
            end = (selection.end as CalendarDate).toDate(getLocalTimeZone());
        } else {
            start = selection.start;
            end = selection.end;
        }
        return val >= start && val <= end;
    }

    if (typeof term.start == 'string') {
        // Dealing with a date
        const startDate = new Date(term.start);
        const endDate = new Date(term.end);
        return inRange(startDate) || inRange(endDate);
    }
    // Dealing with numbers
    const startNum = term.start as number;
    const endNum = term.end as number;
    return inRange(startNum) || inRange(endNum)
}

function HistogramVisualization({terms, setTooltipData, selection}: {
    terms: Term[],
    setTooltipData: (value: TooltipData | ((prev: TooltipData) => TooltipData)) => void,
    selection: Selection,
}) {
    const svgRef = useRef<SVGSVGElement>(null);

    const data_years = terms.map((item) => item.start);
    const data_amounts = terms.map((item) => item.count);
    const data = terms.map((item) => ({x: item.start, y: item.count}))

    const x = scaleBand(data_years, [marginLeft, width - marginRight]).padding(0);
    const y = scaleLinear(extent(data_amounts) as [number, number], [height - marginBottom, marginTop]);

    return (
        <svg onMouseLeave={() => setTooltipData(tooltipData => ({...tooltipData, term: null}))} ref={svgRef}
             width={"100%"} height={height} viewBox={"0 0 " + width + " " + height}>
            <g fill={"var(--color-support-001)"} stroke={"currentColor"} strokeWidth={"1"}>
                {data.map((d) => (
                    <g onMouseEnter={() => {
                        const bounding = svgRef.current!.getBoundingClientRect();
                        const tx = (x(d.x) as number) + bounding.left;
                        const ty = y(d.y) + bounding.top - 50;
                        setTooltipData({
                            x: tx,
                            y: ty,
                            term: terms[data_years.indexOf(d.x)]
                        })
                    }} className={classes['barchart-bar']
                        + (isActive(terms[data_years.indexOf(d.x)], selection)
                            ? (' ' + classes['active'])
                            : '')} key={`${d.x}-${d.y}`}>
                        <rect className={classes['barchart-bar-background']} x={Math.floor(x(d.x) as number)}
                              y={marginTop} width={Math.ceil(x.bandwidth())} height={height - marginTop}
                              stroke={"none"} opacity={1}/>
                        <rect className={classes['barchart-bar-fill']} x={Math.floor(x(d.x) as number)}
                              y={Math.round(y(d.y))} width={Math.ceil(x.bandwidth())}
                              height={Math.round(height - y(d.y))} strokeOpacity={0}/>
                    </g>
                ))}
            </g>
        </svg>
    );
}

function Tooltip({x, y, term}: TooltipData) {
    const startReadable = typeof term?.start == 'string' ? new Date(term?.start as string).toDateString() : term?.start;
    const endReadable = typeof term?.end == 'string' ? new Date(term?.end as string).toDateString() : term?.end;

    return (
        <div hidden={term === null} className={classes.tooltip} style={{top: y, left: x}}>
            <strong>{startReadable} - {endReadable}</strong><br />
            {term?.count} results
        </div>
    );
}