import {useContext, useState, startTransition} from 'react';
import {Sort} from 'components/index';
import {FilterFacetContext} from 'context/FilterFacet';
import useFacet from './useFacet';

export interface useFilterFacetReturn {
    label: string;
    selected: Set<string>;
    textFilter: string;
    sort: Sort;
    onSelect: (selected: Set<string>) => void;
    onTextFilterChange: (textFilter: string) => void;
    onSort: (sort: Sort) => void;
}

export default function useFilterFacet(facetKey: string): useFilterFacetReturn {
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState<Sort>('hits');
    const [label, values, setValues] = useFacet(facetKey, []);

    const selected = new Set(Array.isArray(values) ? values : [values]);

    const onTextFilterChange = (textFilter: string) => startTransition(() => setFilter(textFilter));
    const onSort = (sortValue: Sort) => startTransition(() => setSort(sortValue));
    const onSelect = (selected: Set<string>) => startTransition(() => setValues(Array.from(selected)));

    return {label, selected, onSelect, textFilter: filter, sort, onTextFilterChange, onSort};
}

export function useFilterFacetContext(): useFilterFacetReturn {
    const filterFacetHook = useContext(FilterFacetContext);
    if (!filterFacetHook) {
        throw new Error('Missing FilterFacetContext.Provider in the tree');
    }

    return filterFacetHook;
}
