import {ReactNode} from 'react';
import {Facet, DateRangeFacet, HistogramItem} from 'components/facets';
import {FacetProps} from 'components/facets/Facet';
import useDateRangeFacet from 'hooks/useDateRangeFacet';

interface HookedDateRangeFacetProps extends Omit<FacetProps, 'label' | 'children'> {
    facetKey: string;
    min: string;
    max: string;
    items?: HistogramItem[];
    startMin?: string;
    startMax?: string;
    children?: ReactNode;
}

export default function HookedDateRangeFacet({
                                                 facetKey,
                                                 infoText,
                                                 min,
                                                 max,
                                                 items,
                                                 startMin,
                                                 startMax,
                                                 children,
                                                 allowToggle = true,
                                                 startOpen = true
                                             }: HookedDateRangeFacetProps) {
    const {label, value, onChange} = useDateRangeFacet(facetKey, min, max);

    return (
        <Facet label={label} infoText={infoText} startOpen={startOpen} allowToggle={allowToggle}>
            {children}
            <DateRangeFacet min={min} max={max} items={items} onChange={onChange}
                            curMin={value ? value[0] : startMin} curMax={value ? value[1] : startMax}/>
        </Facet>
    );
}
