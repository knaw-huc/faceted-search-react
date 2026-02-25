import {scaleBand, scaleLinear} from 'd3-scale';
import {extent} from 'd3-array';
import classes from './Histogram.module.css';
import {useRef, useState} from "react";

export interface HistogramItem {
    year: number | string;
    amount: number;
}

export default function Histogram({items}: {items: HistogramItem[]}) {
    const [tooltipData, setTooltipData] = useState({
        label: "",
        x: 0,
        y: 0,
        visible: false,
    });

    const svgRef = useRef<SVGSVGElement>(null);

    const data_years = items.map((item) => item.year);
    const data_amounts = items.map((item) => item.amount);
    const data = items.map((item) => ({x: item.year, y: item.amount}))

    const width = 300;
    const height = 150;

    const marginLeft = 0;
    const marginRight = 0;
    const marginTop = 32;
    const marginBottom = 8;

    const x = scaleBand(data_years, [marginLeft, width - marginRight]).padding(0);
    const y = scaleLinear(extent(data_amounts) as [number, number], [height - marginBottom, marginTop]);

    return <>
        <div className={"mx-2 pb-2"}>
            <svg onMouseLeave={() => setTooltipData({...tooltipData, visible: false})} ref={svgRef} width={"100%"} height={height} viewBox={"0 0 " + width + " " + height}>
                <g fill={"var(--color-support-001)"} stroke={"currentColor"} strokeWidth={"1"}>
                    {data.map((d, i) => (
                        <g onMouseEnter={() => {
                            const bounding = svgRef.current!.getBoundingClientRect();
                            const tx = (x(d.x) as number) + bounding.left;
                            const ty = y(d.y) + bounding.top - 50;
                            setTooltipData({
                                x: tx,
                                y: ty,
                                visible: true,
                                label: d.x.toString() + ": " + d.y
                        })}} className={classes['barchart-bar']} key={i}>
                            <rect className={classes['barchart-bar-background']} x={Math.floor(x(d.x) as number)} y={marginTop} width={Math.ceil(x.bandwidth())} height={height - marginTop} stroke={"none"} opacity={1} />
                            <rect className={classes['barchart-bar-fill']} x={Math.floor(x(d.x) as number)} y={Math.round(y(d.y))} width={Math.ceil(x.bandwidth())} height={Math.round(height - y(d.y))} opacity={0.8} strokeOpacity={0} />
                        </g>
                    ))}
                </g>
            </svg>
            <div hidden={!tooltipData.visible} className={classes.tooltip} style={{
                top: tooltipData.y,
                left: tooltipData.x,
            }}>
                {tooltipData.label}
            </div>
        </div>
    </>
}