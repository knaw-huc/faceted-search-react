import {type ReactNode} from 'react';
import {Facet, NumericRangeFacet, type Term} from 'components/facets';
import type {FacetProps} from 'components/facets/Facet';
import useNumericRangeFacet from 'hooks/useNumericRangeFacet';

interface HookedNumericRangeFacetProps extends Omit<FacetProps, 'label' | 'children'> {
    facetKey: string;
    min: number;
    max: number;
    step: number;
    terms?: Term[];
    startMin?: number;
    startMax?: number;
    children?: ReactNode;
}

export default function HookedNumericRangeFacet({
                                                    facetKey,
                                                    infoText,
                                                    min,
                                                    max,
                                                    step,
                                                    terms,
                                                    startMin,
                                                    startMax,
                                                    children,
                                                    allowToggle = true,
                                                    startOpen = true
                                                }: HookedNumericRangeFacetProps) {
    const {label, value, onChange} = useNumericRangeFacet(facetKey, min, max);

    return (
        <Facet label={label} infoText={infoText} startOpen={startOpen} allowToggle={allowToggle}>
            {children}
            <NumericRangeFacet min={min} max={max} step={step} terms={terms} onChange={onChange}
                               curMin={value ? value[0] : startMin} curMax={value ? value[1] : startMax}/>
        </Facet>
    );
}
