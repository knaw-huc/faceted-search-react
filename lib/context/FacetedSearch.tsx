import {createContext, useRef, ReactNode} from 'react';
import createFacetedSearchStore, {SearchFn, FacetedSearchStore} from '../store/FacetedSearchStore.ts';

interface FacetedSearchParams<R> {
    searchFn: SearchFn<R>;
    pageSize?: number;
    children: ReactNode | ReactNode[];
}

export const FacetedSearchContext = createContext<FacetedSearchStore<any> | null>(null);

export default function FacetedSearch<R>({searchFn, pageSize, children}: FacetedSearchParams<R>) {
    const store = useRef<FacetedSearchStore<R>>(null);
    if (!store.current) {
        store.current = createFacetedSearchStore(searchFn, pageSize);
    }

    return (
        <FacetedSearchContext.Provider value={store.current}>
            {children}
        </FacetedSearchContext.Provider>
    );
}
