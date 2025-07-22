import {Facet, RangeFacet} from '../facets';
import {FacetProps} from '../facets/Facet.tsx';
import useRangeFacet from '../../hooks/useRangeFacet';

interface HookedRangeFacetProps extends Omit<FacetProps, 'label' | 'children'> {
    facetKey: string;
    min: number;
    max: number;
    step: number;
    startMin?: number;
    startMax?: number;
}

export default function HookedRangeFacet({
                                             facetKey,
                                             infoText,
                                             min,
                                             max,
                                             step,
                                             startMin,
                                             startMax,
                                             allowToggle = true,
                                             startOpen = true
                                         }: HookedRangeFacetProps) {
    const {label, value, onChange} = useRangeFacet(facetKey, min, max);

    return (
        <Facet label={label} infoText={infoText} startOpen={startOpen} allowToggle={allowToggle}>
            <RangeFacet min={min} max={max} step={step} onChange={onChange}
                        startMin={value ? value[0] : startMin} startMax={value ? value[1] : startMax}/>
        </Facet>
    );
}
