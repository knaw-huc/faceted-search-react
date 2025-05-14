import {useContext} from 'react';
import {useStore} from 'zustand/react';
import {FacetedSearchContext} from '../context/FacetedSearch';
import {FacetedSearchStoreState} from '../store/FacetedSearchStore';

export default function useSearchContext<R, T>(selector: (state: FacetedSearchStoreState<R>) => T): T {
    const store = useContext(FacetedSearchContext);
    if (!store) {
        throw new Error('Missing FacetedSearchContext.Provider in the tree');
    }

    return useStore(store, selector);
}
