import {createContext, useRef, ReactNode} from 'react';
import createFacetedSearchStore, {Facets, SearchFn, FacetedSearchStore} from 'store/FacetedSearchStore';

interface FacetedSearchParams<R> {
    facets: Facets;
    searchFn: SearchFn<R>;
    children: ReactNode;
    searchLabel?: string;
    pageSize?: number;
}

// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
export const FacetedSearchContext = createContext<FacetedSearchStore<any> | null>(null);

export default function FacetedSearch<R>({facets, searchFn, searchLabel, pageSize, children}: FacetedSearchParams<R>) {
    const store = useRef<FacetedSearchStore<R>>(null);
    // eslint-disable-next-line react-hooks/refs
    if (!store.current) {
        store.current = createFacetedSearchStore(facets, searchFn, searchLabel, pageSize);
    }

    return (
        // eslint-disable-next-line react-hooks/refs
        <FacetedSearchContext.Provider value={store.current}>
            {children}

        </FacetedSearchContext.Provider>
    );
}
