import {useShallow} from 'zustand/react/shallow';
import useSearchContext from './useSearchContext';
import type {FacetedSearchStoreState, SearchState} from 'store/FacetedSearchStore';

export default function useSearchState(): SearchState {
    return useSearchContext(useShallow<FacetedSearchStoreState<never>, SearchState>(s => s.state));
}
