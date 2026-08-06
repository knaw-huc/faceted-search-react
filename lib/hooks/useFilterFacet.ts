import {startTransition, useState} from 'react';
import useFacet from './useFacet';
import type {Sort} from 'components/facets';

export interface UseFilterFacetReturn {
    label: string;
    textFilter: string;
    sort: Sort;
    onTextFilterChange: (textFilter: string) => void;
    onSort: (sort: Sort) => void;
}

export default function useFilterFacet(facetKey: string): UseFilterFacetReturn {
    const {label} = useFacet(facetKey, []);
    const [sort, setSort] = useState<Sort>('hits');
    const [textFilter, setTextFilter] = useState('');

    const onSort = (sortValue: Sort) => startTransition(() => setSort(sortValue));
    const onTextFilterChange = (textFilter: string) => startTransition(() => setTextFilter(textFilter));

    return {label, textFilter, sort, onTextFilterChange, onSort};
}
