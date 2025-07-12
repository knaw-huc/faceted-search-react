import {use, useState} from 'react';
import useFacet from './useFacet';
import useSearchState from './useSearchState';
import {SearchState} from '../store';
import {FilterFacetItem, Selected, Sort} from '../components';

interface useFilterFacetReturn {
    items: FilterFacetItem[] | Promise<FilterFacetItem[]>;
    selected: Selected;
    onSelect: (selected: Selected) => void;
    onTextFilterChange: (textFilter: string) => void;
    onSort: (sort: Sort) => void;
}

export type FetchItemsFn = (state: SearchState, selected: string[], textFilter?: string, sort?: Sort) =>
    FilterFacetItem[] | Promise<FilterFacetItem[]>;

const getFlattenedItems = (items: FilterFacetItem[]): FilterFacetItem[] =>
    items.reduce<FilterFacetItem[]>((acc, item) => {
        if (item.children) {
            return acc.concat(getFlattenedItems(item.children));
        }
        return acc.concat(item);
    }, []);

const getReadableValue = (items: FilterFacetItem[], value: string): string =>
    getFlattenedItems(items).find(item => item.itemKey == value)?.label || '';

export default function useFilterFacet(facetKey: string, label: string, fetchItemsFn: FetchItemsFn): useFilterFacetReturn {
    const state = useSearchState();
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState<Sort>('asc');
    const [values, setValues] = useFacet(facetKey, label, value => getReadableValue(items instanceof Promise ? use(items) : items, value), []);

    // const filteredState = {...state, facetValues: {...state.facetValues}};
    // delete filteredState.facetValues[facetKey];

    const items = fetchItemsFn(state, values as string[], filter, sort);
    const selected = Object.fromEntries((Array.isArray(values) ? values : [values]).map(value => [value, true]));

    function onSelect(selected: Selected) {
        const newValues = Object.entries(selected)
            .filter(([_itemKey, selected]) => selected === true)
            .map(([itemKey]) => itemKey);
        setValues(newValues);
    }

    return {items, selected, onSelect, onTextFilterChange: setFilter, onSort: setSort};
}
