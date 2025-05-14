import {Facet, FilterFacet} from '../facets';
import {FacetProps} from '../facets/Facet.tsx';
import useFilterFacet, {UseFetchItems} from '../../hooks/useFilterFacet';

interface HookedFilterFacetProps extends Omit<FacetProps, 'children'> {
    facetKey: string;
    useFetchItems: UseFetchItems;
    maxInitialItems?: number;
    showAmount?: boolean;
    itemsClosed?: boolean;
    allowFilter?: boolean;
    allowSort?: boolean;
}

export default function HookedFilterFacet({
                                              facetKey,
                                              label,
                                              infoText,
                                              useFetchItems,
                                              maxInitialItems,
                                              showAmount,
                                              itemsClosed,
                                              allowFilter = true,
                                              allowSort = true,
                                              allowToggle = true,
                                              startOpen = true,
                                          }: HookedFilterFacetProps) {
    const {items, selected, onSelect, onTextFilterChange, onSort} = useFilterFacet(facetKey, label, useFetchItems);

    return (
        <Facet label={label} infoText={infoText} startOpen={startOpen} allowToggle={allowToggle}>
            <FilterFacet items={items} selected={selected}
                         maxInitialItems={maxInitialItems} showAmount={showAmount} itemsClosed={itemsClosed}
                         onSelect={onSelect} onSort={allowSort ? onSort : undefined}
                         onTextFilterChange={allowFilter ? onTextFilterChange : undefined}/>
        </Facet>
    );
}
