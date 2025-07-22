import {useState} from 'react';
import useFacet from './useFacet';
import useSearchState from './useSearchState';
import {SearchState} from '../store';
import {FilterFacetItem, Selected, Sort} from '../components';

interface useFilterFacetReturn {
    label: string;
    items: FilterFacetItem[] | Promise<FilterFacetItem[]>;
    selected: Selected;
    onSelect: (selected: Selected) => void;
    onTextFilterChange: (textFilter: string) => void;
    onSort: (sort: Sort) => void;
}

export type FetchItemsFn = (state: SearchState, selected: string[], textFilter?: string, sort?: Sort) =>
    FilterFacetItem[] | Promise<FilterFacetItem[]>;

export default function useFilterFacet(facetKey: string, fetchItemsFn: FetchItemsFn): useFilterFacetReturn {
    const state = useSearchState();
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState<Sort>('asc');
    const [label, values, setValues] = useFacet(facetKey, []);

    const items = fetchItemsFn(state, values as string[], filter, sort);
    const selected = Object.fromEntries((Array.isArray(values) ? values : [values]).map(value => [value, true]));

    function onSelect(selected: Selected) {
        const newValues = Object.entries(selected)
            .filter(([, selected]) => selected === true)
            .map(([itemKey]) => itemKey);
        setValues(newValues);
    }

    return {label, items, selected, onSelect, onTextFilterChange: setFilter, onSort: setSort};
}
