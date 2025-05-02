import {useContext} from 'react';
import {useStore} from 'zustand/react';
import {FacetedSearchContext} from '../context/FacetedSearch.tsx';
import {FacetedSearchStoreState} from '../store/FacetedSearchStore.ts';

export default function useSearchContext<R, T>(selector: (state: FacetedSearchStoreState<R>) => T): T {
    const store = useContext(FacetedSearchContext);
    if (!store) {
        throw new Error('Missing SearchContext.Provider in the tree');
    }

    return useStore(store, selector);
}
