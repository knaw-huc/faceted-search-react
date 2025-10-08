import {useContext} from 'react';
import {useZustand} from 'use-zustand';
import {FacetedSearchContext} from '../context/FacetedSearch';
import {FacetedSearchStoreState} from '../store/FacetedSearchStore';

export default function useSearchContext<R, T>(selector: (state: FacetedSearchStoreState<R>) => T): T {
    const store = useContext(FacetedSearchContext);
    if (!store) {
        throw new Error('Missing FacetedSearchContext.Provider in the tree');
    }

    return useZustand(store, selector);
}
