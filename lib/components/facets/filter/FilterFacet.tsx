import {type ReactNode, Suspense} from 'react';
import GhostLines from 'components/utils/GhostLines';
import FilterFacetFilters, {type FilterFacetFiltersProps} from './FilterFacetFilters';

export interface FilterFacetProps extends FilterFacetFiltersProps {
    children: ReactNode;
}

export default function FilterFacet({onTextFilterChange, onSort, children, sort}: FilterFacetProps) {
    return (
        <>
            {(onTextFilterChange || onSort) &&
                <FilterFacetFilters onTextFilterChange={onTextFilterChange} onSort={onSort} sort={sort}/>}

            <Suspense fallback={<GhostLines/>}>
                {children}
            </Suspense>
        </>
    );
}
