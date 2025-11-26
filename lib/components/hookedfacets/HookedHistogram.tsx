import {FilterFacetItem} from "components/facets";
import {Histogram} from "components/facets/Histogram.tsx";

export default function HookedHistogram({items, min, max, interval}: {items: FilterFacetItem[], min: number, max: number, interval: number}) {
    return <>
        <Histogram items={items} min={min} max={max} interval={interval} />
    </>
}