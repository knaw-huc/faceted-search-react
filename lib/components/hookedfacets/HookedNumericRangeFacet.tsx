import {ReactNode} from 'react';
import {Facet, NumericRangeFacet} from 'components/facets';
import {FacetProps} from 'components/facets/Facet';
import useNumericRangeFacet from 'hooks/useNumericRangeFacet';
import FilterFacetContext from 'context/FilterFacet';

interface HookedNumericRangeFacetProps extends Omit<FacetProps, 'label' | 'children'> {
    facetKey: string;
    min: number;
    max: number;
    step: number;
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
                                                    startMin,
                                                    startMax,
                                                    children,
                                                    allowToggle = true,
                                                    startOpen = true
                                                }: HookedNumericRangeFacetProps) {
    const {label, value, onChange} = useNumericRangeFacet(facetKey, min, max);

    return (
        <Facet label={label} infoText={infoText} startOpen={startOpen} allowToggle={allowToggle}>
            {children && <FilterFacetContext facetKey={facetKey}>
                {children}
            </FilterFacetContext>}

            <NumericRangeFacet min={min} max={max} step={step} onChange={onChange}
                               startMin={value ? value[0] : startMin} startMax={value ? value[1] : startMax}/>
        </Facet>
    );
}
