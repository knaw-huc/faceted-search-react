import {ReactNode} from 'react';
import {Facet, FilterFacet, FilterFacetItem, FilterFacetItems} from 'components/facets';
import {FacetProps} from 'components/facets/Facet';
import {default as FilterFacetContext} from 'context/FilterFacet';
import {useFilterFacetContext} from 'hooks/useFilterFacet';

interface HookedFilterFacetProps extends Omit<FacetProps, 'label'> {
    facetKey: string;
    allowFilter?: boolean;
    allowSort?: boolean;
    children: ReactNode;
}

interface HookedFilterFacetItemsProps {
    items: FilterFacetItem[];
    maxInitialItems?: number;
    showAmount?: boolean;
    itemsClosed?: boolean;
}

export default function HookedFilterFacet({facetKey, ...props}: HookedFilterFacetProps) {
    return (
        <FilterFacetContext facetKey={facetKey}>
            <HookedFilterFacetInner {...props}/>
        </FilterFacetContext>
    );
}

function HookedFilterFacetInner({
                                    infoText,
                                    allowFilter = true,
                                    allowSort = true,
                                    allowToggle = true,
                                    startOpen = true,
                                    children
                                }: Omit<HookedFilterFacetProps, 'facetKey'>) {
    const {label, onTextFilterChange, onSort} = useFilterFacetContext();

    return (
        <Facet label={label} infoText={infoText} startOpen={startOpen} allowToggle={allowToggle}>
            <FilterFacet onTextFilterChange={allowFilter ? onTextFilterChange : undefined}
                         onSort={allowSort ? onSort : undefined}>
                {children}
            </FilterFacet>
        </Facet>
    );
}

export function HookedFilterFacetItems({items, maxInitialItems, showAmount, itemsClosed}: HookedFilterFacetItemsProps) {
    const {selected, onSelect} = useFilterFacetContext();

    return (
        <FilterFacetItems items={items} selected={selected} onSelect={onSelect}
                          maxInitialItems={maxInitialItems} showAmount={showAmount} itemsClosed={itemsClosed}/>
    );
}
