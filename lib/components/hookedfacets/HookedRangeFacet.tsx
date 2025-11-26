import {Facet, RangeFacet} from 'components/facets';
import {FacetProps} from 'components/facets/Facet';
import useRangeFacet from 'hooks/useRangeFacet';
import {ReactNode} from "react";
import {default as FilterFacetContext} from 'context/FilterFacet';

interface HookedRangeFacetProps extends Omit<FacetProps, 'label' | 'children'> {
    facetKey: string;
    min: number;
    max: number;
    step: number;
    startMin?: number;
    startMax?: number;
    children?: ReactNode;
}

export default function HookedRangeFacet({
                                             facetKey,
                                             infoText,
                                             min,
                                             max,
                                             step,
                                             startMin,
                                             startMax,
                                             children,
                                             allowToggle = true,
                                             startOpen = true
                                         }: HookedRangeFacetProps) {
    const {label, value, onChange} = useRangeFacet(facetKey, min, max);

    return (
        <Facet label={label} infoText={infoText} startOpen={startOpen} allowToggle={allowToggle}>
            <FilterFacetContext facetKey={facetKey}>
                {children}
            </FilterFacetContext>
            <RangeFacet min={min} max={max} step={step} onChange={onChange}
                        startMin={value ? value[0] : startMin} startMax={value ? value[1] : startMax}/>
        </Facet>
    );
}
