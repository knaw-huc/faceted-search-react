import {FilterFacetItem} from "components/facets/FilterFacet.tsx";
import * as d3 from "d3";

export function Histogram({items, min, max, interval}: {items: FilterFacetItem[], min: number, max: number, interval: number}) {
    items.sort((a, b) => {
        if (a.itemKey > b.itemKey) return 1;
        if (b.itemKey > a.itemKey) return -1;
        return 0;
    })

    console.log("items", items)

    const data_years = items.map((item) => Number(item.itemKey));
    const data_amounts = items.map((item) => item.amount);
    const data = items.map((item) => ({x: Number(item.itemKey), y: item.amount}))

    // const all_years = Array.from({length: max - min + 1}, (_, i) => i + min);

    console.log("data", data);

    const width = 300;
    const height = 150;

    const marginLeft = 0;
    const marginRight = 0;
    const marginTop = 32;
    const marginBottom = 8;

    const x = d3.scaleBand(data_years, [marginLeft, width - marginRight]).padding(0.01);
    const y = d3.scaleLinear(d3.extent(data_amounts) as [number, number], [height - marginBottom, marginTop]);

    return <>
        <svg width={width} height={height}>
            <g fill={"var(--color-support-001)"} stroke={"currentColor"} strokeWidth={"1.5"}>
                {data.map((d, i) => (
                    <g className={"barchart-bar"} key={i}>
                        <rect x={x(d.x)} y={marginTop} width={x.bandwidth()} height={height - marginBottom - marginTop} fill={"white"} stroke={"none"} opacity={0} />
                        <rect className={"barchart-bar-fill"} x={x(d.x)} y={y(d.y)} width={x.bandwidth()} height={height - 4 - y(d.y)} opacity={0.8} />
                        <text
                            // x={x(d.x) + x.bandwidth() / 2}
                            x={marginLeft}
                            // y={y(d.y) - 10}
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