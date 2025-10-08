import {createContext, ReactNode} from 'react';
import useFilterFacet, {useFilterFacetReturn} from 'hooks/useFilterFacet';

// eslint-disable-next-line react-refresh/only-export-components
export const FilterFacetContext = createContext<useFilterFacetReturn | null>(null);

export default function FilterFacet({facetKey, children}: {facetKey: string; children: ReactNode}) {
    const filterFacetHook = useFilterFacet(facetKey);

    return (
        <FilterFacetContext.Provider value={filterFacetHook}>
            {children}
        </FilterFacetContext.Provider>
    );
}
