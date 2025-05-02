import {RangeFacet} from '../facets';
import useRangeFacet from '../../hooks/useRangeFacet.ts';

interface HookedRangeFacetProps {
    facetKey: string;
    min: number;
    max: number;
    step: number;
    startMin?: number;
    startMax?: number;
}

export default function HookedRangeFacet({facetKey, min, max, step, startMin, startMax}: HookedRangeFacetProps) {
    const {value, onChange} = useRangeFacet(facetKey, min, max);

    return RangeFacet({
        min,
        max,
        step,
        startMin: value ? value[0] : startMin,
        startMax: value ? value[1] : startMax,
        onChange
    });
}
