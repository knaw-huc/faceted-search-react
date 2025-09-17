import {Facet, FilterFacet} from '../facets';
import {FacetProps} from 'components/facets/Facet';
import useFilterFacet, {FetchItemsFn} from 'hooks/useFilterFacet';

interface HookedFilterFacetProps extends Omit<FacetProps, 'label' | 'children'> {
    facetKey: string;
    fetchItemsFn: FetchItemsFn;
    maxInitialItems?: number;
    showAmount?: boolean;
    itemsClosed?: boolean;
    allowFilter?: boolean;
    allowSort?: boolean;
}

export default function HookedFilterFacet({
                                              facetKey,
                                              infoText,
                                              fetchItemsFn,
                                              maxInitialItems,
                                              showAmount,
                                              itemsClosed,
                                              allowFilter = true,
                                              allowSort = true,
                                              allowToggle = true,
                                              startOpen = true,
                                          }: HookedFilterFacetProps) {
    const {label, items, selected, onSelect, onTextFilterChange, onSort} = useFilterFacet(facetKey, fetchItemsFn);

    return (
        <Facet label={label} infoText={infoText} startOpen={startOpen} allowToggle={allowToggle}>
            <FilterFacet items={items} selected={selected}
                         maxInitialItems={maxInitialItems} showAmount={showAmount} itemsClosed={itemsClosed}
                         onSelect={onSelect} onSort={allowSort ? onSort : undefined}
                         onTextFilterChange={allowFilter ? onTextFilterChange : undefined}/>
        </Facet>
    );
}
