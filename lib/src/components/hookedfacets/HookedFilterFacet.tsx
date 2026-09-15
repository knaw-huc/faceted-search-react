import {useEffect} from 'react';
import {Facet, FilterFacet, FilterFacetItems} from 'components/facets';
import useFilterFacet from 'hooks/useFilterFacet';
import useFilterFacetSelection from 'hooks/useFilterFacetSelection';
import useUpdateFacetValueLabels from 'hooks/useUpdateFacetValueLabels';

import type {FacetProps} from 'components/facets/Facet';
import type {FilterFacetItem, Sort} from 'components/facets';

export type UseFilterFacetItems = (request: FilterFacetState) => FilterFacetItem[];

export interface FilterFacetState {
    facetKey: string;
    sort: Sort;
    textFilter: string;
    selected: string[];
}

export interface HookedFilterFacetProps extends BaseFilterFacetProps, Omit<FacetProps, 'label' | 'children'> {
    allowFilter?: boolean;
    allowSort?: boolean;
    initialLevels?: number;
}

interface HookedFilterFacetItemsProps extends BaseFilterFacetProps {
    sort: Sort;
    textFilter: string;
    initialLevels: number;
}

interface BaseFilterFacetProps {
    facetKey: string;
    useItems: UseFilterFacetItems;
    maxInitialItems?: number;
    showAmount?: boolean;
    itemsClosed?: boolean;
}

function mapFacetResultsToValueLabels(results: FilterFacetItem[]) {
    return results.reduce<Record<string, string>>((acc, result) => {
        if (result.label)
            acc[result.itemKey] = result.label;
        if (result.children)
            Object.assign(acc, mapFacetResultsToValueLabels(result.children));
        return acc;
    }, {});
}

export default function HookedFilterFacet({
                                              facetKey,
                                              infoText,
                                              allowFilter = true,
                                              allowSort = true,
                                              allowToggle = true,
                                              startOpen = true,
                                              showAmount = true,
                                              itemsClosed = false,
                                              maxInitialItems,
                                              useItems,
                                              initialLevels = 1,
                                          }: HookedFilterFacetProps) {
    const {label, sort, textFilter, onTextFilterChange, onSort} = useFilterFacet(facetKey);

    return (
        <Facet label={label} infoText={infoText} startOpen={startOpen} allowToggle={allowToggle}>
            <FilterFacet onTextFilterChange={allowFilter ? onTextFilterChange : undefined}
                         onSort={allowSort ? onSort : undefined} sort={sort}>
                <HookedFilterFacetItems facetKey={facetKey} sort={sort} textFilter={textFilter}
                                        useItems={useItems} maxInitialItems={maxInitialItems}
                                        showAmount={showAmount} itemsClosed={itemsClosed}
                                        initialLevels={initialLevels} />
            </FilterFacet>
        </Facet>
    );
}

function HookedFilterFacetItems({
                                    facetKey,
                                    sort,
                                    textFilter,
                                    useItems,
                                    maxInitialItems,
                                    showAmount,
                                    initialLevels,
                                    itemsClosed
                                }: HookedFilterFacetItemsProps) {
    const {selected, onSelect} = useFilterFacetSelection(facetKey);
    const updateFacetValueLabels = useUpdateFacetValueLabels(facetKey);
    const items = useItems({facetKey, sort, textFilter, selected: [...selected].sort()});

    useEffect(() => updateFacetValueLabels(mapFacetResultsToValueLabels(items)), [updateFacetValueLabels, items]);

    return (
        <FilterFacetItems items={items} selected={selected} onSelect={onSelect} initialLevels={initialLevels}
                          maxInitialItems={maxInitialItems} showAmount={showAmount} itemsClosed={itemsClosed}/>
    );
}
