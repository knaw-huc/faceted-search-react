import {useContext} from 'react';
import {useStore} from 'zustand';
import {FacetedSearchContext} from 'context/FacetedSearch';
import type {FacetedSearchStoreState} from 'store/FacetedSearchStore';

export default function useSearchContext<T>(selector: (state: FacetedSearchStoreState) => T): T {
    const store = useContext(FacetedSearchContext);
    if (!store) {
        throw new Error('Missing FacetedSearchContext.Provider in the tree');
    }

    return useStore(store, selector);
}
