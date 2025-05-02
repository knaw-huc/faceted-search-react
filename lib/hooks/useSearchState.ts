import useSearchContext from './useSearchContext.ts';
import {SearchState} from '../store/FacetedSearchStore.ts';

export default function useSearchState(): SearchState {
    return useSearchContext(s => s.state);
}
