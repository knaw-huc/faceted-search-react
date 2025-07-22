import {createContext, useRef, ReactNode} from 'react';
import createFacetedSearchStore, {Facets, SearchFn, FacetedSearchStore} from '../store/FacetedSearchStore';

interface FacetedSearchParams<R> {
    facets: Facets;
    searchFn: SearchFn<R>;
    searchLabel?: string;
    pageSize?: number;
    children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
export const FacetedSearchContext = createContext<FacetedSearchStore<any> | null>(null);

export default function FacetedSearch<R>({facets, searchFn, searchLabel, pageSize, children}: FacetedSearchParams<R>) {
    const store = useRef<FacetedSearchStore<R>>(null);
    if (!store.current) {
        store.current = createFacetedSearchStore(facets, searchFn, searchLabel, pageSize);
    }

    return (
        <FacetedSearchContext.Provider value={store.current}>
            {children}
        </FacetedSearchContext.Provider>
    );
}
