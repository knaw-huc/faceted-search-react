import {FilterFacet} from '../facets';
import useFilterFacet, {FilterFacetItemsFn} from '../../hooks/useFilterFacet.ts';

interface HookedFilterFacetProps {
    facetKey: string;
    filterFacetItemsFn: FilterFacetItemsFn;
    maxInitialItems?: number;
    showAmount?: boolean;
    itemsClosed?: boolean;
    allowFilter?: boolean;
    allowSort?: boolean;
}

export default function HookedFilterFacet({
                                              facetKey,
                                              filterFacetItemsFn,
                                              maxInitialItems,
                                              showAmount,
                                              itemsClosed,
                                              allowFilter = true,
                                              allowSort = true
                                          }: HookedFilterFacetProps) {
    const {items, selected, onSelect, onTextFilterChange, onSort} = useFilterFacet(facetKey, filterFacetItemsFn);

    return FilterFacet({
        items,
        selected,
        maxInitialItems,
        showAmount,
        itemsClosed,
        onSelect,
        onTextFilterChange: allowFilter ? onTextFilterChange : undefined,
        onSort: allowSort ? onSort : undefined,
    });
}
