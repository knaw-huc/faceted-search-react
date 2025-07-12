import useSearchContext from './useSearchContext';
import {SearchState} from '../store';
import {useShallow} from 'zustand/react/shallow';
import {FacetedSearchStoreState} from '../store/FacetedSearchStore.ts';

export default function useSearchState(): SearchState {
    return useSearchContext(useShallow<FacetedSearchStoreState<any>, SearchState>(s => s.state));
}
