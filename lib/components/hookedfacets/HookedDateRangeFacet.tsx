import {ReactNode} from 'react';
import {Facet, DateRangeFacet} from 'components/facets';
import {FacetProps} from 'components/facets/Facet';
import useDateRangeFacet from 'hooks/useDateRangeFacet';
import FilterFacetContext from 'context/FilterFacet';

interface HookedDateRangeFacetProps extends Omit<FacetProps, 'label' | 'children'> {
    facetKey: string;
    min: string;
    max: string;
    startMin?: string;
    startMax?: string;
    children?: ReactNode;
}

export default function HookedDateRangeFacet({
                                                 facetKey,
                                                 infoText,
                                                 min,
                                                 max,
                                                 startMin,
                                                 startMax,
                                                 children,
                                                 allowToggle = true,
                                                 startOpen = true
                                             }: HookedDateRangeFacetProps) {
    const {label, value, onChange} = useDateRangeFacet(facetKey, min, max);

    return (
        <Facet label={label} infoText={infoText} startOpen={startOpen} allowToggle={allowToggle}>
            {children && <FilterFacetContext facetKey={facetKey}>
                {children}
            </FilterFacetContext>}

            <DateRangeFacet min={min} max={max} onChange={onChange}
                            startMin={value ? value[0] : startMin} startMax={value ? value[1] : startMax}/>
        </Facet>
    );
}
