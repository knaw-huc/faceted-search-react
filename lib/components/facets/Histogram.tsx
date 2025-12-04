import {scaleBand, scaleLinear} from 'd3-scale';
import {extent} from 'd3-array';
import classes from './Histogram.module.css';

interface HistogramItem {
    year: number;
    amount: number;
}

export function Histogram({items}: {items: HistogramItem[]}) {
    items.sort((a, b) => {
        if (a.year > b.year) return 1;
        if (b.year > a.year) return -1;
        return 0;
    })

    const data_years = items.map((item) => item.year);
    const data_amounts = items.map((item) => item.amount);
    const data = items.map((item) => ({x: item.year, y: item.amount}))

    const width = 300;
    const height = 150;

    const marginLeft = 0;
    const marginRight = 0;
    const marginTop = 32;
    const marginBottom = 8;

    const x = scaleBand(data_years, [marginLeft, width - marginRight]).padding(0.01);
    const y = scaleLinear(extent(data_amounts) as [number, number], [height - marginBottom, marginTop]);

    return <>
        <svg width={width} height={height}>
            <g fill={"var(--color-support-001)"} stroke={"currentColor"} strokeWidth={"1.5"}>
                {data.map((d, i) => (
                    <g className={classes['barchart-bar']} key={i}>
                        <rect x={x(d.x)} y={marginTop} width={x.bandwidth()} height={height - marginBottom - marginTop} fill={"white"} stroke={"none"} opacity={0} />
                        <rect className={classes.barchartBarFill} x={x(d.x)} y={y(d.y)} width={x.bandwidth()} height={height - 4 - y(d.y)} opacity={0.8} />
                        <text
                            x={marginLeft}
                            y={marginTop / 2}
                            textAnchor={"start"}
                            alignmentBaseline={"central"}
                            fontSize={12}
                            fill={"currentColor"}
                        >
                            {d.x}: {d.y}
                        </text>
                    </g>
                ))}
            </g>
        </svg>
    </>
}