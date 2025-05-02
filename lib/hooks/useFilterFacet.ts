import {useEffect, useState} from 'react';
import useFacet from './useFacet.ts';
import useSearchState from './useSearchState.ts';
import {SearchState} from '../store/FacetedSearchStore.ts';
import {FilterFacetItem, Selected, Sort} from '../components/facets/FilterFacet.tsx';

interface useFilterFacetReturn {
    items: FilterFacetItem[];
    selected: Selected;
    onSelect: (selected: Selected) => void;
    onTextFilterChange: (textFilter: string) => void;
    onSort: (sort: Sort) => void;
}

export type FilterFacetItemsFn =
    (state: SearchState, selected: Selected, textFilter?: string, sort?: Sort)
        => Promise<FilterFacetItem[]>;

export default function useFilterFacet(facetKey: string, filterFacetItemsFn: FilterFacetItemsFn): useFilterFacetReturn {
    const state = useSearchState();
    const [values, setValues] = useFacet(facetKey);

    const [items, setItems] = useState<FilterFacetItem[]>([]);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState<Sort>('asc');

    const selected = Object.fromEntries(items.map(item => [item.itemKey, false]));
    for (const value of values) {
        selected[value] = true;
    }

    useEffect(() => {
        updateFacetValues();
    }, [state, selected, filter, sort]);

    function onSelect(selected: Selected) {
        const newValues = Object.entries(selected)
            .filter(([_itemKey, selected]) => selected === true)
            .map(([itemKey]) => itemKey);
        setValues(newValues);
    }

    async function updateFacetValues() {
        const items = await filterFacetItemsFn(state, selected, filter, sort);
        setItems(items);
    }

    return {items, selected, onSelect, onTextFilterChange: setFilter, onSort: setSort};
}
